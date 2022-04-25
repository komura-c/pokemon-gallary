import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';

interface PokedexRes {
  descriptions: []
  id: number
  is_main_series: boolean
  name: string
  names: []
  pokemon_entries: []
  region: {name: string, url: string}
  version_groups: [[{}]]
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseURL = 'https://pokeapi.co/api/v2/';
  private readonly baseImageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private http: HttpClient) { }

  getImageURL(id: string | null) {
    if (!id) {
      return '';
    }
    return this.baseImageURL + id + '.png';
  }

  getPokemonData(id: string) {
    return this.http.get<any>(this.baseURL + 'pokemon-species/' + id)
      .pipe(
        map((res)=>{
          console.log(res)
          return res;
        })
      );
  }

  async getTodayKantoPokemonList() {
    const speciesList = await firstValueFrom(this.getTodayKantoPokemonURLs());
    const regExp = /^https?:\/\/pokeapi.co\/api\/v2\/pokemon-species\/(\d+)/;
    let pokemonList = [];
    for (let i = 0; i < speciesList.length; i++) {
      const id = speciesList[i].url.match(regExp)?.[1];
      const pokemonItem = {
        id: id ? id : null,
        name: speciesList[i].name,
        imageURL: this.getImageURL(id ? id : null)
      }
      pokemonList.push(pokemonItem);
    }
    return pokemonList;
  }

  private getTodayKantoPokemonURLs(): Observable<{name: string, url: string }[]> {
    return this.http.get<PokedexRes>(this.baseURL + 'pokedex/6')
    .pipe(
      map((res)=>{
        const pokemonSpeciesList = res.pokemon_entries.map((pokemon: {pokemon_species: {name: string, url: string }})=>{
          return pokemon.pokemon_species;
        })
        const shuffle = ([...array]) => {
          for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        return shuffle(pokemonSpeciesList);
      })
    );
  }
}
