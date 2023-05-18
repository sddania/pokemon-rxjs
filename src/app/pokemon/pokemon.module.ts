import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import {PokemonListService} from "./services/pokemon-list.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers:[
    PokemonListService
  ],
  exports:[
    PokemonListComponent
  ]
})
export class PokemonModule { }
