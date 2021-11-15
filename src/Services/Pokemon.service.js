import {
    BASE_URL,
    fetchAllPokemons,
    fetchUrlPokemons,
    transformPokemonData
} from "./helpers";

export const pokemonsServices = {
    getPokemons: async (filters = {}) => {
        const {limit = 10, offset = 0} = filters

        try {
            const urlPokemons = await fetchAllPokemons({limit,offset});
            const pokemons = await fetchUrlPokemons(urlPokemons);

            const mappedPokemons = pokemons.map(transformPokemonData);
            return {success: true, pokemons: mappedPokemons};

        } catch (error) {
            console.error({error});
            return { success: false, pokemons: []};
        }
    },

    getPokemon: async (name = "") => {
        try {
            const response = await fetch(`${BASE_URL}pokemon/${name.toLowerCase()}`)
            const data = await response.json();

            if(!data) throw new Error("Pokemon not Found")

            const transformedPokemon = transformPokemonData(data);

            return {success: true, pokemon: transformedPokemon};
        } catch (error) {
            console.error({error});

            return {success: false, pokemon: null}
        }
    }
}
