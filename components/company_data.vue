<template>

  <div class="flex row items-center no-wrap q-pt-xl q-pr-xl q-pl-xl  justify-center">
    <QAvatar size="22vh" square >
       <QImg :src="companyData.logo" />
    </QAvatar>
  <NuxtLink :to="companyData.direccionWeb" class="q-pa-xl row ">
  <h3 class="text-primary flex-auto">{{ companyData.nombre }}</h3>
  <QIcon name="open_in_new" color="primary" class="self-center"/>
</NuxtLink>
</div>
  <div class="row justify-center">
  <label class="text-primary text-h4 q-pr-md q-pl-md">{{ $t('rating') +' '+ rating }}</label>
  <QRating
 
  v-model="rating"
  max="5"
  size="lg"
  color="primary"
  icon="star_border"
  icon-selected="star"
  icon-half="star_half"
  no-dimming
  class="no-wrap"
  readonly

/>
</div>
<ReviewData :review-data="props.reviewData" :show-company="false" class="q-pl-xl q-pr-xl q-mt-md"/>
</template>

<script lang="ts" setup>

const props=defineProps<{
  companyData: Company,
  reviewData: Review[]
}>()

const rating:number=props.companyData.valoracion==null?0:Number(props.companyData.valoracion.toPrecision(2));


</script>

<style scoped>
@media screen and (max-width:1024px){

  h3{
    margin: 0;
  }

.no-wrap{
  flex-wrap: wrap;


}
*{  
text-align: center;
align-items: center;


}
:deep(.q-avatar){
  align-self:center;
  size: 100px;
}


}

a:has(h3){
  text-decoration: none;
}

</style>