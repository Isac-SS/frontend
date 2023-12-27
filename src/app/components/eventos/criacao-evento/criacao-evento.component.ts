import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/shared/services/atletas/eventos.service'; // Certifique-se de ajustar este caminho

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

  ngOnInit() {}

  async cadastrarEvento() {
    if (this.eventoForm.valid) {
      const novoEvento = this.eventoForm.value;

      try {
        const eventoCadastrado = await this.eventosService.cadastrarEvento(novoEvento).toPromise();
        console.log('Evento cadastrado com sucesso:', eventoCadastrado);
        this.fecharModal();
      } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
      }
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}