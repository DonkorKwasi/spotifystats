import { Component, OnInit } from '@angular/core';
import { SpotifyapiService } from '../spotifyapi.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {

  constructor(private spot :SpotifyapiService, private route : Router) { }
title :string = ""
list : any
  ngOnInit(): void {
  }

  async search()
  {
await this.spot.searchTrack(this.title);


 console.log(this.spot.idList[0])


this.route.navigate(['results']);

  }
}
