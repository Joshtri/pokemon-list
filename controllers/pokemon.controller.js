import axios from "axios";

export const pokemonPage = async (req, res) => {
    try {
        // Ambil daftar Pokemon dengan limit 300
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=300');
        const title = "Daftar Pokemon";

        // Mengambil data detail (termasuk deskripsi) untuk setiap Pokemon
        const pokemonData = await Promise.all(
            response.data.results.map(async (pokemon) => {
                // Ambil detail dasar Pokemon
                const pokemonDetails = await axios.get(pokemon.url);
                const pokemonId = pokemonDetails.data.id;

                // Ambil deskripsi Pokemon dari endpoint species
                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
                const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

                return {
                    id: pokemonId,
                    name: pokemon.name,
                    image: pokemonDetails.data.sprites.front_default,
                    url: pokemon.url,
                    description: description
                };
            })
        );

        res.render('pokemon_data', {
            pokemonData,
            title
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


export const pokemonDetail = async(req,res)=>{
    try {
        const {id} = req.params;

        // Ambil detail Pokémon dari API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = response.data;
        res.render('pokemon_detail',{
            pokemon: {
                name: pokemon.name,
                image: pokemon.sprites.front_default, // Gambar depan Pokémon
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities.map(ability => ability.ability.name), // Daftar kemampuan
                types: pokemon.types.map(type => type.type.name) // Daftar tipe
            }
        })
    } catch (error) {
        throw error;
    }
};