<template>
  <QList>
        <QItem clickable v-close-popup v-for="language in useI18n().availableLocales" @click="i18.setLocale(language)" >
          <QItemSection avatar>
            <QAvatar size="lg" rounded >
              <QImg  fit="fill" :src="`/language_icons/${language}.png`" :alt="$t(language)"/>
            </QAvatar>
          </QItemSection>
          <QItemSection>
            <QItemLabel>{{$t(language)}}</QItemLabel>
          </QItemSection>
        </QItem>
        
      </QList>
</template>
<script setup lang="ts">
const i18=useI18n();
</script>
