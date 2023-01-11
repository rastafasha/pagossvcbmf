import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagoHecho } from '@app/models/payment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() amount;
  @Input() items;

  pagoHecho: PagoHecho;


  constructor(
    public activeModal:NgbActiveModal,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl("['/dashboard/factura/', pagoHecho.id]");

  }

}
