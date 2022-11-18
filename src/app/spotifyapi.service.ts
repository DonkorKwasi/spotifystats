import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { response } from 'express';
import { first, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyapiService {

 
  constructor(private http: HttpClient ) { }
  public idList : any
   public tokenStr  : any
   public songList : any
   public songDetails: any
 public  counter: number = 0
 private idListBy50: any[][] = []
   //create next function  for next search page that is recursive and calls it self if  the next page of songs is not null


 async searchTrack(title: string)
  {
    //list of all id's in search (for now its only the first 20)
    this.idList= []
    this.idListBy50 = [];
    var retList = []
    var resp;

//express server will return a new token on each  search
  var tokenresp =   this.http.get("token")
  var token: any 
 await firstValueFrom(tokenresp).then(tokenSpotify => {
    token = tokenSpotify;
    this.tokenStr = token
  })

  
       
  resp = this.http.get("https://api.spotify.com/v1/search?q=" + title + "&type=track&limit=50",{headers: {'Authorization': 'Bearer ' + token}} )
console.log(resp);
  


await firstValueFrom(resp).then ( async data => {

  var next = ""
  var response : any
  response = data;
  console.log(response);
  for(var i = 0; i < response.tracks.items.length; i++)
  {
    this.idList.push(response.tracks.items[i].id)
  }
  next = response.tracks.next;

this.idListBy50.push(response.tracks.items);
  await this.getNext(next,token);
  
console.log(this.idList);

  })

 
   

  }

  async dummyToken()
  {

    var tokenresp =   this.http.get("token")
  var token: any 
   await firstValueFrom(tokenresp).then(tokenSpotify => {
     token = tokenSpotify;
     this.tokenStr = token
   })
  }
        

// change this to use get multiple tracks as it will mostlikely be less laggy 
async getSongList()
{
this.songList = [];
var resp;
console.log(this.idList.length);
var idstring = ""
 

   


console.log(this.idListBy50);  

for(var i = 0; i < this.idListBy50.length; i++)
{
  idstring = ""
  for(var y = 0 ; y < this.idListBy50[i].length; y++)
  {

console.log(this.idListBy50[i])
  
     
   idstring = idstring  + this.idListBy50[i][y].id;
   if(y != (this.idListBy50[i].length -1))
   {
    idstring = idstring + ","
   }
      
  
  }
  console.log(idstring)
  resp = this.http.get("https://api.spotify.com/v1/tracks?ids=" + idstring ,{headers: {'Authorization': 'Bearer ' + this.tokenStr }} )
  
  await firstValueFrom(resp).then(song =>
    {
      console.log(song);
      var one : any
      one = song
  
      for(var i = 0; i < one.tracks.length; i++)
      {
        this.songList.push(one.tracks[i]);
      }
     
      console.log(this.songList);
    }
    )

}


}



async getExtraDetails(song: any)
{

 var resp = this.http.get("https://api.spotify.com/v1/audio-features/" + song.id ,{headers: {'Authorization': 'Bearer ' + this.tokenStr }}
 
)


 await firstValueFrom(resp).then(details => {
console.log(details);
this.songDetails = details;
 })
}
  async getNext(next: any, toke : any)
{
  
 await firstValueFrom(this.http.get(next, {headers: {'Authorization': 'Bearer ' + toke}})).then( async  resp2 => {
    var response2 : any
  response2 = resp2;
   
console.log(response2.tracks.items.length);

   for(var i = 0; i < response2.tracks.items.length; i++)
  {
    this.idList.push(response2.tracks.items[i].id)
  }
  this.idListBy50.push(response2.tracks.items);
  
  console.log(next);
  if(response2.tracks.next != null && this.counter  < 9 )
  {
    this.counter = this.counter + 1;
    console.log(this.counter);
  await this.getNext(response2.tracks.next,toke);
  } 
  else
  {
    return;
  }

})
}
}

