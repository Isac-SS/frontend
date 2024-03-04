import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Atleta } from 'src/app/shared/model/atleta.model';
import { Embarcacao } from 'src/app/shared/model/embarcacao.model';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';
import { EmbarcacaoService } from 'src/app/shared/services/atletas/embarcao.service';

@Component({
  selector: 'app-edicao-embarcacao',
  templateUrl: './edicao-embarcacao.component.html',
  styleUrls: ['./edicao-embarcacao.component.scss'],
})
export class EdicaoEmbarcacaoComponent implements OnInit {
  @Input() atletas: Atleta[] = [];
  embarcacao!: Embarcacao;
  embarbarcaoForm!: FormGroup;
  modoEdicao: boolean = false;
  atletasMarcados: string[] = [];
  atletasMarcadosArray: Atleta[] = [];

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private embarcacaoService: EmbarcacaoService,
    private atletaService: AtletasService
  ) {}

  ngOnInit() {
    this.embarbarcaoForm = this.fb.group({
      nome: [this.embarcacao.nome || '', Validators.required],
    });

    this.obterAtletas();
  }

  obterAtletas() {
    this.atletaService.getAtletasList().subscribe(atletas => {
      this.atletas = atletas;
      this.atletasMarcadosArray = this.getAtletasMarcadosArray();
      // Teste: console.log da lista de atletas
      console.log('Lista de Atletas:', this.atletas);
      // Teste: console.log da lista de atletas marcados
      console.log('Atletas Marcados:', this.atletasMarcadosArray);
    });
  }


  //form de atualização da embarcação
  inicializarFormulario() {
    this.embarbarcaoForm = this.fb.group({
      nome: [this.embarcacao.nome || '', Validators.required],
    });
  }

  fecharModal() {
    this.modalController.dismiss();
  }

  salvarEdicao() {
    if (this.embarcacao && this.embarbarcaoForm) {
      if (this.embarbarcaoForm.valid) {
        const nome = this.embarbarcaoForm.get('nome')?.value;

        if (nome !== null) {
          this.embarcacao.nome = nome;
          this.embarcacao.atletasMarcados = this.atletasMarcados;

          this.embarcacaoService.updateEmbarcacao(this.embarcacao.cod.toString(), this.embarcacao).subscribe(() => {
            this.fecharModal();
          });
        }
      }
    }
  }

  alternarModo() {
    this.modoEdicao = !this.modoEdicao;
    if (!this.modoEdicao) {
      this.inicializarFormulario();
    }
  }

  toggleAtleta(atleta: Atleta) {
    const atletaCod = atleta.cod.toString();
    const index = this.atletasMarcados.indexOf(atletaCod);
    if (index !== -1) {
      this.atletasMarcados.splice(index, 1); // Desmarca o atleta
    } else {
      this.atletasMarcados.push(atletaCod); // Marca o atleta
    }
  }

  isAtletaMarcado(atleta: Atleta): boolean {
    const atletaCod = atleta.cod.toString();
    return this.atletasMarcados.includes(atletaCod);
  }

  getAtletasMarcadosArray(): Atleta[] {
    return this.atletas.filter(atleta => this.atletasMarcados.includes(atleta.cod.toString()));
  }
}
