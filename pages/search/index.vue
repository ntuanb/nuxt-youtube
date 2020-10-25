<template>
  <div class="search">
    <div class="search__items">
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

    <infinite-loading @infinite="infinite"></infinite-loading>
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
  queryModel: string = '';

  async mounted() {
    const query = this.$route.query;

    if (query.query) {
      this.queryModel = query.query as string;

      const res = await this.getVideos({
        query: this.queryModel
      });

      this.videos = res.items;
      this.nextPageToken = res.nextPageToken;

      return;
    }

    this.$router.push('/')
  }

  @Action('youtube/getVideos')
  async getVideos(payload: any): Promise<any> {
    return await this.getVideos(payload);
  }

  async infinite() {
    const res = await this.getVideos({
      query: this.queryModel,
      pageToken: this.nextPageToken
    })

    this.videos = {
      ...this.videos,
      ...res.items
    }

    this.nextPageToken = res.nextPageToken;
  }
}
</script>

