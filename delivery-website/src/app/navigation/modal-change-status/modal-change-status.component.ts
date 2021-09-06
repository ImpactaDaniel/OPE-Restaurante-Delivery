import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Entregador } from '../../services/entregador/entregador';
import { ChangeStatusService } from '../../services/entregador/change-status-service';
  
@Component({
  selector: 'modal-change-status',
  templateUrl: './modal-change-status.component.html',
})
export class ModalChangeStatusComponent implements OnInit{
  
  closeResult: string = '';

  entregador: Entregador;
  descricaoStatus: string;

  constructor(private modalService: NgbModal, private entregadoresService: ChangeStatusService) {
    this.descricaoStatus = ''
    this.entregador = {nome: '', descricao: '', status: false}
  }

  async ngOnInit() {
      let dataLogin = {
        access_token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDc4MTQwOSwianRpIjoiZDliMzRiMmUtOTlhNS00N2Y5LWIyMmUtZmI3YTBjNzViOWUxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFkbWluIiwibmJmIjoxNjMwNzgxNDA5LCJleHAiOjE2MzA4MjQ2MDl9.E603QwBCyAh-GC7hRQuVyWdC_xIM6GfymqYmWp45uf0",
        current_user: {
            role : "Administrator",
            status : true,
            username : "Admin"
        }
    }
    localStorage.setItem('access_token', JSON.stringify(dataLogin.access_token));
    localStorage.setItem('deliver_status', JSON.stringify(dataLogin.current_user));
    this.getStatus('deliver_status');
  }

  getStatus(key: string){
    var localstorage = localStorage.getItem(key);
    if (localstorage){
      let saida = JSON.parse(localstorage);
      console.log(saida.status)
      this.descricaoStatus = this.descriptionStatus(saida.status);
    }
  }
  getToken(){
    var localstorage = localStorage.getItem('access_token')
    if (localstorage){
      let saida = JSON.parse(localstorage)
      console.log(saida)
      return saida
    }
    return
  }

  async sendData() {
    let token = this.getToken()
    var response = await this.entregadoresService.changeStatusDeliver(token).toPromise();
    console.log(response)
    if (response)
      localStorage.setItem('deliver_status', JSON.stringify(response));
      this.descricaoStatus = this.descriptionStatus(response.current_user.status);
    this.modalService.dismissAll();
  }

  descriptionStatus(response: Boolean){
    let description = response === true ? 'Disponível' : 'Indisponível';
    return description
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
