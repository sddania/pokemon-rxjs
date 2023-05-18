import { Component } from '@angular/core';
import {PokemonListComponentStore} from "./pokemon-list.component-store";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers:[
    PokemonListComponentStore
  ]
})
export class PokemonListComponent {

    public pokemonList$ = this.pokemonListService.pokemonList$;
    public pokemonListCount$ = this.pokemonListService.pokemonListCount$;
    public displayedColumns: string[] = ['name'];

    constructor(
      private pokemonListService: PokemonListComponentStore
    ) {
      this.pokemonListService.getPokemonList({offset: 0, limit: 20})
    }

  setPage({pageIndex, pageSize }: PageEvent) {
    this.pokemonListService.getPokemonList({
      offset: pageIndex * pageSize,
      limit: pageSize})
  }
}
