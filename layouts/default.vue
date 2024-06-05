
<template>
    <QLayout class="full-height">
  
      <QHeader elevated view="hHh LpR fFf">
        <QToolbar class="q-pb-sm q-pt-sm">
          <NuxtLink to="/" >
            <QAvatar size="60px"  >
                <QImg src="/image.png" alt="logo interns voice" />
            </QAvatar>
          </NuxtLink>
          
          <QToolbarTitle>
            <NuxtLink to="/" v-if ="$q.platform.is.desktop"  >
         Intern's Voice
        </NuxtLink>   
          </QToolbarTitle>


          <NuxtLink to="/job-search" >
          <QBtn icon="work" flat dense round size="lg" color="secondary"/>
          </NuxtLink>
         <LanguageSelector/>


          <NuxtLink to="/profile" >
          <QBtn icon="account_circle" flat dense round size="xl" color="secondary"/>
          </NuxtLink>

       </QToolbar></QHeader><QPageContainer class="justify-center items-center">
        <QPage class="flex items-center bg-secondary justify-center">
        <slot/>
    </QPage>
     
      </QPageContainer>
  
    </QLayout>
  </template>
<script setup lang="ts">
import '~/assets/main.css'
</script>
<style scoped>
a{
  text-decoration: none;
  color: var(--q-secondary);
}
a:hover{
 opacity: 0.7;
 transition: 0.3s;
}
a:active{
  opacity: 1;
  transition: 0.3s;
}




</style>
