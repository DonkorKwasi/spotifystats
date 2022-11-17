import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SpotifyapiService } from '../spotifyapi.service';
import { NgxPaginationModule } from 'ngx-pagination/public-api';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css'],
  
})
export class SearchresultComponent implements OnInit {
songList : any
images : any
artists : any[][] = [];
artistStr : string[] = [];
loaded : boolean = false
p : number = 1;
currentindex : number = 0


  constructor(private spot:SpotifyapiService, private route: Router ) { }

  ngOnInit(): void {
this.getList()

  }

  //gets all songs from search result and creats a list of all the artists
  async getList()
{
  this.images = []
  
  await this.spot.getSongList()
  this.songList = this.spot.songList;
  this.loaded = true;
  console.log(this.songList[0]);
  for (var i = 0; i < this.songList.length; i++)
  {
  

    
  
this.artists.push(this.songList[i].artists);
    
  }
  

  this.createArtistsString();
}

onTableDataChange(event: any){
  console.log(this.p);
  this.p = event;
  //this.fetchCards();
}


openSong(index: number)
{
  console.log(this.p);
  if(this.p == 1)
  {
this.route.navigate(['song/' , index])
  }

  else{
    var bMultiplier = this.p - 1;

    var y = index + (20 * bMultiplier)
    this.route.navigate(['song/' , y])
  }
};


createArtistsString()
{
  var all: string
 all = "";
 console.log(this.artists.length)

  for(var i = 0; i < this.artists.length; i++)
  {
    
    for(var y = 0; y < this.artists[i].length; y++)
    {
  
      if(this.artists[i].length > 1 && y != this.artists[i].length -1 )
      {
        all = all.concat((this.artists[i][y].name + ', '))
      }
      else 
      {
        all = all.concat((this.artists[i][y].name + ' '))
      }
    

      
      
      if(y ==(this.artists[i].length -1))
      {
        this.artistStr.push(all);
        
     all = "";
      }
    }
  
  }
}



}


