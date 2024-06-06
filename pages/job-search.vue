<template>
   <div id="job-search-page" class="bordered-frame justify-center items-center">
       <h3 class="text-primary q-pl-xl q-pr-xl text-center">{{ $t('job_search_title') }} </h3>
     
      <QInput v-model="jobName" rounded outlined v-slot:append :label="$t('job_search_input')" class="q-pl-md q-pr-md q-pb-lg" @keydown.enter="searchCompany()">
        <QAvatar color="primary" size="lg" @click="searchCompany()">
        <QIcon name="arrow_forward" color="positive"/>
      </QAvatar></QInput>
       <div class="'flex row items-center  q-pt-md q-pr-xl q-pl-xl  justify-around">
      <NuxtLink v-if="searched"  v-for="searchEngine in searchPages" :to="searchEngine.link+jobName" target="_blank" >     
    <QAvatar  size="10vh" square class="q-ml-md q-mr-md" >
       <QImg :src="searchEngine.logo" :alt="searchEngine.name" />
    </QAvatar>
 
 </NuxtLink>
  </div>
    </base>
    </div>
</template>

<script lang="ts" setup>
const jobName=ref('')
const searched=ref(false)

const searchContent=ref('')
const searchPages=[{
  name:"Google",
  link:'https://www.google.com/search?q=empleo+de+',
  logo:"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
},
{
  name:"LinkedIn",
  link:'https://www.linkedin.com/jobs/search/?keywords=',
  logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png",
},
{
  name:"InfoJobs",
  link:'https://www.infojobs.net/ofertas-trabajo?keyword=',
  logo:"https://upload.wikimedia.org/wikipedia/commons/9/98/Infojobs-Spain.png"
}
]



async function searchCompany(){
  if(jobName.value&&jobName.value.trim()){
    searched.value=true
  
  }
  
}


</script>



<style scoped>
iframe{
  background-color: white;
}

</style>