<template>
  <ui-table
    :items="videos"
    :headers="headers"
    :options.sync="options"
    class="gilroy"
    @row:click="(item) => $router.push({name:'VideoDetail',params:{id:item.id}})"
  >
    <template #item.release_date="{item}">{{ new Date(item.release_date).toLocaleDateString()}}</template>
  </ui-table>
</template>
<script>
import { computed, onMounted } from "@vue/composition-api";

export default {
  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("video/getEntities");
    });
    const videos = computed(() => $store.state.video.paginator.results);
    const options = computed({
      get: () => {
        const vuexData = $store.state.video.paginator;
        return {
          total: vuexData.total_results,
          page: vuexData.page,
          itemsPerPage: 20,
          totalPages: vuexData.total_pages
        };
      },
      set: ({ page }) => {
        $store.dispatch("video/getEntities", page);
      }
    });
    const headers = [
      {
        key: "original_title",
        title: "Title"
      },
      {
        key: "original_language",
        title: "Language"
      },
      {
        key: "release_date",
        title: "Release date"
      }
    ];
    return {
      videos,
      headers,
      options
    };
  }
};
</script>