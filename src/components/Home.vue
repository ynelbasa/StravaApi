<template>
  <v-container>
    <v-row no-gutters style="flex-wrap: nowrap;" justify="center">
      <v-col class="flex-grow-0 flex-shrink-0" v-if="user">
        <v-img
          class="rounded-circle"
          :src="user.profile"
          height="120"
          width="120"
        ></v-img>
        <h2 class="text-center">{{ user.firstname }} {{ user.lastname }}</h2>
        <body class="text-center">
          <i class="fas fa-map-marker-alt"></i>
          {{ user.country }}
        </body>
      </v-col>
    </v-row>
    <div class="divider"></div>
    <v-row justify="center">
      <v-card
        class="mx-auto race"
        width="260"
        v-for="race in paginatedRaces"
        :key="race.id"
      >
        <v-card-text>
          <h3 class="text--primary">{{ race.name }}</h3>
          <p>
            {{ race.city }}, {{ race.state !== "" ? race.state + "," : "" }}
            {{ race.country }}
          </p>
          <div class="text--primary">
            <i class="far fa-calendar-alt"></i>
            {{ moment(race.start_date_local).format("YYYY-MM-DD HH:mm") }}
            <br /><i class="fas fa-map-pin"></i>
            <span v-if="race.distance === 42195"> Marathon Distance</span>
            <span v-if="race.distance === 21097"> Half-Marathon Distance</span>
            <span v-if="race.distance < 21097">
              {{ race.distance / 1000 - ((race.distance / 1000) % 1) }}km
              Distance</span
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="#fc4c02">Learn More</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <div class="text-right">
        <v-pagination
          v-model="page"
          :length="parseInt(races.length / pageSize)"
          :total-visible="parseInt(races.length / pageSize)"
          color="#fc4c02"
        ></v-pagination>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: [],
      races: [],
      page: 1,
      pageSize: 8,
    };
  },
  methods: {},
  computed: {
    paginatedRaces: function() {
      const start = this.page * this.pageSize,
        end = start + this.pageSize;
      return this.races.slice(start, end);
    },
  },
  mounted() {
    var accessToken = "22ec1e0f3b31b5a404077f8907e01a30020d8f63";

    // Get Athlete
    this.$http
      .get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => (this.user = response.data));

    // Get Races
    this.$http
      .get("https://www.strava.com/api/v3/running_races?year=2020", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        this.races = response.data;
      });
  },
};
</script>
<style lang="scss" scoped>
.race {
  margin: 20px;
}

.divider {
  background-color: #d3d3d3;
  padding: 0.5px;
  margin: 2px;
}
</style>
