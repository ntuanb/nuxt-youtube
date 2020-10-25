const API_KEY = '';
const CHANNEL_ID = 'UCi8e0iOVk1fEOogdfu4YgfA';
const MAX_RESULTS = '1';
const ORDER = 'viewCount';  

export const api = {
  async getVideos($axios, payload) {
    let query = ''
    let pageToken = ''

    if (payload && payload.query) {
      query = payload.query;
    }

    if (payload && payload.pageToken) {
      pageToken = payload.pageToken;
    }

    let response;

    try {
      response = await $axios.$get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          q: query,
          part: 'id,snippet',
          maxResults: MAX_RESULTS,
          order: ORDER,
          filter: 'id',
          pageToken: pageToken
        }
      })
    } catch (e) {
      return [];
    }

    if (!response) {
      return [];
    }

    return response;
  }
}

export const actions = {
  async getVideos({}, payload) {
    
    let query = ''
    let pageToken = ''

    if (payload && payload.query) {
      query = payload.query;
    }

    if (payload && payload.pageToken) {
      pageToken = payload.pageToken;
    }

    const response = await api.getVideos(this.$axios, {
      query,
      pageToken
    });

    console.log(response)

    return response;
  }
}