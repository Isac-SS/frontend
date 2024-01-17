import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';

@Component({
  selector: 'app-criacao-atleta',
  templateUrl: './criacao-atleta.component.html',
  styleUrls: ['./criacao-atleta.component.scss'],
})
export class CriacaoAtletaComponent implements OnInit {

  atletaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private atletasService: AtletasService
  ) {
    this.atletaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
    }); 
  }

  ngOnInit() {}

  async cadastrarAtleta() {
    if (this.atletaForm.valid) {
      const novoAtleta = this.atletaForm.value;

      try {
        const atletaCadastrado = await this.atletasService.cadastrarAtleta(novoAtleta).toPromise();
        console.log('Atleta cadastrado com sucesso:', atletaCadastrado);
        this.fecharModal();
      } catch (error) {
        console.error('Erro ao cadastrar atleta:', error);
      }
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}