<template>
  <QScrollArea>
    <QList separator padding bordered>
      <QItem v-for="review in reviewData">
        <QItemSection>
          <QItemLabel class="text-primary"  @click="review.showDialog=true">{{ review.titulo }}</QItemLabel>
              <QRating max="5" size="sm" color="primary" icon="star_border" icon-selected="star" icon-half="star_half"
            no-dimming class="no-wrap" readonly v-model="review.estrellas" />
          <QItemLabel caption lines="3">{{ review.descripcion }}</QItemLabel>
          <NuxtLink :to="`/company/${review.empresaPracticas.id}`" v-if="showCompany">
            <QAvatar square >
            <QImg :src="review.empresaPracticas.logo" :alt="review.empresaPracticas.nombre"  class="review-logo" fit="scale-down"/>
          </QAvatar>
          </NuxtLink>

        </QItemSection>
        <QItemSection side>
          <QItemLabel>{{ getModalityText(review.modalidad) }}</QItemLabel>
          <QItemLabel>{{ review.fechaPublicacion }}</QItemLabel>
          <QIcon name="arrow_upward" class="vote_control vote_up" :color="checkVoteType(review.userVoted, true)"
            @click="vote(review, true)" />
          <QItemLabel class="q-pr-sm">{{ review.votos }}</QItemLabel>
          <QIcon name="arrow_downward" class="vote_control vote_down" :color="checkVoteType(review.userVoted, false)"
            @click="vote(review, false)" />

        </QItemSection>
      <ReviewDetails :title="review.titulo" :description="review.descripcion" :companyLogo="review.empresaPracticas.logo" :rating="review.estrellas" :companyName="review.empresaPracticas.nombre" :show="review.showDialog!" @closeDialog="review.showDialog! = false"/>
      </QItem>
      <QItem v-if="!reviewData||reviewData.length==0 ">
        <QItemSection>
      
          <div class="q-pa-xl text-primary text-h5">{{ $t('no_reviews') }}</div>

        </QItemSection>

      </QItem>
    </QList>
  </QScrollArea>
</template>

<script lang="ts" setup>


const props=defineProps<{
  reviewData: Review[],
  showCompany: boolean

}>();
const { t } = useI18n();



function getModalityText(modality: string) {
  switch (modality) {
    case "Remoto": {
      return t('modality_remote')
    }
    case "Presencial": {
      return t('modality_on_site')
    }
    case "Hibrido": {
      return t('modality_hybrid')
    }

  }


}

function checkVoteType(voteType: string, upwards: boolean) {
  switch (voteType) {
    case "positive": {
      return upwards ? "primary" : "positive"
    }
    case "negative": {
      return !upwards ? "primary" : "positive"
    }
    default: {
      return "positive"
    }
  }
}


async function vote(review: Review, upwards: boolean) {
  let voteTypeValue: string | null = upwards ? 'positive' : 'negative';
  voteTypeValue = review.userVoted == voteTypeValue ? null : voteTypeValue;
  const newVotes = await $fetch(await useDataSourceBackendVoteActionAddress(), {
    method: "post", body: {
      resenyaId: review.id,
      positivo: voteTypeValue != null ? ('positive' == voteTypeValue) : null,
      usuarioId: localStorage.getItem("userId")
    }, headers: {
      Authorization: localStorage.getItem("token")!
    }
  })
  review.userVoted = voteTypeValue != null ? voteTypeValue : "null";
  review.votos = newVotes as number
}


</script>

<style scoped>
.q-scrollarea,
:deep(.q-scrollarea__container) {
  min-height: 400px;
}



@media screen and (min-width: 1024px) {
  .vote_control:hover {
    color: var(--q-primary) !important;
  }
}
</style>

<!--<template>
  <QScrollArea>
    <QList separator padding bordered>
      <ReviewItem v-for="review in reviewData" :review="review" :show-company="showCompany"/>
        <QItem v-if="!reviewData||reviewData.length==0 ">
    <QItemSection>
  
      <div class="q-pa-xl text-primary text-h5">{{ $t('no_reviews') }}</div>

    </QItemSection>
    </QItem>


    </QList>
  </QScrollArea>
</template>

<script lang="ts" setup>






defineProps<{
  reviewData: Review[],
  showCompany: boolean,
  

}>();
const { t } = useI18n();
-->