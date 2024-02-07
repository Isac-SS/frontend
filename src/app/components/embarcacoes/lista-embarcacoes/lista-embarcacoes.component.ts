import { Component, OnInit } from '@angular/core';
import { Embarcacao } from 'src/app/shared/model/embarcacao.model';
import { EmbarcacaoService } from 'src/app/shared/services/atletas/embarcao.service';

@Component({
  selector: 'app-lista-embarcacoes',
  templateUrl: './lista-embarcacoes.component.html',
  styleUrls: ['./lista-embarcacoes.component.scss'],
})
export class ListaEmbarcacoesComponent implements OnInit {
  embarcacoesList: Embarcacao[] = [];

  constructor(private embarcacaoService: EmbarcacaoService) {}

  ngOnInit(): void {
    this.getEmbarcacoes();
  }

  getEmbarcacoes(): void {
    this.embarcacaoService.getEmbarcacoes().subscribe((data: Embarcacao[]) => {
      this.embarcacoesList = data;
    });
  }
}
