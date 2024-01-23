import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/shared/services/atletas/eventos.service';

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
      dataEvento: [null, Validators.required],
      inicioInscricoes: [null, Validators.required],
      fimInscricoes: [null, Validators.required], 
    });
  }

  ngOnInit() {}

  async cadastrarEvento() {

    if (this.eventoForm.valid) {
      try {
        const novoEvento = {
          ...this.eventoForm.value,

          dataEvento: this.formatarDataParaAPI(this.eventoForm.value.dataEvento),
          inicioInscricoes: this.formatarDataHoraParaAPI(this.eventoForm.value.inicioInscricoes),
          fimInscricoes: this.formatarDataHoraParaAPI(this.eventoForm.value.fimInscricoes),
        };
        
        this.eventosService.cadastrarEvento(novoEvento).subscribe((eventoCadastrado) => {
          console.log('Novo evento cadastrado:', eventoCadastrado);
          this.fecharModal();
        });
        
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
  

  private formatarDataParaAPI(data: string): string {
    return new Date(data).toISOString().split('T')[0];
  }

  private formatarDataHoraParaAPI(dataHora: string): string {
    return new Date(dataHora).toISOString();
  }
}
