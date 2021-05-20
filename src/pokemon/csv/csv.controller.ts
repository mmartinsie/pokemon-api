import { Controller, Get, Param } from '@nestjs/common';
import fetch = require('node-fetch');
import { Pokemon, PokemonList } from 'shared/Pokemon';
import { convertArrayToCSV } from 'convert-array-to-csv';

@Controller('csv')
export class CsvController {
  @Get(':type')
  async CSV(@Param() params) {
    try {
      console.log('parametro', params.type);
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${params.type}`,
      );
      const pokemonInfoList = await response.json();
      const pokemonDetailsFinalList = await prepare(pokemonInfoList.pokemon);
      pokemonDetailsFinalList.sort(function (a, b) {
        if (a.base_experience > b.base_experience) {
          return 1;
        }
        if (a.base_experience < b.base_experience) {
          return -1;
        }
        return 0;
      });
      const csvPokemons = convertArrayToCSV(pokemonDetailsFinalList);
      return csvPokemons;
    } catch (err) {
      return err;
    }
  }
}
async function prepare(pokemonInfoList: PokemonList[]): Promise<Pokemon[]> {
  const pokemonsList = [];
  for (const pokemonList of pokemonInfoList) {
    const { pokemon } = pokemonList;
    try {
      const response = await fetch(pokemon.url);
      const pokemonInfo = await response.json();
      const pokemonFull: Pokemon = {
        name: pokemonInfo.name,
        base_experience: pokemonInfo.base_experience,
        height: pokemonInfo.height,
        weight: pokemonInfo.weight,
      };
      console.log('pokemon', pokemonFull);
      pokemonsList.push(pokemonFull);
    } catch (err) {
      return err;
    }
  }
  return pokemonsList;
}
