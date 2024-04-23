<template>
      <div class="landing-page justify-center items-center q-ml-md q-mr-md">
       <h3 class="text-primary q-mt-lg q-pl-md q-pr-md">{{ $t('landing_header') }} <br v-if="$q.platform.is.desktop"></h3>
      <QInput v-model="search" rounded outlined v-slot:append :label="$t('landing_search_hint')" class="q-pl-md q-pr-md q-pb-lg">
      <QAvatar color="primary" size="lg">
        <QIcon name="arrow_forward" color="positive"/>
      </QAvatar>
      </QInput>
      <div class="text-center text-weight-bold text-h6 q-pb-md">{{ $t('landing_or') }} <NuxtLink class="text-primary " to="submit-review">{{ $t('landing_submit_self') }}</NuxtLink></div>
    </div>
</template>

<script setup lang="ts">

const search= ref("")



</script>

<style>
.landing-page{
  border: 2px solid var(--q-primary);
  border-radius: 15px;
  padding: 1%
}



</style>