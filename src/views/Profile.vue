<template>
<v-container v-if="user">
  <v-row no-gutters style="flex-wrap: nowrap;" class="mt-5" justify="center">
    <v-col cols="4" align="center">
      <v-img class="rounded-circle" :src="user.profile" height="180" width="180"></v-img>
      <h2>{{ user.firstname }} {{ user.lastname }}</h2>
      <body>
        <i class="fas fa-map-marker-alt"></i>
        {{ user.country }}
      </body>
    </v-col>
    <v-col align="left" class="mt-15">
      <h4>
        Membership status:
        <span
          class="font-weight-regular"
        >{{ user.summit ? 'Free' : 'Summit Member'}}</span>
      </h4>
      <h4>
        Profile created at:
        <span
          class="font-weight-regular"
        >{{ moment(user.created_at).format("YYYY-MM-DD HH:mm") }}</span>
      </h4>
      <h4>
        Last updated at:
        <span
          class="font-weight-regular"
        >{{ moment(user.updated_at).format("YYYY-MM-DD HH:mm") }}</span>
      </h4>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  name: "profile",
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