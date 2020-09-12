<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="10">
        <h2>{{race.name}}</h2>
      </v-col>
      <v-col color="white" cols="2">
        <v-btn color="#fc4c02" rounded>Join Race</v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-5">
      <h3>
        {{ moment(race.start_date_local).format("MMMM DD, YYYY") +
        ' | ' + moment(race.start_date_local).format("hh:mm A") }}
      </h3>
    </v-row>
    <v-row class="ml-5">
      <h3>
        {{ race.city }}, {{ race.state ? race.state + "," : "" }}
        {{ race.country }}
      </h3>
    </v-row>
    <v-row class="ml-5">
      <span class="mr-1">
        <span v-if="race.distance === 42195">Marathon Distance</span>
        <span v-if="race.distance === 21097">Half-Marathon Distance</span>
        <span v-if="race.distance < 21097">
          {{ race.distance / 1000 - ((race.distance / 1000) % 1) }}km
          Distance
        </span>
      </span>|
      <a
        :href="race.website_url"
        color="#fc4c02"
        class="mx-1 text-decoration-none"
        rounded
      >Event Website</a>
    </v-row>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-row justify="center">
      <iframe
        height="350"
        width="900"
        frameborder="0"
        style="border:0"
        :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAYYWSEDiyx7lomBF9IX-lZdASo4C8G9S4&q=' + race.city + race.state + race.country"
        allowfullscreen
      ></iframe>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "race-detail",
  data() {
    return { race: {} };
  },
  mounted() {
    // Get race detail
    this.$http
      .get("https://www.strava.com/api/v3/running_races/" + this.$attrs.id, {
        headers: { Authorization: "Bearer " + this.$accessCode },
      })
      .then((response) => {
        this.race = response.data;
      });
  },
};
</script>
<style lang="scss" scoped>
button.v-btn--contained {
  color: white !important;
}
</style>