document.addEventListener("DOMContentLoaded", () => {
  
    var routes = [
      { path: "/", component: Dashboard },
      { path: "/login", component: Login },
      { path: "/register", component: Register},
      { path: "/Account", component: Account},
      { path: "/changePseudo", component: ChangePseudo},
      { path: "/changeEmail", component: ChangeEmail},
      { path: "/changeMdp", component: ChangeMdp},
      { path: "/disconect", component: Disconnect},
      { path: "/addPokemon", component: AddPokemon},
      { path: "/addRealPokemon", component: AddRealPokemon},
      { path: "/details", component: Details,props: route => ({ IdPokemon: route.query.ID })},
      { path: "/compare", component: Compare,props: route => ({ CompareList: route.query.CompareList })},
      { path: '/:pathMatch(.*)*', component: Erreur },
    ];
  
    var router = new VueRouter({
      routes: routes,
      mode: "history",
      base: "/",
    });

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

  /*{ path: "/Account", component: Account,beforeEnter: (to, from, next) => {
        if(!isToken()) next('/login') 
        else next()}
      },*/