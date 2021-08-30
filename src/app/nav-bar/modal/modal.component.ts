import { Component, OnInit } from '@angular/core';
  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Entregador } from 'src/app/entregador/entregador';
import { ChangeStatusService } from 'src/app/entregador/services/change-status-service';
  
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit{
  // title = 'appBootstrap';
  
  closeResult: string = '';

  // filteredCourses: Entregador[] = [];
  // _entregador: Entregador[] = [];

  entregador: Entregador;

  constructor(private modalService: NgbModal, private getEntregadoresService: ChangeStatusService) {
    this.entregador = {id: 0, name: '', disponibilidade: false, status: ''}
  }

  ngOnInit(): void {
    this.getEntregadoresService.retrieveById(1).subscribe({
      next: entregador => {
        this.entregador = entregador
        console.log(this.entregador)
      },
      error: err => console.log('Error', err)
    });
  }

  // save(): void {
  //   this.getEntregadoresService.save(this.entregador).subscribe({
  //     next: entregador => console.log("Save with success ", entregador),
  //     error: err => console.log('Error', err)
  //   });
  // }

  // retrieveAll(): void { 
  //   this.getEntregadoresService.retrieveAll().subscribe({
  //       next: entreg => {
  //           this._entregador = entreg;
  //           this.filteredCourses = this._entregador;
  //           console.log(this.filteredCourses)
  //       },
  //       error: err => console.log('Error', err)
  //   })
  // }

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