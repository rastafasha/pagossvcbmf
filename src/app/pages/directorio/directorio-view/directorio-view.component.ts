import { Component, OnInit } from '@angular/core';
import { Directorio } from '@app/models/directorio';
import { Location } from '@angular/common';
import { User } from '@app/models/user';
import { DirectorioService } from '@app/services/directorio.service';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  id:number;

  constructor(
    private directorioService: DirectorioService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
  }


  getDirectory(id:number): void {
    this.directorioService.getDirectoriobyUser(id).subscribe(
      res =>{
        this.directory = res[0];
        error => this.error = error;
        console.log(this.directory);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
