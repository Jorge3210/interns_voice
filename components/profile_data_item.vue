<template>
  <QItem clickable v-ripple >
  <QItemSection>
  <QItemLabel overline class="text-lg">{{ $t(overlineValue) }}</QItemLabel>
  <QItemLabel > {{value}}</QItemLabel>
</QItemSection>
<!--Si alguna vez se modifica el back para poder modificar usuarios desde el front, descomentar esto y la funcion
  <QItemSection v-if="editable" avatar>
  <q-icon color="primary" name="edit" />
</QItemSection>-->
</QItem>
</template>

<script lang="ts" setup>
/*Gracias rodrigo por hacer esto inaccesible desde el front, todos los comentarios van por lo de arriba */
/*const props=*/defineProps<{
  value:string,
  overlineValue:string,
  /*editable:boolean,*/
}>()
/*const $q=useQuasar();
const {t} = useI18n();

async function editField(){ 
  $q.dialog({
        title: t(props.overlineValue),
        message:  t("profile_dialog_new")+" "+t(props.overlineValue).toLowerCase(),
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('>>>> OK, received')
      }).onCancel(() => {
         console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })

    }*/

   
  

</script>

<style>
.q-item__label:not(.q-item__label--overline){

  font-size: 1.2rem;

}
.q-item__label.q-item__label--overline{

font-size: var(--q-md);

}
.q-dialog .q-card{
  background-color: var(--q-secondary);
  color:var(--q-primary)
}

</style>