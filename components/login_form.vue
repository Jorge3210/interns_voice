<template>
  <QForm @submit="onSubmit()" class="q-pl-md q-pr-md col q-pa-xl ">

        <label for="name" class="text-primary text-h5 q-pl-md q-pr-md ">{{ $t('login_mail') }}</label>
        <QInput 
        filled
        v-model="mail"
        :label="$t('login_mail_label')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        class="q-mb-lg q-mt-md q-pl-md q-pr-xl"
        
      />
      <label for="pass" class="text-primary text-h5  q-pl-md q-pr-md">{{ $t('login_pass') }}</label>
      <QInput
        filled
        v-model="pass"
        :label="$t('login_pass_label')"
        lazy-rules
        :type="showPass?'text':'password'"
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        v-slot:append
        class="q-mb-lg q-mt-md  q-pl-md q-pr-xl"
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
const $q=useQuasar();

async function onSubmit() {
  const loginResponse=await $fetch(await useDataSourceLoginAddress(),{method:"patch",body:{email:mail.value,password:pass.value}}) as LoginResponse
  if(loginResponse.resultCode!="OK"){
  $q.notify({
            color: 'negative',
            textColor: 'secondary',
            icon: 'warning',
            message: 'Error al iniciar sesion',
            
          })
  
}
else{
  localStorage.setItem("token",loginResponse.token)
  localStorage.setItem("userId",loginResponse.id.toFixed())
  const previousPage=localStorage.getItem("prevPage");
  if(previousPage!=null){
    return navigateTo(previousPage)
  }else{
    return navigateTo("/")
  }
}
}
</script>
