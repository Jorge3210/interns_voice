
<template>
    <QLayout>
  
      <QHeader elevated view="hHh LpR fFf">
        <QToolbar class="q-pb-sm q-pt-sm">
          <NuxtLink to="/" >
            <QAvatar size="60px" >
                <QImg src="/image.png" alt="logo interns voice" />
            </QAvatar>
          </NuxtLink>
          <QToolbarTitle>
          <span  v-if="$q.platform.is.desktop">Intern's Voice</span>       
          </QToolbarTitle>


         <LanguageSelector/>


          <NuxtLink to="/profile" >
          <QBtn icon="account_circle" flat dense round size="xl" color="secondary"/>
          </NuxtLink>

       </QToolbar></QHeader><QPageContainer>
       <slot/>
      </QPageContainer>
  
    </QLayout>
  </template>
<script setup lang="ts">
import '~/assets/main.css'
</script>
