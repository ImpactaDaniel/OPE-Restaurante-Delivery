import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/deliveryman/services/auth-service';

import { ChangeStatusService } from '../../../pages/deliveryman/services/change-status-service';
  
@Component({
  selector: 'modal-change-status',
  templateUrl: './modal-change-status.component.html',
})
export class ModalChangeStatusComponent implements OnInit{
  
  closeResult: string = '';

  statusDescription: string;

  constructor(private modalService: NgbModal, private changeStatusService: ChangeStatusService, private authService: AuthService) {
    this.statusDescription = ''
  }

  ngOnInit() {
    this.getStatusDescriptionToHeader();
  }

  getStatusDescriptionToHeader(): void {
    var data = localStorage.getItem('deliveryman');
    if (data){
      let saida = JSON.parse(data);
      this.statusDescription = this.descriptionStatus(saida.status);
    }
  }

  async sendData() {
    var response = await this.changeStatusService.changeDeliverymanStatus().toPromise();
    if (response)
      this.authService.saveUserData(response.current_user);
      this.statusDescription = this.descriptionStatus(response.current_user.status);
    this.modalService.dismissAll();
  }

  private descriptionStatus(response: Boolean){
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
