import { Component, OnInit } from '@angular/core';
import { Atleta } from 'src/app/shared/model/atleta.model';
import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.page.html',
  styleUrls: ['./atletas.page.scss'],
})
export class AtletasPage implements OnInit {

  atletasList: Atleta[] = [];

  constructor(
    public atletaService: AtletasService
  ) { }

  ngOnInit() {
    this.getAtletas()
  }

  getAtletas() {
    this.atletaService.getAtletasList().subscribe( (data: Atleta[]) => {
      this.atletasList = data;
      console.log(this.atletasList)
    });
  }

}
