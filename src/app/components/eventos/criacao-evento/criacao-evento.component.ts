// ...
import { EventosService } from 'src/app/shared/services/atletas/eventos.service';
import { Evento } from 'src/app/shared/model/evento.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-criacao-evento',
  templateUrl: './criacao-evento.component.html',
  styleUrls: ['./criacao-evento.component.scss'],
})
export class CriacaoEventoComponent implements OnInit {
  eventoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private eventosService: EventosService
  ) {
    this.eventoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      dataEvento: ['', Validators.required],
      inicioInscricoes: ['', Validators.required],
      fimInscricoes: ['', Validators.required],
    });
  }
  // ...

  ngOnInit() {
    // Adicione validadores de data ao formulário
    this.eventoForm
      .get('dataEvento')
      ?.setValidators([Validators.required, this.validarDataFutura.bind(this)]);
    this.eventoForm
      .get('inicioInscricoes')
      ?.setValidators([Validators.required, this.validarDataFutura.bind(this)]);
    this.eventoForm
      .get('fimInscricoes')
      ?.setValidators([Validators.required, this.validarDataFutura.bind(this)]);
  }

  // ...

  cadastrarEvento() {
    console.log('Submetendo formulário...');
    if (this.eventoForm.valid) {
      console.log('Formulário válido. Enviando dados...');
      // Restante do código...
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }

    if (this.eventoForm.valid) {
      const novoEvento = {
        ...this.eventoForm.value,
        dataEvento: moment
          .utc(this.eventoForm.value.dataEvento, 'DD/MM/YYYY')
          .toDate(),
        inicioInscricoes: moment
          .utc(this.eventoForm.value.inicioInscricoes, 'DD/MM/YYYY')
          .toDate(),
        fimInscricoes: moment
          .utc(this.eventoForm.value.fimInscricoes, 'DD/MM/YYYY')
          .toDate(),
      };

      this.eventosService.cadastrarEvento(novoEvento).subscribe(
        (eventoCadastrado) => {
          console.log('Novo evento cadastrado:', eventoCadastrado);
          // Adicione aqui qualquer lógica adicional após cadastrar o evento
        },
        (error) => {
          console.error('Erro ao cadastrar evento:', error);
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }
  }

  private stringToDate(dateString: string): string | null {
    // Verifica se a string está no formato esperado
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day).toISOString();
    }
    return null;
  }

  // Validador de data futura
  private validarDataFutura(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = moment.utc(control.value, 'DD/MM/YYYY').toDate();

    if (selectedDate < currentDate) {
      return { dataInvalida: true, message: 'A data deve ser no futuro' };
    }

    return null;
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
