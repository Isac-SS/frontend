import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Atleta } from 'src/app/shared/model/atleta.model';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service'; 

@Component({
  selector: 'app-edicao-atleta',
  templateUrl: './edicao-atleta.component.html',
  styleUrls: ['./edicao-atleta.component.scss'],
})
export class EdicaoAtletaComponent implements OnInit {
  @Input()
  atleta!: Atleta;

  atletaForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private atletasService: AtletasService 
  ) {}

  ngOnInit() {
    this.atletaForm = this.fb.group({
      nome: [this.atleta.nome || '', Validators.required],
      cpf: [this.atleta.cpf || '', Validators.required],
    });
  }

  fecharModal() {
    this.modalController.dismiss();
  }

  salvarEdicao() {
    if (this.atleta && this.atletaForm) {
      if (this.atletaForm.valid) {
        const nome = this.atletaForm.get('nome')?.value;
        const cpf = this.atletaForm.get('cpf')?.value;
  
        if (nome !== null && cpf !== null) {
          this.atleta.nome = nome;
          this.atleta.cpf = cpf;
  
          this.atletasService.editarAtleta(this.atleta.id, this.atleta).subscribe(() => {
          });
  
          this.fecharModal();
        }
      }
    }
  }
}