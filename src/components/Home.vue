<template>
  <v-container> {{ data }}</v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    var accessToken = "136d1239c5da4a83fd7385541c88e065a2b4311b";
    this.$http
      .get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => (this.data = response));
  },
};
</script>
