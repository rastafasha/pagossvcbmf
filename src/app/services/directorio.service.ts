import { Injectable } from '@angular/core';
import { Directorio } from '../models/directorio';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  public directories: Directorio;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'token': this.token
      }
    }
  }


  getDirectorios() {
    const url = `${baseUrl}/directories`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, directories: Directorio}) => resp.directories)
      )
  }

  getDirectorio(directory: any) {
    const url = `${baseUrl}/directories/show/${directory}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directory: Directorio}) => resp.directory)
        );
  }


  createDirectorio(directory:any) {
    const url = `${baseUrl}/directory/store`;
    return this.http.post(url, directory, this.headers);
  }

  updateDirectorio(directory:any) {
    const url = `${baseUrl}/directories/${directory}`;
    return this.http.put(url, directory, this.headers);
  }

  deleteDirectorio(id: number) {
    const url = `${baseUrl}/directories/${id}`;
    return this.http.delete(url, this.headers);
  }


}
