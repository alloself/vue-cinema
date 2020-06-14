<template>
  <div class="gilroy">
    <div class="header">
      <button @click="$router.go(-1)">
        <i class="mdi mdi-chevron-left"></i>
      </button>
      <a class="gilroy title" v-if="entity" :href="entity.homepage">{{entity.original_title}}</a>
    </div>
    <div class="container" v-if="entity">
      <div class="row">
        <div class="four columns">
          <img :src="imagePath" :alt="entity.original_title" />
        </div>
        <div class="eight columns">
          <h1>{{entity.original_title}} ({{ entity.vote_average }})</h1>
          <p>{{ entity.overview }}</p>
          <div class="row">
            <h5>genres</h5>
            <div class="twelwe columns">
              <span class="chip" v-for="(item,index) in entity.genres" :key="index">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { IMAGE_PATH } from "@/const.js";
export default {
  data: () => ({
    entity: null
  }),
  async created() {
    this.entity = await this.getEntity(this.$route.params.id);
  },
  methods: {
    ...mapActions("video", ["getEntity"])
  },
  computed: {
    imagePath() {
      if (this.entity) {
        return `${IMAGE_PATH}${this.entity.poster_path}`;
      } else return null;
    }
  }
};
</script>
<style lang="scss" scoped>
.chip {
  padding: 8px 16px;

  padding: 1;
  color: white;
  background-color: black;
  height: 32px;
  border-radius: 16px;
  margin-right: 16px;
}
.container {
  padding-top: 128px;
  img {
    width: 100%;
    object-fit: contain;
  }
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 32px;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  button {
    margin: 0px;
    border-radius: 16px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    font-size: 24px;
    height: 36px;
    margin-right: 32px;
  }
}
</style>