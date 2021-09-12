import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ChangeStatusService } from '../../../pages/deliveryman/services/change-status-service';
  
@Component({
  selector: 'modal-change-status',
  templateUrl: './modal-change-status.component.html',
})
export class ModalChangeStatusComponent implements OnInit{
  
  closeResult: string = '';

  statusDescription: string;

  constructor(private modalService: NgbModal, private deliverymanService: ChangeStatusService) {
    this.statusDescription = ''
  }

  ngOnInit() {
    this.getStatusDescriptionToHeader('deliveryman');
  }

  getStatusDescriptionToHeader(key: string){
    var localstorage = localStorage.getItem(key);
    if (localstorage){
      let saida = JSON.parse(localstorage);
      this.statusDescription = this.descriptionStatus(saida.status);
      console.log(this.statusDescription)
    }
  }

  getToken(){
    var localstorage = localStorage.getItem('access_token')
    if (localstorage){
      let saida = JSON.parse(localstorage)
      return saida
    }
    return
  }

  async sendData() {
    let token = this.getToken()
    var response = await this.deliverymanService.changeDeliverymanStatus(token).toPromise();
    if (response)
      localStorage.setItem('deliveryman', JSON.stringify(response.current_user));
      this.statusDescription = this.descriptionStatus(response.status);
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
