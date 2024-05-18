<template>
  <!--descripcion,empresa,cursoacademico(opcional)-->
  <QForm @submit="onSubmit()" class="col">
        <div class="row items-stretch">
        <label for="title" class="text-primary text-h5 q-pl-md q-pr-md col">{{ $t('submit_form_title') }}</label>
        <QInput 
        input-class="title-input"
        v-model="title"
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        class="q-mb-lg q-mt-sm q-pl-md q-pr-xl q-mt-md col-12"
        
        
        
      />
      <QRating
  @click="rateItem($event)"
  v-model="rating"
  max="5"
  size="2.4em"
  color="primary"
  icon="star_border"
  icon-selected="star"
  icon-half="star_half"
  no-dimming
  class="col no-wrap"
  :rules="[ rating!=0 || $t('empty_field_warn')]"
/>
      
      
    </div>

        <div class="row">
        <label for="description" class="col text-primary text-h5 q-pl-md q-pr-md  ">{{ $t('submit_form_description') }}</label>
        <QInput
        type="textarea"
        v-model="description"
        :placeholder="$t('submit_form_description_hint')"
        filled
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('empty_field_warn')]"
        class="q-mb-lg q-mt-sm q-pl-md q-pr-xl col-xl-auto q-mt-md"
       
        
        
      />
      
    </div>
    <div class="row">
      <label for="modality" class="text-primary text-h5  q-pl-md q-pr-md">{{ $t('submit_form_modality') }}</label>
      <QSelect  popup-content-class="options" filled v-model="modality" :options="modalityOptions" :rules="[ val => val && val!=-1 || $t('empty_field_warn')]"/>
  </div>
{{ rating }}
      <div class="flex flex-center q-pb-md">
        <QBtn rounded  type="submit" class="text-primary text-h6 shadow-4" >{{$t('login_submit')}}</QBtn>
        </div>
        
      </QForm>
</template>

<script lang="ts" setup>
const {t}=useI18n();
const modalityOptions=[t("submit_form_modality_on_site"),t("submit_form_modality_remote"),t("submit_form_modality_hybrid")]
const modality=ref('')
const title = ref('');
const rating=ref(0.0);
const votes=0;
const description=ref('')

async function onSubmit() {
  const modalityValue=modalityOptions.indexOf(modality.value)
  const timestamp:Date=new Date()
  const formattedDate:string=timestamp.toISOString().substring(0, 10);
  const finalRating=rating.value==0?null:rating.value;
  console.log(modalityValue);
  


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
<style scoped >

.title-input{

  align-self: end;
  width: 30vh;

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
