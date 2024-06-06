<template>
  <!--empresa, modalidad,estrellas,fechapublicacionstart,fechapublicacionend ,-->
  <div class="bordered-frame justify-center items-center">
    <h3 class="text-primary q-pl-xl q-pr-xl">{{ $t('search_title') }} </h3>
    <div class="row q-mb-sm filters">
      <QSelect outlined rounded v-model="firstFilter" table-colspan="2" fill-input :options="firstFilterOptions"
        popup-content-class="text-primary bg-secondary" class="col-5" @update:model-value="sortBasicFilters()" />

      <QSelect outlined rounded v-model="secondFilter" table-colspan="2" fill-input :options="secondFilterOptions"
        popup-content-class="text-primary bg-secondary" class="col-5 q-ml-sm text-primary"
        @update:model-value="sortBasicFilters()" />

      <QBtn rounded class="col-1 q-ml-sm" icon="filter_alt" text-color="primary"
        @click="showFilterDialog = !showFilterDialog" />
      <FilterDialog :show="showFilterDialog" @closeDialog="showFilterDialog = false" :companies="companies"
        @enterFilters="(filters: FilterTransferObject) => modifyFilter(filters)" />
    </div>

    <ReviewData :review-data="reviewData" :show-company="true"></ReviewData>


  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const reviewData: Ref<Review[]> = ref([]);
const firstLoad = ref(true);
const companies = (await $fetch(await useDataSourceCompaniesAddress())) as Company[]
const paramFiltered = ref(useRoute().query.company)
const showFilterDialog = ref(false)
const secondFilterOptions = reactive([
  {
    label: computed(() => t('search_filter_recent')),
    value: "date_desc"

  },
  {
    label: computed(() => t('search_filter_oldest')),
    value: "date_asc"
  }
])

const firstFilterOptions = reactive([
  {
    label: computed(() => t('search_filter_most_voted')),
    value: "vote_desc"

  },
  {
    label: computed(() => t('search_filter_least_voted')),
    value: "vote_asc"
  }
])
const firstFilter = ref(firstFilterOptions[0])
const secondFilter = ref(secondFilterOptions[0])
onMounted(async () => {

  modifyFilter();

})


async function modifyFilter(filters?: FilterTransferObject) {
  if (!paramFiltered.value && firstLoad.value) {
    await getReviewsBasicFilters();
    firstLoad.value = false;

  } else {
    if (useRoute().query.company && firstLoad.value) {
      console.log(useRoute().query.company)
      await getReviewsWithFilters({ company: {nombre:useRoute().query.company} } as FilterTransferObject);
      firstLoad.value = false;

    } else {
      await getReviewsWithFilters(filters);
    }

  }
}

function sortBasicFilters() {
  switch (firstFilter.value.value) {
    case "vote_desc":
      switch (secondFilter.value.value) {
        case "date_desc":
          reviewData.value.sort((a, b) => b.votos - a.votos || new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime());
          break;
        case "date_asc":
        reviewData.value.sort((a, b) => b.votos - a.votos || new Date(a.fechaPublicacion).getTime() - new Date(b.fechaPublicacion).getTime());
          break;
      }
      break;
    case "vote_asc":
      switch (secondFilter.value.value) {
        case "date_desc":
        reviewData.value.sort((a, b) => a.votos - b.votos || new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime());
          break;
        case "date_asc":
        reviewData.value.sort((a, b) => a.votos - b.votos || new Date(a.fechaPublicacion).getTime() - new Date(b.fechaPublicacion).getTime());
          break;
      }
      break;

  }
}



async function getReviewsBasicFilters() {
  const reviews: Review[] = await $fetch(await useDataSourceBackendReviewWithFiltersAdress(), {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token")!
    },
    body: {
      firstSortType: firstFilter.value.value,
      secondSortType: secondFilter.value.value
    }
  }) as Review[]

  reviews.forEach(async (review: Review) => {
    review.showDialog = false;
    const vote = await $fetch(
      await useDataSourceVotesByReviewAndUserAddress(review.id.toString())
      , {
        headers: {
          "Authorization": localStorage.getItem("token")!

        }
        , params: {
          usuarioId: localStorage.getItem("userId")!
        }
      }) as VoteResponse
    review.votos = vote.totalVotes;
    review.userVoted = vote.voteType;
    reviewData.value = reviews;
    sortBasicFilters();

  });
}

async function getReviewsWithFilters(filters?: FilterTransferObject) {
  const reviews: Review[] = await $fetch(await useDataSourceBackendReviewWithFiltersAdress(), {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token")!
    },
    body: {
      firstSortType: firstFilter.value.value,
      secondSortType: secondFilter.value.value,
      empresaNombre: filters?.company?.nombre,
      modalidad: filters?.modality,
      fechaPublicacionStart: filters?.dateRange ? filters.dateRange[0] : undefined,
      fechaPublicacionEnd: filters?.dateRange ? filters.dateRange[1] : undefined,
      estrellas: filters?.rating

    }
  }) as Review[]

  reviews.forEach(async (review: Review) => {
    review.showDialog =false;
    const vote = await $fetch(
      await useDataSourceVotesByReviewAndUserAddress(review.id.toString())
      , {
        headers: {
          "Authorization": localStorage.getItem("token")!

        }
        , params: {
          usuarioId: localStorage.getItem("userId")!
        }
      }) as VoteResponse
    review.votos = vote.totalVotes;
    review.userVoted = vote.voteType;


  });
  reviewData.value = reviews;
  sortBasicFilters();
}


</script>

<style scoped>
@media screen and (max-width:1024px) {

  :deep(.q-scrollarea) {
    padding-left: 4%;
    padding-right: 4%;

  }

  .filters {
    padding-left: 4%;
    padding-right: 2%;
  }
}
</style>