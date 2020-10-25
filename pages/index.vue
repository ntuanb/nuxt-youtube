<template>
  <div class="search">

    <form @submit.prevent="submit">
      <SearchBar
        class="mb-5"
        @search="search"
      />
    </form>

    <div class="columns">
      <template v-for="(video, index) in videos">
        <div :key="index" class="column is-one-quarter">
          <VideoCard
            :imageUrl="video.snippet.thumbnails.medium.url"
            :title="video.snippet.title"
            :published="new Date(video.snippet.publishedAt)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  videos: Array<any> = [];

  async mounted() {
    const res = await this.getVideos();
    this.videos = res.items;
  }

  @Action('youtube/getVideos')
  async getVideos(payload?: any): Promise<any> {
    return await this.getVideos(payload);
  }

  async search(payload: any) {
    this.$router.push('/search?query=' + payload.query);
  }
}
</script>

