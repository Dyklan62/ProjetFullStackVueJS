
var AddPokemon = Vue.component("AddPokemon", {
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
                <input v-model="Nom" type="text" name="Nom" class="form-control input_user" value="" placeholder="Nom">
                </div>
                <div class="input-group mb-3">
                <div class="input-group-append">
                    <span class="input-group-text"><i class="fas fa-key">Type</i></span>
                </div>
                <select v-model="Type">
                    <option v-for="type in Types" v-bind:value="type.Type">
                    {{ type.Type }}
                    </option>
                </select>
                </div>

              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-key">Evolution</i></i></span>
                </div>
                <select v-model="Evolution">
                    <option v-for="evolution in Evolutions" v-bind:value="evolution.id">
                    {{ evolution.id }}
                    </option>
                </select>
              </div>

              <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key">Image ou GIF</i></i></span>
              </div>
              <input v-model="Image" type="url" name="Image" class="form-control input_pass" value="" placeholder="Image ou GIF URL">
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
      result_message: null,
      Nom: null,
      Evolution: null,
      Evolutions: [{id: "non"},{ id: "1" }, { id: "2" }, { id: "3" }],
      Type: null,
      Types: [],
      Image: null,
    };
  },
  async mounted() {
    try {
      var token = getToken();
      var user = getId();
      const response = await axios({
        method: "put",
        url: "api/pokemon/types",
        headers: {
          Authorization: `Bearer ${token} ${user}`,
        },
      });
      this.Types = response.data.result;
      console.log(this.Types);
    } catch (error) {
      this.Email = "failed to get Types";
      console.error(error);
    }
  },
  methods: {
     async AddPokemon() {
      try {
        if (confirm("Etes vous sûr de vouloir ajouter ce pokemon ?")) {
          var token = getToken();
          var user = getId();
              const response = await axios({
                  method: 'put',
                  url: 'api/pokemon/add',
                  headers: {
                    Authorization: `Bearer ${token} ${user}`,
                  },
                  data: {
                    Nom : this.Nom,
                    Type : this.Type,
                    EvolutionStep : this.Evolution,
                    Image: this.Image,
                    userId: user,
                  }
              });
              this.result_message = response.status;
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
