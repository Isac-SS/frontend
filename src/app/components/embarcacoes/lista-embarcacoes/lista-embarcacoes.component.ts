import { Component, OnInit } from '@angular/core';
import { Embarcacao } from 'src/app/shared/model/embarcacao.model';
import { EmbarcacaoService } from 'src/app/shared/services/atletas/embarcao.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EdicaoEmbarcacaoComponent } from 'src/app/components/embarcacoes/edicao-embarcacao/edicao-embarcacao.component';



@Component({
  selector: 'app-lista-embarcacoes',
  templateUrl: './lista-embarcacoes.component.html',
  styleUrls: ['./lista-embarcacoes.component.scss'],
})
export class ListaEmbarcacoesComponent implements OnInit {
  embarcacoesList: Embarcacao[] = [];
  embarcacoesFiltradas: Embarcacao[] = [];
  termoPesquisa: string = '';

  constructor(
    private embarcacaoService: EmbarcacaoService,
    private modalController: ModalController,
    private alertController: AlertController

    ) {}

  ngOnInit(): void {
    this.getEmbarcacoes();
  }

  getEmbarcacoes(): void {
    this.embarcacaoService.getEmbarcacoes().subscribe((data: Embarcacao[]) => {
      this.embarcacoesList = data;
      this.filtrarEmbarcacoes();
    });
  }

  filtrarEmbarcacoes() {
    if (this.termoPesquisa.trim() === '') {
      this.embarcacoesFiltradas = this.embarcacoesList;
    } else {
      const termoLowerCase = this.termoPesquisa.toLowerCase();
      this.embarcacoesFiltradas = this.embarcacoesList.filter(embarcacao =>
        embarcacao.cod.toString().includes(termoLowerCase) || embarcacao.nome.toLowerCase().includes(termoLowerCase)
      );
    }
  }

  async editarEmbarcacao(embarcacao: Embarcacao) {
    const modal = await this.modalController.create({
      component: EdicaoEmbarcacaoComponent,
      componentProps: {
        embarcacao: embarcacao,  
      },
    });
  
    modal.onDidDismiss().then((dadosEditados) => {
      if (dadosEditados && dadosEditados.data) {
        const embarcacaoEditada: Embarcacao = dadosEditados.data;
        this.embarcacaoService.updateEmbarcacao(embarcacao.nome, embarcacaoEditada).subscribe(() => {
          this.getEmbarcacoes();
        });
      }
    });
  
    return await modal.present();
  }

  async excluirEmbarcacao(embarcacao: Embarcacao) {
    console.log('ID da Embarcação:', embarcacao.cod, typeof embarcacao.cod);

    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja excluir essa Embarcação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (embarcacao.cod) {
              this.embarcacaoService.deleteEmbarcacao(embarcacao.cod).subscribe(() => {
                console.log(`Embarcação ${embarcacao.cod} excluído com sucesso.`);
                this.getEmbarcacoes();
              }, (error) => {
                console.error(`Erro ao excluir Embarcação ${embarcacao.cod}: ${error}`, error);
              });
            } else {
              console.error('Id da Embarcação indefinido');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
}
