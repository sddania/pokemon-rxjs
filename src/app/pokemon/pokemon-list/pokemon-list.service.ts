import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  Subject,
  switchMap,
  withLatestFrom
} from "rxjs";
import {PokemonClient} from "pokenode-ts";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PokemonState} from "./pokemon.state";

@Injectable()
export class PokemonListService {

  private pokemonState$ = new BehaviorSubject<PokemonState>({
    error: undefined,
    pokemonList: {
      count: 0,
      results:[],
      next: "",
      previous: ""
    }})

  private pokemonClient: PokemonClient = new PokemonClient();
  public getPokemonList$ = new Subject<{offset:number, limit:number}>();

  public pokemonList$ = this.pokemonState$.pipe(map(s => s.pokemonList.results))
  public pokemonListCount$ = this.pokemonState$.pipe(map(s => s.pokemonList.count))

  constructor() {
    this.getPokemonList$
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged(),
        withLatestFrom(this.pokemonState$),
        switchMap(([{offset, limit},]) => fromPromise(this.pokemonClient.listPokemons(offset, limit))),
        catchError((error, ) => {
          const err = error ?? new Error("Error fetching pokemon");
          this.pokemonState$.next({
            pokemonList: {
              count: 0,
              results:[],
              next: "",
              previous: ""},
            error: err
          });
          return [];
        })
      ).subscribe((pokemonList) => {
        this.pokemonState$.next({
          error: null,
          pokemonList:{
            count: pokemonList.count,
            results: pokemonList.results,
            next: pokemonList.next,
            previous: pokemonList.previous
          }})
      })
  }
}
