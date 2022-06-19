var app = new Vue({
  el: "#app",

  data() {
    return {
      dataIndex: 0,
      currentPokemonSearch: "pikachu",
      pokeList: [],
      pokeInfo: "",
      currentPokemon: {
        name: "  ",
        pokeData: [],
      },
    };
  },
  mounted() {
    let maxId = 150;
    this.catchThemAll(maxId);
    //let iChooseYou = this.pokeList;
    let iChooseYou = "pickachu";
    //Math.floor(Math.random() * (maxId - 0 + 1) + 0)
    console.log(iChooseYou);
    //this.currentPokemonSearch = iChooseYou;
    this.getPokeInfo();
  },
  methods: {
    doSomething() {
      alert("Hello!");
    },
    pokeRandom(elements) {
      return this.pokeList.slice(0, elements - 1);
    },
    catchThemAll(maxId) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=" + maxId)
        .then((response) => {
          if (!response.ok) {
            throw "Code: " + response.status + " " + response.statusText;
          }
          return response.json();
        })
        .then((pokemonNames) => {
          console.log(pokemonNames.results);
          this.pokeList = pokemonNames.results.map((el) => el.name);
        })
        .catch((err) => {
          this.pokeInfo += err;
        });
    },

    getPokeInfo() {
      fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" +
          this.currentPokemonSearch.toLowerCase()
      )
        .then((response) => {
          if (!response.ok) {
            throw "Code: " + response.status + " " + response.statusText;
          }
          return response.json();
        })
        .then((pokemonData) => {
          if (pokemonData) {
            this.currentPokemon.name =
              pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);
            this.dataIndex = 0;

            this.currentPokemon.pokeData = pokemonData?.flavor_text_entries
              .filter((el) => el.language.name == "it")
              .map((el) => el.flavor_text);
          } else {
            throw Error("No pokeData");
          }
        })
        .catch((err) => {
          this.currentPokemon = {};
          this.dataIndex = 0;
          this.pokeInfo += err;
        });
    },
    nextDescription() {
      if (this.currentPokemon) {
        if (this.dataIndex < this.currentPokemon.pokeData.length - 1) {
          this.dataIndex++;
        }
      }
    },
    previusDescription() {
      if (this.currentPokemon) {
        if (this.dataIndex > 0) {
          this.dataIndex--;
        }
      }
    },
    pokemonSearchHandler() {
      this.getPokeInfo();
    },
  },
});
