import { Component, OnInit } from '@angular/core';
import { NewsService } from '@app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public sources:any = [];
  public articles:any = [];
  public selectedNewsChannel:string = "Top 10 trending News!";


  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.getArticles();
    this.getSources();
  }

   getArticles(){
    this.newsService.initializeArticles().subscribe(
      (res:any)=>{
        console.log(res);
        this.articles = res.articles;
      }
    )
  }

  getSources(){
    this.newsService.initSources().subscribe(
      (res:any)=>{
        console.log(res);
        this.sources = res.sources;
      }
    )
  }

}
