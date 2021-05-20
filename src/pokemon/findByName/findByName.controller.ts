import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import Joi = require('joi');
import fetch = require('node-fetch');

@Controller('findByName')
export class FindByNameController {
  @Post()
  async findByName(@Req() req: Request) {
    schema
      .validateAsync(req.body)
      .then((val) => {
        req.body = val;
      })
      .catch((err) => {
        throw new Error('Failed to validate input ' + err.details[0].message);
      });
    try {
      const { name } = req.body;
      console.log('llamo', name);
      const pokemon = name.replace(/ /g, '').trim().toLowerCase();
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + pokemon,
      );
      const pokemonInfo = await response.json();
      console.log('llamo', pokemonInfo);
      return pokemonInfo;
    } catch (err) {
      return err;
    }
  }
}
const schema = Joi.object().keys({
  name: Joi.string().required(),
});
