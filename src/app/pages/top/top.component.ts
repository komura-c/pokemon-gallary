import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {
  kantoPokemons: {
    id: string | null;
    name: string;
    imageURL: string;
  }[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getTodayKantoPokemonList().then((data)=>{
      this.kantoPokemons = data;
    });
  }
}
