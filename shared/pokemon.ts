export interface InfoPokemon {
  name: string;
  url: string;
}
export interface PokemonList {
  pokemon: InfoPokemon;
  slot: number;
}
export interface Pokemon {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
}
