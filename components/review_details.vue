<template>
  <QDialog v-model="props.show">
  <QCard  style="min-width: 320px;">
    <QCardSection  >
      <QAvatar square >
            <QImg :src="companyLogo"  class="review-logo" fit="scale-down"/>
          </QAvatar>
          <div class="text-h6 text-primary"> {{ companyName }}</div>
    </QCardSection>
    <QCardSection>
      <QRating
      v-model="props.rating" size="sm" color="primary" icon="star_border" icon-selected="star" icon-half="star_half"
      ></QRating>
    </QCardSection>
    <QCardSection>
      <div class="text-h6 text-primary text-bold">{{ title }}</div>
    </QCardSection>
    <QCardSection>
      <div class="text-body text-primary">{{ description }}</div>
    </QCardSection>
    <QCardActions align="right" class="text-primary">
          <QBtn flat :label="$t('cancel_action')" v-close-popup @click="$emit('closeDialog')" />
        </QCardActions>
  </QCard></QDialog>
</template>

<script lang="ts" setup>
const props=defineProps<{
  title: string,
  description: string,
  companyLogo: string,
  rating: number,
  show:boolean,
  companyName:string

}>()

</script>

<style>

</style>