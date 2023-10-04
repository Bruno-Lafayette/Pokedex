import { Component, Input } from '@angular/core';
import { PokemonDetail } from '../service/models/pokemon.detail';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass']
})
export class PokemonCardComponent {
  @Input()
  pokemon!: PokemonDetail;
  
  corDeFundoMapping: any = {
    "grass": "#3CB371",
    "fire": "#F4A460",
    "psychic": "#9370DB",
    "water": "#00BFFF",
    "bug": "#df8830",
    "normal": "#B0C4DE",
    "fighting": "#B22222",
    "rock": "#4F4F4F",
    "electric": "#FFD700",
    "ice": "#B0E0E6",
    "dark": "#1C1C1C",
    "ghost": "#191970",
    "poison": "#4B0082",
    "steel":"#808080",
    "dragon":"#FF6347",
    "ground":"#8B0000"
  };
  show: boolean = false ;

  showModal(){
    this.show = !this.show
  }

  getID(id: number): string{
    return ("000" + id).slice(-3)
  }


}
