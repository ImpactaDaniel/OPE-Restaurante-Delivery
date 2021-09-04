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
        access_token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDcyMDg4NSwianRpIjoiNGU4ZTZhZDYtYzJlMi00OWE3LTkxY2EtNzg5Yzk0MmMyM2NjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFkbWluIiwibmJmIjoxNjMwNzIwODg1LCJleHAiOjE2MzA3NjQwODV9.p02tflJFm1yNa5PUlhfhitw7ZpguBT5nJoeLm-z6oS4",
        current_user: {
            role : "Administrator",
            status : true,
            username : "Admin"
        }
    }
    localStorage.setItem('deliver_auth', JSON.stringify(dataLogin));
    this.getStatus('deliver_auth');
  }

  getStatus(key: string){
    var localstorage = localStorage.getItem(key);
    if (localstorage){
      let saida = JSON.parse(localstorage);
      console.log(saida.current_user.status)
      this.descricaoStatus = this.descriptionStatus(saida.current_user.status);
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
