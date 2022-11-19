import { Component, OnInit } from '@angular/core';


//Services
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private accountService: AccountService ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout();
  }

}
