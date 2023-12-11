import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Atleta } from 'src/app/shared/model/atleta.model';

@Component({
  selector: 'app-edicao-atleta',
  templateUrl: './edicao-atleta.component.html',
  styleUrls: ['./edicao-atleta.component.scss'],
})
export class EdicaoAtletaComponent  implements OnInit {

  @Input()
  atleta!: Atleta; 

  atletaForm: FormGroup = new FormGroup({});

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.atletaForm = this.fb.group({
      nome: [this.atleta?.nome || '', Validators.required],
      cpf: [this.atleta?.cpf || '', Validators.required],
    });
  }

  fecharModal() {
    // Fecha o modal seeeeem passar dados de volta
    this.modalController.dismiss();
  }

  salvarEdicao(){
    //Salva a edição e fecha modal
    const dadosEditados: Atleta ={
      id: this.atleta.id,
      ...this.atletaForm.value,
    };
    this.modalController.dismiss(dadosEditados);
  }
}
