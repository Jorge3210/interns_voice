<template>
   <QList separator class="items-stretch q-ml-md">
    <ProfileDataItem overline-value="profile_mail" :value="mail" :editable="false"/>
    <ProfileDataItem overline-value="profile_surnames" :value="surnames" editable/>
    <ProfileDataItem overline-value="profile_number" :value="phoneNumber" editable/>
    <ProfileDataItem overline-value="profile_country_id" :value="countryId" :editable="false"/>
</QList>
</template>

<script lang="ts" setup>

defineProps<{
  mail: string,
  surnames: string,
  phoneNumber: string,
  countryId: string,
}>()

</script>

