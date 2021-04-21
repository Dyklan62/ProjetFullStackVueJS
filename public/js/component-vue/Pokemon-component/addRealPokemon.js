var AddRealPokemon = Vue.component("AddRealPokemon", {
    template: `
      <div>
          <a class="noborderalink" href="/"><img src="/img/Home.png" alt=""></a>
          <div id="register" class="centercustom container h-75">
          <div class="d-flex justify-content-center h-100">
          <div class="user_card">
              <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                  <img src="../img/Login_register_logo.png" class="brand_logo" alt="Logo">
              </div>
              </div>
              <div class="d-flex justify-content-center form_container">
              <form>
                  <div class="input-group mb-3">
                  <div class="input-group-append">
                      <span class="input-group-text"><i class="fas fa-user">Nom</i></span>
                  </div>
                  <select v-model="Pokemon">
                      <option v-for="nom in Noms" v-bind:value="nom">
                      {{ nom.name }}
                      </option>
                  </select>
                  </div>
  
                  <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="button" name="button" class="btn login_btn" @click="AddPokemon()">Ajouter le pokemon</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`,
    data() {
      return {
        Loged: isToken(),
        token: getToken(),
        user: getId(),
        result_message: null,
        Pokemon:null,
        Id: null,
        Noms: [],
        Nom: null,
        Evolution: null,
        Type: null,
        Image: null,
      };
    },
    async mounted() {
      try {
        const response = await axios({
            method: "get",
            url: "https://pokeapi.co/api/v2/pokemon?limit=1118",
          });
          this.Noms=response.data.results;

      } catch (error) {
        this.Email = "failed to get real Pokemon list";
        console.error(error);
      }
    },
    methods: {
       async AddPokemon() {
        try {
          if (confirm("Etes vous sûr de vouloir ajouter ce pokemon ?")) {

                const response = await axios({
                  method: "get",
                  url: this.Pokemon.url,
                });
                
                this.Nom = response.data.name;
                this.Type = TypeTranslate(response.data.types[0].type.name);
                this.Image = response.data.sprites.front_default;
                var reponseId=response.data.id;

                const response2 = await axios({
                  method: "get",
                  url: `https://pokeapi.co/api/v2/pokemon-species/${reponseId}`,
                });

                if(response2.data.evolves_from_species == undefined){
                  this.Evolution =1;
                }else{
                  reponseId--;
                  const response3 = await axios({
                    method: "get",
                    url: `https://pokeapi.co/api/v2/pokemon-species/${reponseId}`,
                  });
                  if(response3.data.evolves_from_species == undefined ){
                    this.Evolution =2;
                  }
                  else{
                    this.Evolution=3;
                  }
                }
                const response4 = await axios({
                    method: 'put',
                    url: 'api/pokemon/add',
                    headers: {
                      Authorization: `Bearer ${this.token} ${this.user}`,
                    },
                    data: {
                      Nom : this.Nom,
                      Type : this.Type,
                      EvolutionStep : this.Evolution,
                      Image: this.Image,
                      userId: this.user,
                    }
                });
                this.result_message = response4.status;

                alert("Pokemon ajouté");
                this.$router.push("/");
                this.$router.go(0);
              } else {
                alert("Le pokemon n'a pas été ajouté");
              }
            } catch (error) {
                alert("Le pokemon n'a pas pu etre ajouté");
                console.error(error);
            }
      },
    },
  });
  