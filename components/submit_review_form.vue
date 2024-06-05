<template>
  <!--cursoacademico(opcional ver en peticion)-->
  <QForm @submit="onSubmit()" class=" flex-center column q-pl-xl q-pr-xl q-pb-xl q-pt-md text-center justify-center">
        <div class="row no-wrap items-center" >
        <label for="title" class="text-primary text-h5 q-pl-md q-pr-md">{{ $t('submit_form_title') }}</label>
        <QInput 
        input-class="title-input"
        v-model="title"
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        class="q-pl-md q-pr-xl"
        
        
        
      />
      <QRating
  @click="rateItem($event)"
  v-model="rating"
  max="5"
  size="lg"
  color="primary"
  icon="star_border"
  icon-selected="star"
  icon-half="star_half"
  no-dimming
  class="no-wrap"
  :rules="[ rating!=0 || $t('empty_field_warn')]"
/>
      
      
    </div>

        <div class="column full-width q-mt-md">
        <label class="col text-primary text-h5 q-pl-md q-pr-md text-left ">{{ $t('submit_form_description') }}</label>
        <QInput
        type="textarea"
        v-model="description"
        :placeholder="$t('submit_form_description_hint')"
        filled
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        class="q-pl-md q-pr-xl column"/>
    
      
    </div>
    <div class="row">
      <label  class="self-center text-primary text-h5  q-pl-md q-pr-md">{{ $t('company') }}</label>
      <QSelect
      filled
      v-model="empresa"
      use-input
      hide-selected
      table-colspan="2"
      fill-input
      input-debounce="250"
      option-value="id"
      option-label="nombre"
      :options="empresasBuscadas"
      @filter="searchCompanies"
      popup-content-class="text-primary bg-secondary"
      
     

      
>
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
      <label  class="text-primary text-h5  q-pl-md q-pr-md self-center">{{ $t('modality') }}</label>
      <QSelect  
      popup-content-class="options text-primary bg-secondary"

       filled v-model="modality" 
       :options="getModalities()" 
       :rules="[ val => val && val!=-1 || $t('empty_field_warn')]"/>
  </div>
      <div class="flex flex-center q-pb-md">
        <QBtn rounded  type="submit" class="text-primary text-h6 shadow-4" >{{$t('new_review_submit')}}</QBtn>
        </div>
        
      </QForm>
</template>

<script lang="ts" setup>

const {t}=useI18n();
const $q=useQuasar();
const modality=ref('')
const title = ref('');
const rating=ref(0.0);
const description=ref('')
const empresa=ref(null as any as Company);
const empresasBuscadas=ref();


function getModalities(){
  return  [t("modality_on_site"),
t("modality_remote"),
t("modality_hybrid")]
  
}


async function onSubmit() {
  const modalityValue=getModalities().indexOf(modality.value)

  const timestamp:Date=new Date()
  const formattedDate:string=timestamp.toISOString().substring(0, 10);
  const finalRating=rating.value==0?null:rating.value;
  if(finalRating!=null){
  const new_review=await $fetch(await useDataSourceReviewAddress(),
  {
    lazy:true,
    server:false,
    method:"POST",
    headers:{
      "Authorization": localStorage.getItem("token")!
    },
    retry:false,
    body:{
    titulo: title.value,
    modalidad: modalityValue,
    descripcion: description.value,
    empresaPracticas:{
        id:empresa.value.id
    },
    fechaPublicacion:formattedDate,
    estrellas: rating.value,
    votos: 0
}
  
  
  }
  
)
if(new_review){

  useNotification(t('submit_form_success'),$q);
  clearFields();
  }
  
  }
  else{
    useWarning(t('submit_form_rating_missing'),$q)
    
  }
  


}

      const searchCompanies =(val:string, update:any)=> {
        update(async() => {
          const needle = val.toLowerCase().trim()
          const companies=(await $fetch(await useDataSourceCompaniesAddress())) as Company[]
          if(val.length>1){
          empresasBuscadas.value =companies.filter(v =>v.nombre.toLowerCase().indexOf(needle) > -1)

          }else{
            empresasBuscadas.value=[]
          }
        })
      }


function clearFields(){
  title.value=''
  rating.value=0
  description.value=''
  empresa.value=null as any as Company
  modality.value=''

}

function rateItem(event: MouseEvent) {
  const starsContainer = event.currentTarget as HTMLElement;
  const rect = starsContainer.getBoundingClientRect();
  const xCoordInClickTarget = event.clientX - rect.left;
  const starsWidth = rect.width;
  const starWidth = starsWidth / 5; 
  const ratingValue = (xCoordInClickTarget / starWidth); 

  if (ratingValue % 1 < 0.5) {
    rating.value = Math.floor(ratingValue) + 0.5; 
  } else {
    rating.value = Math.round(ratingValue);
  }
}





  

</script>

<style scoped>

@media screen and (min-width:1024px) {

  :deep(.title-input){

  align-self: end;
  width: calc(var(--q-size-sm) - 150px);

}
  
}
@media screen and (max-width:1024px){

  :deep(.no-wrap){
    flex-wrap: wrap;


}
*{  
  text-align: center;
  margin-bottom: 5%;
  width: 100%;
}
}


textarea.q-field__native.q-placeholder{
  resize: none;
  height: 320px;
}



.options{
  background-color: var(--q-secondary);
  color:var(--q-primary);
}



</style>
