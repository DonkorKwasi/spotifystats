import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { SpotifyapiService } from '../spotifyapi.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  constructor(private spot: SpotifyapiService, private route: ActivatedRoute) { }
images :any
songList: any
song : any
details: any
key: string = ""
mode: string = ""
mins : number = 0;
seconds: number = 0;
explicit: string ="";
artistStr = ""
  ngOnInit(): void {

    this.setup();
    
    
  }




  async setup()
  {
    this.songList = []
    await this.spot.getSongList()
    this.songList = this.spot.songList;
    console.log(this.songList.length);
    
    var ind = this.route.snapshot.paramMap.get('place');
    if(ind != null)
    {
var index = parseInt(ind);
console.log( this.songList)
this.song = this.songList[index];
console.log(this.song);
var all = ""
for(var y = 0; y < this.song.artists.length; y++)
    {
  
      if(this.song.artists.length > 1 && y != this.song.artists.length -1 )
      {
        
        all = all.concat((this.song.artists[y].name + ', '))
       
      }
      else 
      {
        all = all.concat((this.song.artists[y].name+ ' '))
      }
    }

    this.artistStr = all;
    
await this.spot.getExtraDetails(this.song);
this.details = this.spot.songDetails;
console.log(this.details);
 
this.mins = Math.floor((this.song.duration_ms/1000)/60)
this.seconds = Math.floor(((((this.song.duration_ms/1000)/60) % 1) *60) / 1);
console.log(this.mins);
if(this.song.explicit == true)
{
this.explicit = "explicit"
}
else{
  this.explicit = "clean"
}
this.getKey()

if(this.details.mode == 0)
{
  this.mode = "minor"
}
else{
  this.mode = "major"
}

    }

  }




  getKey()
  {

if(this.details.key = 0)
{
this.key = "C"
}
if(this.details.key = 1)
{
  this.key = "C#"
}
if(this.details.key = 2)
{
  this.key = "D"
}
if(this.details.key = 3)
{
  this.key = "D#"
}
if(this.details.key = 4)
{
  this.key = "E"
}
if(this.details.key = 5)
{
  this.key = "F"
}
if(this.details.key = 6)
{
  this.key = "F#"
}
if(this.details.key = 7)
{
  this.key = "G"
}
if(this.details.key = 8)
{
  this.key = "G#"
}
if(this.details.key = 9)
{
  this.key = "A"
}
if(this.details.key = 10)
{
  this.key = "A#"
}
if(this.details.key = 11)
{
  this.key = "B"
}
  }
}
