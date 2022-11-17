import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongSearchComponent } from './song-search/song-search.component';
import { SongComponent } from './song/song.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
const routes: Routes = [
{ path: '', redirectTo: '/search', pathMatch: 'full' },
{path: 'song/:place', component: SongComponent},
{path: 'search', component: SongSearchComponent},
{path: 'results', component: SearchresultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
