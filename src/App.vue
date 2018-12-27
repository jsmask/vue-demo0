<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
    import jwtdecode from 'jwt-decode';
    export default {
        name:"app",
        components: {
            
        },
        data(){
          return {
            
          }
        },
        created(){
          const token=window.localStorage.getItem("kd_token");
          if(token){
            const decoded=jwtdecode(token);          
            this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded));
            if(decoded){this.$store.dispatch('setUser',decoded)} 
          }               
        },
        mounted () {

        },
        methods: {
            isEmpty(value){
                return (
                    value === undefined ||
                    value ===null ||
                    (typeof value == "object" && Object.keys(value).length == 0) ||
                    (typeof value == "string" && value.trim().length == 0)
                )
            }           
        }
    }
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
