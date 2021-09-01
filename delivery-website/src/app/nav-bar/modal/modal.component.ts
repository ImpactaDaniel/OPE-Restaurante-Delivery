import { Component, OnInit } from '@angular/core';
  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Entregador } from 'src/app/entregador/entregador';
import { ChangeStatusService } from 'src/app/entregador/services/change-status-service';
  
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit{
  
  closeResult: string = '';

  entregador: Entregador;
  entregadorID: number = 1;
  statusEntregador: string;

  constructor(private modalService: NgbModal, private entregadoresService: ChangeStatusService) {
    this.statusEntregador = ''
    this.entregador = {id: 0, name: '', disponibilidade: false, status: ''}
  }

  ngOnInit(): void {
  }

  sendData() {
    this.entregadoresService.retrieveById(1).subscribe({
      next: entregador => {
        this.entregador = entregador
        console.log(this.entregador)
        this.statusEntregador = this.entregador.status
      },
      error: err => console.log('Error', err)
    });
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