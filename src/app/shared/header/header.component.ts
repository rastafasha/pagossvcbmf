import { Component, OnInit, DoCheck, Input } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

//Services

import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { Plan } from '@app/models/plan';
import { RoleService } from '@app/services/role.service';
import { StorageService } from '@app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

import { MessageService } from 'src/app/services/message.service';
import { CartItemModel } from 'src/app/models/cart-item-model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado

  userprofile!: User;

  public user: User;
  error: string;

  urlTheme:any;
  classExist;
  id:any;
  roleid:number;


  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private roleService: RoleService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,

    ) {
      this.user = this.accountService.user;
    }

  ngOnInit(): void {
      this.getUser();
      // this.getUserProfile();
      if(this.storageService.existCart()){
        this.cartItems = this.storageService.getCart();
      }
      this.getItem();
      this.total = this.getTotal();

  }

  // ngDoCheck(): void {
  //   this.user = this.userService.user;

  // }


  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;


    //verifica que se hallan logueado
    if(!this.user || !this.user.id){
      this.router.navigateByUrl('/login');

    }

    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));

  }

  getUserProfile(id:any){
    id  = this.user.id
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        // console.log(this.userprofile);
      }
    );
  }


  prueba(): void {
    this.alertService.info("Mensaje de Prueba","Hola! Esto es una prueba para los alerts!");
    this.openToastPrueba();
  }

  openToast(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toast.fire({
      icon: 'success',
      title: 'Prueba desdel home'
    })
  }

  openToastPrueba(){
    const Toasttest = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toasttest.fire({
      icon: 'success',
      title: 'Toast de prueba'
    })
  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("active");

      }
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  logout(): void {
    this.accountService.logout();
  }


  darkmode(dark:string){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
      for (var i = 0; i<dayNight.length; i++) {
        dayNight[i].classList.toggle("active");
        body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('dark');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }


  getItem():void{
    this.messageService.getMessage().subscribe((product:Plan)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product.id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);

      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);

    });
  }


  getItemsList(): any[]{

    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel)=>{
      item = {
        name: it.productName,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
        quantity: it.quantity,
        category: it.category,
      };
      items.push(item);
    });
    return items;
  }




  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  deletItem(i:number):void{
    if(this.cartItems[i].quantity > 1){
      this.cartItems[i].quantity--;

    }else{
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }

  viewCart(){

    var cartNotification = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<cartNotification.length; i++) {
        cartNotification[i].classList.toggle("cart-modal--active");

      }
  }

}
