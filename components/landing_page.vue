<template>
      <div class="bordered-frame q-pa-xl">
      <h4 v-if="$q.screen.width<=1024" class="text-primary q-pl-md q-pr-md text-center text-bold">Intern's voice</h4>
       <h3 v-if="$q.screen.width>1024" class="text-primary q-pl-md q-pr-md text-center">{{ $t('landing_header') }}</h3>
       <h5 v-if="$q.screen.width<=1024" class="text-primary q-pl-md q-pr-md text-center">{{ $t('landing_header') }}</h5>
     
      <QInput v-model="search" rounded outlined v-slot:append :label="$t('landing_search_hint')" class="q-pl-md q-pr-md col-7" @keydown.enter="searchCompany(search)">
      <QAvatar color="primary" size="lg" @click="searchCompany(search)">
        <QIcon name="arrow_forward" color="positive"/>
      </QAvatar>
      </QInput>
      <div class="justify-center items-center self-center text-center col-5 q-mt-lg q-mb-sm">
      <QIcon name="apartment" color="primary" size="lg" @click="navigateTo(`/search-reviews`)"/>

        <span class="text-center text-weight-bold text-h6 q-pb-md">
          <NuxtLink class="text-primary " to="search-reviews">{{ $t('landing_all_search') }}
          </NuxtLink>
        </span>


    </div>
      <div class="text-center text-weight-bold text-h6 q-pb-md">
        
        {{ $t('landing_or') }} <br> 
        <div class="q-mt-md">
        <QIcon name="speaker_notes" color="primary" class="q-mt" size="md" @click="navigateTo(`/submit-review`)"/>
         <NuxtLink class="text-primary q-m" to="submit-review">
          
         
          {{ $t('landing_submit_self') }}
        </NuxtLink>
      </div>
      </div>
      <div  v-if="$q.screen.width>1024 && companies.length>0" class="text-center text-primary text-h6 q-pb-md q-mt-md">{{ $t('landing_suggested_companies') }}</div>
      <div class="flex row items-center  q-pt-md q-pr-xl q-pl-xl  justify-around">
    <NuxtLink v-if="$q.screen.width>1024" v-for="company in companies" :to="'/company/'+company.id">
    <QAvatar  size="10vh" square class="q-ml-md q-mr-md" >
       <QImg :src="company.logo" :alt="company.nombre" />
    </QAvatar>
 </NuxtLink>

</div>
    </div>
    
</template>

<script setup lang="ts">
const search= ref("")
const companies=((await $fetch(await useDataSourceCompaniesAddress()).catch(()=>[])) as unknown as Company[]).slice(0,4)

function searchCompany(search:string){
  if(search&&search.trim()){
    return navigateTo(`/search-reviews?company=${search}`)
  }
  
  

}



</script>

<style>
@media screen and (min-width: 1024px){
.bordered-frame{
  border: 2px solid var(--q-primary);
  border-radius: 15px;
  padding: 1%;
}
}
@media screen and (max-width:1024px){
  h3{
    font-size: 40px;
    
    text-align: center;
    

   
    
  }
  
}



</style>