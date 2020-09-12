<template>
<v-container>
  <v-row no-gutters style="flex-wrap: nowrap;" justify="center">
    <v-col class="flex-grow-0 flex-shrink-0" v-if="user">
      <v-img class="rounded-circle" :src="user.profile" height="120" width="120"></v-img>
      <h2 class="text-center">{{ user.firstname }} {{ user.lastname }}</h2>
      <body class="text-center">
        <i class="fas fa-map-marker-alt"></i>
        {{ user.country }}
      </body>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      user: {},
    };
  },

  mounted() {
    // Get Athlete
    this.$http
      .get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: "Bearer " + this.$accessCode,
        },
      })
      .then((response) => (this.user = response.data));
  },
};
</script>