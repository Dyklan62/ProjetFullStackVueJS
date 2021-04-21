var Dashboard = Vue.component("Dashboard", {
    template: `
      <div class="container">
        <div v-if='Loged'>
          <h1>DASHBOARD</h1>
          <div class="row align-items-start">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a href="/addPokemon">
                  <div class="box-part text-center">
                      <img src="../../img/add_poke.png" alt="img to add pokemon">
                  </div>
                </a>
              </div>	
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a href="/suprPokemon">
                  <div class="box-part text-center">
                      <img src="../../img/supr_poke.png" alt="img to delete pokemon">
                  </div>
                </a>
              </div>	
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 box-part text-center center-block" v-for="image in PokemonList">
                <img class='pokemonImage' :src="image.Image"/>
                <h3>{{image.Nom}}</h3>
                <h3>{{image.Type}}</h3>
                <h3>{{image.EvolutionStep}}</h3>
                <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="button" name="button" class="btn login_btn" @click="PokemonModif()">modifier le pokemon</button>
                </div>
              </div>
          </div>
        </div>
        <div v-if='!Loged'>
          <h1>Acceuil</h1>
        </div>
      </div>
      `,
    data() {
      return {
        Loged: isToken(),
        PokemonList: [],
      };
    },
    async mounted() {
      try {
        var token = getToken();
        var user = getId();
        const response = await axios({
          method: "put",
          url: "api/pokemon/list",
          headers: {
            Authorization: `Bearer ${token} ${user}`,
          },
        });
        this.PokemonList = response.data.result;
        console.log(this.PokemonList);
      } catch (error) {
        this.Email = "failed to get Pokemon list";
        console.error(error);
      }
    },
  });
  