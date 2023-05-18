import { Component } from '@angular/core';
import {PokemonListService} from "./pokemon-list.service";
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
    PokemonListService
  ]
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
