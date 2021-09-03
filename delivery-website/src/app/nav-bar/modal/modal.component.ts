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
  entregadorID: number = 1;
  statusEntregador: Boolean;

  constructor(private modalService: NgbModal, private entregadoresService: ChangeStatusService) {
    this.statusEntregador = false
    this.entregador = {name: '', disponibilidade: '', status: false}
  }

  async ngOnInit() {
      var response = await this.entregadoresService.getStatusById().toPromise();
      console.log(response)
      this.statusEntregador = response.response.status
      localStorage.setItem('deliver', JSON.stringify(response));
  }

  async sendData() {
    // var response = await this.entregadoresService.changeStatusById().toPromise();
    // this.statusEntregador = response.status
    // console.log(response)
    // this.modalService.dismissAll()
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
