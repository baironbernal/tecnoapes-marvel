import { Component, OnInit } from '@angular/core';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {
  comicsFavs: any[];
  constructor(private comicService: ComicService) { }

  ngOnInit(): void {
    this.comicService.allFavs().subscribe((info)=> {
      this.comicsFavs = info
    });
  }

}
