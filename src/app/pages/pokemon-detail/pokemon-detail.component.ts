import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonData$: Observable<any> = new Observable();
  imageURL: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.forEach((params)=>{
      const id = params.get('id');
      if (id) {
        this.pokemonData$ = this.apiService.getPokemonData(id);
        this.imageURL = this.apiService.getImageURL(id);
      } else {
        this.pokemonData$ = of(null);
      }
    })
  }

}
