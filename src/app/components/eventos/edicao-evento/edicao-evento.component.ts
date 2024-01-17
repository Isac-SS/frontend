import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Evento } from 'src/app/shared/model/evento.model';
import { EventosService } from 'src/app/shared/services/atletas/eventos.service';


@Component({
  selector: 'app-edicao-evento',
  templateUrl: './edicao-evento.component.html',
  styleUrls: ['./edicao-evento.component.scss'],
})
export class EdicaoEventoComponent  implements OnInit {
  @Input()
  evento!: Evento;

  eventoForm!: FormGroup

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private eventosService: EventosService
  ) { }

  ngOnInit() {
    this.eventoForm = this.fb.group({
      nome: [this.evento.nome || '', Validators.required],
      dataEvento: [this.evento.dataEvento || '', Validators.required],
      inicioInscricoes: [this.evento.inicioInscricoes || '', Validators.required],
      fimInscricoes: [this.evento.fimInscricoes || '', Validators.required],
    });
  }

  fecharModal() {
    this.modalController.dismiss();
  }
 
  salvarEdicao() {
    if (this.evento && this.eventoForm) {
      if (this.eventoForm.valid) {
        this.evento.nome = this.eventoForm.get('nome')?.value;
        this.evento.dataEvento = this.eventoForm.get('dataEvento')?.value;
        this.evento.inicioInscricoes = this.eventoForm.get('inicioInscricoes')?.value;
        this.evento.fimInscricoes = this.eventoForm.get('fimInscricoes')?.value;
  
        // Verifique se evento.id não é undefined antes de chamá-lo
        if (this.evento.id !== undefined) {
          this.eventosService.editarEvento(this.evento.id, this.evento).subscribe(() => {
          });
        }
  
        this.fecharModal();
      }
    }
  }
}
