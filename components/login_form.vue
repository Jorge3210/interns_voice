<template>
  <QForm @submit="onSubmit()" class=" flex-center column q-pl-xl q-pr-xl q-pb-xl q-pt-md text-center">

       
        <label class="text-primary text-center text-h5 q-pl-md q-pr-md ">{{ $t('login_mail') }}</label>
        <QInput 
        filled
        v-model="mail"
        :label="$t('login_mail_label')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        v-slot:append
      
        
      >
      <QIcon
            name="email"
          
          />
    </QInput>

    
      <label class="text-primary text-h5  q-pl-md q-pr-md">{{ $t('login_pass') }}</label>
      <QInput
        filled
        v-model="pass"
        :label="$t('login_pass_label')"
        lazy-rules
        :type="showPass?'text':'password'"
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        v-slot:append
       
      >
      <QIcon
            :name="showPass ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPass = !showPass"
          />
    </QInput>


      <div class="flex flex-center q-pb-md">
        <QBtn rounded type="submit" class="text-primary text-h6 q-pr-xl q-pl-xl shadow-4 ">{{$t('login_submit')}}</QBtn>
        </div>
      </QForm>
</template>

<script lang="ts" setup>
const showPass=ref(false);
const mail = ref('');
const pass=ref('');
const {t}=useI18n();
const $q=useQuasar();

async function onSubmit() {
  try{
  const loginResponse=await $fetch(await useDataSourceLoginAddress(),
  {
    method:"patch",
    body:{
      email:mail.value,password:pass.value
    }
  }
) as LoginResponse
  if(loginResponse.resultCode!="OK"){
  
   useWarning(t('login_warn'),$q);
  
}
else{
  localStorage.setItem("token",loginResponse.token);
  localStorage.setItem("userId",loginResponse.id.toFixed());
  const previousPage=localStorage.getItem("prevPage");
  if(previousPage!=null){
    return navigateTo(previousPage);
  }else{
    return navigateTo("/");
  }
} 
}catch(err){
  useWarning(t('server_error'),$q);
  
}
}
</script>
<style scoped>

@media screen and (min-width: 1024px){
    :deep(.q-field__control){

     width: calc(var(--q-size-sm) - 200px);
      
    }
    

}


</style>