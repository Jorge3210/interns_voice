<template>
  <!--,fechapublicacionstart,fechapublicacionend ,-->
 <QDialog v-model="props.show" persistent>
      <QCard style="min-width: 350px">
        <QCardSection>
          <div class="text-h4 text-center q-mb-md">{{ $t('filter_dialog_title') }}</div>
          <label  class="text-primary text-h6  q-pl-md q-pr-md text-center self-center">{{ $t('company') }}</label>
          <QSelect
      filled
      v-model="company"
      use-input
      hide-selected
      table-colspan="2"
      fill-input
      input-debounce="250"
      option-value="id"
      option-label="nombre"
      :options="searchedCompanies"
      @filter="searchCompanies"
      popup-content-class="text-primary bg-secondary"
      class="q-pl-md q-pr-lg"
     

      
>
<template v-if="company" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="company = null as any as Company" class="cursor-pointer" />
        </template>
<template v-slot:option="{ opt ,itemProps,selected,toggleOption }">
  <QItem class="text-primary bg-secondary" v-bind="itemProps" :model-value="selected">
        <QItemSection>
          <QItemLabel>{{ opt.nombre }}</QItemLabel>
        </QItemSection>
        <QItemSection avatar>
           <QAvatar >
            <QImg :src="opt.logo"/>
           </QAvatar>
        </QItemSection>
      </QItem>

</template>

  <template v-slot:no-option>
    <QItem class="text-primary bg-secondary">
      <QItemSection >
        No results
      </QItemSection>
    </QItem>
  </template>
</QSelect>
        </QCardSection>

        <QCardSection class="q-pt-none">
          <label  class="text-primary text-h6  q-pl-md q-pr-md text-center self-center">{{ $t('modality') }}</label>
          <QSelect  
      popup-content-class="options text-primary bg-secondary"
      class="q-pl-md q-pr-lg"
       filled
      v-model="modality" 
       :options="getModalities()" 
       >
       <template v-if="modality" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="modality = null as any as string" class="cursor-pointer" />
        </template>
      </QSelect>
          
        </QCardSection>

        <QCardSection class="q-pt-none">
          <div class="text-h6 text-center">{{ $t('rating') }}</div>
          <QRating
  
  v-model="rating"
  max="5"
  size="lg"
  color="primary"
  icon="star_border"
  icon-selected="star"
  no-dimming
  class="no-wrap full-width justify-center"
 
/>
        </QCardSection>
        
        <QCardSection class="row items-center justify-center">
          <div class="text-primary text-h6  q-pl-md q-pr-md text-center self-center">{{ $t('date_picker_title') }}</div>
          <QIcon name="event" size="xl">
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate
           :subtitle="$t('date_picker_title')" 
           :title="fechas?moment(fechas.from).format($t('date_format'))+' - '+moment(fechas.to).format($t('date_format')):'-'"
           v-model="fechas"
           color="primary"
           text-color="secondary"
           :first-day-of-week="$t('first_weekday')"
            range mask="YYYY-MM-DD"
           />
          </QPopupProxy>
          </QIcon>
     
      </QCardSection>

        <QCardActions align="right" class="text-primary">
          <QBtn flat :label="$t('cancel_action')" v-close-popup @click="$emit('closeDialog')" />
          <QBtn flat :label="$t('filter_action')" v-close-popup @click="$emit('enterFilters',buildFilters());$emit('closeDialog')" />
        </QCardActions>
      </QCard>
    </QDialog>
</template>

<script lang="ts" setup>
import moment from 'moment';

const props=defineProps<{
  show:boolean
  companies:Company[]
}>()
const {t}=useI18n();
const modality=ref('');
const company=ref(null as any as Company);
const searchedCompanies=ref();
const rating=ref(0);
const fechas=ref();




function buildFilters():FilterTransferObject{
  const dateRange=fechas?.value?.from && fechas?.value?.to ? [fechas?.value?.from,fechas?.value?.to]:[fechas?.value,fechas?.value]
  return {
    modality:getModalities().indexOf(modality.value)==-1?undefined:getModalities().indexOf(modality.value),
    company:company.value,
    rating:rating.value==0?undefined:rating.value,
    dateRange:dateRange
  }
}



function getModalities(){
  return  [t("modality_on_site"),
t("modality_remote"),
t("modality_hybrid")]
  
}
const searchCompanies =(val:string, update:any)=> {
        update(async() => {
          const needle = val.toLowerCase().trim()
          const companies=(await $fetch(await useDataSourceCompaniesAddress())) as Company[]
          if(val.length>1){
          searchedCompanies.value =companies.filter(v =>v.nombre.toLowerCase().indexOf(needle) > -1)

          }else{
            searchedCompanies.value=[]
          }
        })
      }

</script>

<style scoped>
:deep(.q-date__view){
  background-color: var(--q-secondary) ;

}



</style>