import { Component, Input } from '@angular/core';
import { PokemonList } from '../service/models/pokemon.list';
import { PokemonDetail } from '../service/models/pokemon.detail';
import { PokemonService } from '../service/PokemonService';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent {

  pokemons: PokemonDetail[] = [];

  classicMode: boolean = true;

  private offset: number = 0;
  isLastPage = false;

  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;

  constructor(private pokemonService: PokemonService) {
    this.getAllPokemons(this.offset);
  }

  getAllPokemons(offSet: number) {
    this.pokemonService.getPokemonList(offSet).subscribe((list: PokemonList[]) => {
      if (list.length === 0) {
        this.isLastPage = true;
        this.getPokemon(list);
      }

      if (!this.isLastPage) {
        this.getPokemon(list);
      }
    });
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name).pipe(
          switchMap((pokemon: PokemonDetail) => {
            //chamada para obter as informações de espécie do Pokémon.
            return this.pokemonService.getPokemonSpecies(value.name).pipe(
              map((speciesData: any) => {
                //descrição em inglês no objeto de espécie.
                const englishDescription = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
                pokemon.description = englishDescription?.flavor_text;
                return pokemon;
              })
            );
          })
        )
      );
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons.push(...pokemons);
    });
  }

  nextPage(){
    this.offset += 60
    this.getAllPokemons(this.offset)
    console.log(this.pokemons)
  }
}
