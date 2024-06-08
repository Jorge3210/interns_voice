<template>
    <NuxtLayout >
        <div>
        <h3 class="text-primary text-bold">{{ $t('page_not_found_error') }}</h3>
        <div class="text-primary text-h4 text-center back-home" @click="navigateTo('/')">{{ $t('page_not_found_back') }}</div>
    </div>
    </NuxtLayout> 
 </template>
 <style scoped>
.back-home{
    text-decoration:underline

}
.back-home:hover{
    opacity: 0.8;
    cursor: pointer;
  
}
</style>