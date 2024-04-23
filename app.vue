<template>
   <NuxtLayout >
    <NuxtPage/>
   </NuxtLayout> 
</template>
<script setup lang="ts">

const log=ref();

// Como fetchear datos a un ref por si necesitas reactividad
const logged=ref();
logged.value=await isLogged();


 async function isLogged(){
  const login= await useFetch('http://localhost:8080/api/usuario/login',
{
method:'patch',
body:{
  "email":"1843548@alu.murciaeduca.es",
  "password":"admin"
}
,server:true,

});
  
console.log(login.status.value);
  return login.status.value=="success"?"logged":"unlogged";
}


</script>

