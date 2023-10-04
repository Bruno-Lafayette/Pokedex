import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { PokemonList } from './models/pokemon.list';
import { PokemonDetail } from './models/pokemon.detail';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  bottomSheet: any;
  classicMode: any;

  constructor(private httpClient: HttpClient) { }

  getPokemonList(offset: number, limit: number = 20): Observable<PokemonList[]> {
    return this.httpClient.get<PokemonList[]>(`${API_PATH}` + 'pokemon?offset=' + offset + '&limit=' + limit)
      .pipe(
        map((x: any) => x.results)
      );
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    return this.httpClient.get<PokemonDetail>(`${API_PATH}pokemon/${pokemon}`);
  }

  getPokemonSpecies(name: string): Observable<any> {
    return this.httpClient.get<PokemonDetail>(`${API_PATH}pokemon-species/${name}`);
  }

}
