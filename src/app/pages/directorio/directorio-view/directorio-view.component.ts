import { Component, OnInit } from '@angular/core';
import { Directorio } from '@app/models/directorio';
import { Location } from '@angular/common';
import { User } from '@app/models/user';
import { DirectorioService } from '@app/services/directorio.service';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-directorio-view',
  templateUrl: './directorio-view.component.html',
  styleUrls: ['./directorio-view.component.css']
})
export class DirectorioViewComponent implements OnInit {

  title = "Mi Directorio"
  user: User;
  directory: Directorio;
  error: string;
  id:any;

  constructor(
    private directorioService: DirectorioService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
  }


  getDirectory(id:number): void {debugger
    id = this.directory.user_id;

    this.directorioService.getDirectoriobyUser(this.directory).subscribe(
      res =>{
        this.directory = res;
        error => this.error = error;
        console.log(this.directory);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
