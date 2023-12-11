// import { Component, OnInit } from '@angular/core';
// import { Atleta } from 'src/app/shared/model/atleta.model';
// import { AtletasService } from 'src/app/shared/services/atletas/atletas.service';

// @Component({
//   selector: 'app-atletas',
//   templateUrl: './atletas.page.html',
//   styleUrls: ['./atletas.page.scss'],
// })
// export class AtletasPage implements OnInit {

//   atletasList: Atleta[] = [];
//   alertController: any;

//   constructor(
//     public atletaService: AtletasService
//   ) { }

//   ngOnInit() {
//     this.getAtletas()
//   }

//   getAtletas() {
//     this.atletaService.getAtletasList().subscribe( (data: Atleta[]) => {
//       this.atletasList = data;
//       console.log(this.atletasList)
//     });
//   }

  // async editarAtleta(atleta: Atleta) {
  //   const alert = await this.alertController.create({
  //     header: 'Editar Atleta',
  //     inputs: [
  //       {
  //         name: 'nome',
  //         type: 'text',
  //         value: atleta.nome,
  //         placeholder: 'Nome'
  //       },
  //       {
  //         name: 'cpf',
  //         type: 'text',
  //         value: atleta.cpf,
  //         placeholder: 'CPF'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Edição cancelada');
  //         }
  //       }, {
  //         text: 'Confirmar',
  //         handler: async (data) => {
  //           // Aqui você pode chamar o serviço para atualizar o atleta com os novos dados
  //           atleta.nome = data.nome;
  //           atleta.cpf = data.cpf;
  //           await this.atletaService.atualizarAtleta(atleta).subscribe(response => {
  //             console.log('Atleta atualizado com sucesso:', response);
  //             // Atualize a lista de atletas após a edição bem-sucedida
  //             this.getAtletas();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
// }






