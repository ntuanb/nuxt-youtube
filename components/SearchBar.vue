<template>
  <div class="search-bar">
    <form @submit.prevent="submit">
      <div class="field has-addons">
        <div class="control is-fullwidth">
          <input class="input" v-model="queryModel" type="text" placeholder="Find a video">
        </div>
        <div class="control">
          <button class="button is-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.is-fullwidth {
  width: 100%;
}
</style>

<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  queryModel: string = '';

  submit() {
    this.$emit('search', {
      query: this.queryModel
    })
  }


}
</script>

