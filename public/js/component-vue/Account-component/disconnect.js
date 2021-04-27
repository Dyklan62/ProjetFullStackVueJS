    var Disconnect = Vue.component("Disconnect", {
      template: ``,
      created: function() {
        clearToken()
        swal("","Vous etes déconnecté !","success")
                .then(() => {
                this.$router.push("/");
                this.$router.go(0);
                });
    }
    });