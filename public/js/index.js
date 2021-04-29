document.addEventListener("DOMContentLoaded", () => {
  //route vuejs avec controle des login et props qaund nécessaire 
    var routes = [
      { path: "/", component: Dashboard },
      { path: "/login", component: Login,beforeEnter: (to, from, next) => {
        if(isToken()) next('/') 
        else next()}},
      { path: "/register", component: Register,beforeEnter: (to, from, next) => {
        if(isToken()) next('/') 
        else next()}},
      { path: "/Account", component: Account,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}
      },
      { path: "/changePseudo", component: ChangePseudo,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/changeEmail", component: ChangeEmail,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/changeMdp", component: ChangeMdp,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/disconect", component: Disconnect,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/addPokemon", component: AddPokemon,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/addRealPokemon", component: AddRealPokemon,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/details", component: Details,props: route => ({ IdPokemon: route.query.ID }),beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: "/compare", component: Compare,props: route => ({ CompareList: route.query.CompareList }),beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}},
      { path: '/:pathMatch(.*)*', component: Erreur },
    ];
  
    //implémentation du routeur 
    var router = new VueRouter({
      routes: routes,
      mode: "history",
      base: "/",
    });
//instance de vue
    new Vue({
      el: "#app-root",
      router: router,
      data() {
        return {
          Loged: isToken(),
        }
      },
    });
  });
