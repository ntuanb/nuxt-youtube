<template>
  <div class="video-card">
    <figure class="video-card__image mb-3">
      <img :src="imageUrl">
    </figure>
    <div class="video-card__content">
      <h5 class="is-size-5 mb-4 has-text-weight-bold">{{ title }}</h5>
      <p class="is-size-7">Published: {{ published.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script lang="ts">

import { Action } from 'vuex-class'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {

  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public imageUrl!: string;

  @Prop({ required: true })
  public published!: Date;
}

</script>