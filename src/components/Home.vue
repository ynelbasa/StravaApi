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
    <v-row align="center">
      <v-col cols="1"><h4>Country</h4></v-col>
      <v-col cols="5" color="white">
        <v-btn
          color="#fc4c02"
          class="mx-2"
          rounded
          v-for="country in countries"
          :key="country"
          :text="selectedCountry !== country.toLocaleLowerCase()"
          @click="filterByCountry(country)"
          >{{ country }}</v-btn
        >
        <v-btn
          color="#fc4c02"
          rounded
          :text="selectedCountry !== 'all'"
          @click="filterByCountry('all')"
          >All</v-btn
        >
      </v-col>
      <v-col cols="6" class="text-right">
        <v-text-field
          width="120px"
          class="d-inline-block"
          v-model="searchText"
        ></v-text-field>
        <v-btn
          class="mx-2 d-inline-block"
          fab
          dark
          small
          color="#fc4c02"
          @click="searchByName"
          ><i class="fas fa-search"></i> </v-btn
      ></v-col>
    </v-row>
    <v-row justify="start">
      <v-card
        class="race"
        width="255"
        v-for="race in paginatedRaces"
        :key="race.id"
      >
        <v-card-text>
          <h3 class="text--primary">{{ race.name }}</h3>
          <p>
            {{ race.city }}, {{ race.state ? race.state + "," : "" }}
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
          :length="totalPages"
          :total-visible="totalPages"
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
      currentRaces: [],
      page: 1,
      pageSize: 8,
      searchText: "",
      countries: [],
      selectedCountry: "all",
    };
  },
  methods: {
    searchByName: function() {
      if (this.searchText !== "") {
        var result = [];
        this.races.forEach((race) => {
          var isMatch = race.name
            .toLocaleLowerCase()
            .includes(this.searchText.toLocaleLowerCase());
          if (isMatch) result.push(race);
        });

        this.page = 1;
        this.currentRaces = result;
      } else {
        this.currentRaces = this.races;
      }
    },
    filterByCountry: function(country) {
      this.selectedCountry = country.toLocaleLowerCase();

      if (this.selectedCountry === "all") {
        this.currentRaces = this.races;
      } else {
        var result = [];
        this.races.forEach((race) => {
          var isMatch = race.country
            .toLocaleLowerCase()
            .includes(country.toLocaleLowerCase());
          if (isMatch) result.push(race);
        });

        this.page = 1;
        this.currentRaces = result;
      }
    },
  },
  computed: {
    paginatedRaces: function() {
      if (this.currentRaces.length <= this.pageSize) return this.currentRaces;

      const start = (this.page - 1) * this.pageSize,
        end = start + this.pageSize;

      return this.currentRaces.slice(start, end);
    },
    totalPages: function() {
      return parseInt(this.currentRaces.length / this.pageSize) + 1;
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
button.v-btn--contained {
  color: white !important;
}

.race {
  margin: 20px;
}

.divider {
  background-color: #d3d3d3;
  padding: 0.5px;
  margin: 2px;
}
</style>
