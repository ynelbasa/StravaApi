<template>
  <v-container>
    <v-row no-gutters style="flex-wrap: nowrap;" justify="center">
      <v-col class="flex-grow-0 flex-shrink-0">
        <v-img class="rounded-circle" :src="user.profile" height="120" width="120"></v-img>
        <h2 class="text-center">{{user.firstname}} {{user.lastname}}</h2>
        <p class="text-center">{{user.country}}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    var accessToken = "ceb3c686e67a4fd557915a29618705bd1b9e8647";

    // Get Athlete
    this.$http
      .get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => (this.user = response.data));
  },
};
</script>
