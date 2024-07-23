import express from "express";

import * as pokemonController from '../controllers/pokemon.controller.js';
const pokemonRoute = express.Router();


pokemonRoute.get('/', pokemonController.pokemonPage);
pokemonRoute.get('/:id',pokemonController.pokemonDetail); // Detail Pokémon



export default pokemonRoute;