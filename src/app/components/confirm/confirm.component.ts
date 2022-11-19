import { Component, OnInit } from '@angular/core';
//Services
import { ConfirmService } from '@app/services/confirm.service';



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public id: string = "modal-confirm";
  public title: string = "Eliminar";
  public message: string = "¿Está seguro?";
  public fun?: (uid?: string,that?:any) => void;
  public uid?: string = "";
  public that?:any;

  constructor(
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.confirmService.getMessage().subscribe(data => {
      this.title = data.title;
      this.message = data.message;
      this.fun = data.fun;
      this.uid = data.uid;
      this.that = data.that;
    });
  }

  public proced() {
    console.log('Si,confirmado, procede');
    if (this.fun) {
      this.fun(this.uid,this.that);

    }

  }

}
