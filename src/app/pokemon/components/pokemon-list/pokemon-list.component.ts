import { Component } from '@angular/core';
import {PokemonListService} from "../../services/pokemon-list.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

    public pokemonList$ = this.pokemonListService.pokemonList$;
    public pokemonListCount$ = this.pokemonListService.pokemonListCount$;
    public displayedColumns: string[] = ['name'];

    constructor(
      private pokemonListService: PokemonListService
    ) {
      this.pokemonListService.getPokemonList$.next({offset: 0, limit: 20})
    }

  setPage({pageIndex, pageSize }: PageEvent) {
    this.pokemonListService.getPokemonList$.next({
      offset: pageIndex * pageSize,
      limit: pageSize})
  }
}
