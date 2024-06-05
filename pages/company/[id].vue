<template>
  
  <div class="bordered-frame justify-center items-center full-height ">
    <CompanyData :company-data="company" v-if="isMounted" :review-data="companyReviews"/>    
  </div>

</template>

<script setup lang="ts">
const isMounted=ref(false);
const company=ref();
const {params} = useRoute();
const companyReviews=ref();
onMounted(async()=>{
const companyDataRequest=await $fetch(await useDataSourceCompanyAddress(params.id),{headers:{
    "Authorization":localStorage.getItem("token")!
}});
const companyReviewsDataRequest=await $fetch(await useDataSourceReviewByCompanyAddress(params.id),{headers:{
    "Authorization":localStorage.getItem("token")!
}});
companyReviews.value=companyReviewsDataRequest as Review[];
companyReviews.value.forEach(async(review: Review)  => {
const vote= await $fetch(
  await useDataSourceVotesByReviewAndUserAddress(review.id.toString())
  ,{headers:{
     "Authorization":localStorage.getItem("token")!

    }
,params:{
  usuarioId:localStorage.getItem("userId")!
}  
  }) as VoteResponse
  review.votos=vote.totalVotes
  review.userVoted=vote.voteType
  

});


company.value=companyDataRequest as Company;
isMounted.value=true;

})


</script>

<style scoped>
@media screen and (max-width:1024px){
.bordered-frame{
  min-height: inherit
}
}
</style>


