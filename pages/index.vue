<template>
  <div class="search">

    <form @submit.prevent="submit">
      <SearchBar
        class="mb-5"
        @search="search"
      />
    </form>

    <div class="columns is-multiline">
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

    <client-only>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </client-only>
  </div>
</template>

<script lang="ts">
import InfiniteLoading from 'vue-infinite-loading';
import { Action } from 'vuex-class'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    InfiniteLoading
  }
})
export default class Search extends Vue {
  videos: Array<any> = [];
  nextPageToken: string = '';

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

  async infiniteHandler($state: any) {
    const res = await this.getVideos({
      pageToken: this.nextPageToken
    })

    if (!res || !res.items || !res.items.length) {
      $state.complete();
      return;
    }

    this.videos.push(...res.items)
    this.nextPageToken = res.nextPageToken;

    $state.loaded();
  }
}
</script>

