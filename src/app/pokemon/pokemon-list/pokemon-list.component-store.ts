import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  Observable,
  switchMap,
  tap
} from "rxjs";
import {NamedAPIResourceList, PokemonClient} from "pokenode-ts";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {PokemonState} from "./pokemon.state";
import {ComponentStore} from "@ngrx/component-store";

@Injectable()
export class PokemonListComponentStore extends ComponentStore<PokemonState> {

  private pokemonClient: PokemonClient = new PokemonClient();

  public pokemonList$ = this.select(s => s.pokemonList.results)
  public pokemonListCount$ = this.select(s => s.pokemonList.count)

  public readonly getPokemonList = this.effect((payload$: Observable<{offset:number, limit:number}>) => {
    return payload$.pipe(
      switchMap(({offset, limit}) =>
        fromPromise(this.pokemonClient.listPokemons(offset, limit)).pipe(
          tap({
            next: (pokemon) => this.addPokemonList(pokemon),
            error: (e) => this.logError(e),
          }),
          catchError(() => EMPTY),
        )
      ),
    );
  });

  public readonly addPokemonList = this.updater((state, result: NamedAPIResourceList) => ({
    ...state,
    pokemonList: result,
  }));

  public readonly logError = this.updater((state, error: unknown) => ({
    ...state,
    error,
  }));

  constructor() {
    super({
      error: undefined,
      pokemonList: {
        count: 0,
        results: [],
        next: "",
        previous: ""
      }
    });
  }
}
