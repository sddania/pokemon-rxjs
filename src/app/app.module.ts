import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PokemonListComponent} from "./pokemon/pokemon-list/pokemon-list.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PokemonListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
