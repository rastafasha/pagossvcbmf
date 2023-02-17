import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey = '****';

  constructor(
    private http:HttpClient
  ) { }

  initSources(){
    return this.http.get('https://newsapi.org/v2/sources?language=es&apiKey=' + this.apiKey)
  }

  getArticlesById(source: string){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.apiKey)
  }

  initializeArticles(){
    // return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+ this.apiKey)
    return this.http.get('https://newsapi.org/v2/top-headlines?country=ve&apiKey='+ this.apiKey)
  }


}
