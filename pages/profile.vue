<template>
   <div class="bordered-frame  ">
      <div :class="($q.screen.width>1024)?'items-center q-pa-xl row':'items-center q-pa-xl'">
        <div class="column flex flex-center flex-wrap">
      <QAvatar class="items-center" color="primary" size="22vh">
        <QImg :src="image"   icon="arrow_forward" color="positive"/>
      </QAvatar>
      <h4 class="text-primary q-pl-md q-pr-md">{{$t('profile_greeting')}} {{name}}!</h4>
      </div>
      <QSeparator v-if="$q.screen.width>1024" spaced="xl" color="primary" vertical />
      <div class="column flex">
      <ProfileData v-if="isMounted" :mail="mail" :surnames="surnames" :phoneNumber="phoneNumber" :country-id="countryId"/>
      <QBtn rounded class="text-primary align-center q-pr-md q-pl-md" @click="signOut()">{{ $t('login_log_out') }}</QBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>



const isMounted=ref(false);
const name=ref('');
const image=ref('');
const surnames=ref('');
const mail=ref('');
const countryId=ref('');
const phoneNumber=ref('');
onMounted(async()=>{
  
const token=localStorage.getItem("token");
const userId=localStorage.getItem("userId");
if(token!=null && userId!=null){
const userRequest=await useFetch(await useDataSourceUserInfoAddress(userId),{headers:{
  "Authorization":token
},server:false,lazy:true})
isMounted.value=true;
const userProfile=userRequest.data.value as UserProfile
name.value=userProfile.nombre;
image.value="https://picsum.photos/id/"+userProfile.imagen+"/200";
surnames.value=userProfile.apellidos;
mail.value=userProfile.email;
countryId.value=userProfile.dni;
phoneNumber.value=userProfile.telefono;

}else{
 await navigateTo("/login")
}})


function signOut(){
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return navigateTo("/")
}






</script>



