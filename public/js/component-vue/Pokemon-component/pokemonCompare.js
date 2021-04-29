var Compare = Vue.component("Compare", {
    template: `
    <div>
        <a class="noborderalink">
            <router-link class="nav-link noborderalink" to="/">
                <img src="/img/Home.png" alt="">
            </router-link>
        </a>
        <h1 class="text-center">COMPARAISON DES POKEMON</h1>
        <div class="container">
            <div class="row align-items-start">
                <div  class="col-lg-2 col-md-2 col-sm-2 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block SpaceAround text-center center-block">
                    <table class="table col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <thead>
                            <tr class="thead">
                            <th class="thead">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Etape d'évolution : </td>
                            </tr>
                            <tr class="table-primary">
                            <td>Type : </td>
                            </tr>
                            <tr class="table-secondary">
                            <td>Faible contre : </td>
                            </tr>
                            <tr class="table-warning">
                            <td>Fort contre : </td>
                            </tr>
                            <tr>
                            <td v-if='CompareList[0].TypeInfo[0].Immunite != "" || CompareList[1].TypeInfo[0].Immunite != ""'>immunisé  contre : </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 SpaceAround box-part text-center center-block">
                    <img class='col-lg-12 col-md-12 col-sm-12 col-xs-12 pokemonImage ImageRounded SpaceBottom' :src="CompareList[0].Image"/>
                    <table class="table col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <thead>
                            <tr>
                            <th  scope="col">{{CompareList[0].Nom}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{{CompareList[0].EvolutionStep}}</td>
                            </tr>
                            <tr class="table-primary">
                            <td>{{CompareList[0].Type}}</td>
                            </tr>
                            <tr class="table-secondary">
                            <td>{{CompareList[0].TypeInfo[0].Faible}}</td>
                            </tr>
                            <tr class="table-warning">
                            <td>{{CompareList[0].TypeInfo[0].Forces}}</td>
                            </tr>
                            <tr>
                            <td v-if='CompareList[0].TypeInfo[0].Immunite != ""'>{{CompareList[0].TypeInfo[0].Immunite}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 SpaceAround text-center center-block">
                    <table class="table col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <thead class="d-none d-sm-block">
                            <tr>
                            <th class=" IconeColumn" scope="col"><img class='imgcomparaison' :src="ImageComparaison"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ComparaisonMessage}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 SpaceAround box-part text-center center-block">
                    <img class='col-lg-12 col-md-12 col-sm-12 col-xs-12 pokemonImage ImageRounded SpaceBottom' :src="CompareList[1].Image"/>
                    <table class="table col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <thead>
                            <tr>
                            <th scope="col">{{CompareList[1].Nom}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{{CompareList[1].EvolutionStep}}</td>
                            </tr>
                            <tr class="table-primary">
                            <td>{{CompareList[1].Type}}</td>
                            </tr>
                            <tr class="table-secondary">
                            <td>{{CompareList[1].TypeInfo[0].Faible}}</td>
                            </tr>
                            <tr class="table-warning">
                            <td>{{CompareList[1].TypeInfo[0].Forces}}</td>
                            </tr>
                            <tr>
                            <td v-if='CompareList[1].TypeInfo[0].Immunite != ""'>{{CompareList.TypeInfo[0].Immunite}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`,
    props:{
        CompareList: [],
    }
    ,
    data() {
      return {
        Loged: isToken(),
        token: getToken(),
        user: getId(),
        result_message: null,
        Pokemon: null,
        ImageComparaison:null,
        ComparaisonMessage: null,
      };
    },
    async mounted() {
        if(this.CompareList[0].Nom == undefined){
            swal("","Veuillez reselectionner vos pokemon à comparer","error")
            .then(() => {
            this.$router.back();
            });
        }
        this.ImageComparaison="/img/interogation.png";
        this.ComparaisonMessage='Avantages inconnus';


        if(this.CompareList[0].TypeInfo[0].Faible.includes(this.CompareList[1].Type)){
            this.ImageComparaison="/img/inf.png";
            this.ComparaisonMessage='Le Pokemon n°2 a l\'avantage';
        }
        if(this.CompareList[1].TypeInfo[0].Faible.includes(this.CompareList[0].Type)){
            this.ImageComparaison="/img/sup.png";
            this.ComparaisonMessage='Le Pokemon n°1 a l\'avantage';
        }

        if(this.CompareList[0].TypeInfo[0].Faible.includes(this.CompareList[1].Type) && this.CompareList[1].TypeInfo[0].Faible.includes(this.CompareList[0].Type)){
            this.ImageComparaison="/img/égal.png";
            this.ComparaisonMessage='Aucun Pokemon n\'a d\'avantage';
        }

    },
  });
  