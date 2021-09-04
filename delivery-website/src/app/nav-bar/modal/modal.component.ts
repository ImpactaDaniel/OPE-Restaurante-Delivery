import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Entregador } from '../../services/entregador/entregador';
import { ChangeStatusService } from '../../services/entregador/change-status-service';
  
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit{
  
  closeResult: string = '';

  entregador: Entregador;
  descricaoStatus: string;

  constructor(private modalService: NgbModal, private entregadoresService: ChangeStatusService) {
    this.descricaoStatus = ''
    this.entregador = {nome: '', descricao: '', status: false}
  }

  async ngOnInit() {
      let dataLogin = {
        access_token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDYzMTM3NSwianRpIjoiOTRlYTAzNDgtMGUzNC00NmE1LTgzODktZDMzYzhiZmMwMzdkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFkbWluIiwibmJmIjoxNjMwNjMxMzc1LCJleHAiOjE2MzA2NzQ1NzV9.fcBWuGBvXMAwXvmoqW5DCQdGvNmw4DCK1bj0RBunH8M",
        current_user: {
            role : "Administrator",
            status : true,
            username : "Admin"
        }
    }
    localStorage.setItem('deliver_auth', JSON.stringify(dataLogin))
    this.getStatus('deliver_auth')
  }

  getStatus(key: string){
    var localstorage = localStorage.getItem(key)
    if (localstorage){
      let saida = JSON.parse(localstorage)
      console.log(saida.current_user.status)
      this.descricaoStatus = saida.current_user.status === true ? 'Disponível' : 'Indisponível';
    }
  }
  getTokenLogin(){
    var localstorage = localStorage.getItem('deliver_auth')
    if (localstorage){
      let saida = JSON.parse(localstorage)
      console.log(saida.access_token)
      return saida.access_token
    }
    return
  }

  async sendData() {
    let token = this.getTokenLogin()
    var response = await this.entregadoresService.changeStatusDeliver(token).toPromise();
    console.log(response)
    // if (response)
    // localStorage.setItem('deliver_status', JSON.stringify(response))
    // this.descricaoStatus = response.
    this.modalService.dismissAll()
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
