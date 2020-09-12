<template>
  <v-container>
    <v-row no-gutters style="flex-wrap: nowrap;" justify="center">
      <v-card class="mx-auto">
        <v-img
          class="white--text align-end"
          height="250px"
          src="https://mcgillstlaurent.com/wp-content/uploads/2017/02/banner-running.jpg"
        >
          <v-card-title>
            <h2 class="text-center">Featured Races</h2>
          </v-card-title>
        </v-img>
      </v-card>
    </v-row>
    <div class="divider"></div>
    <v-row align="center">
      <v-col cols="1">
        <h4>Country</h4>
      </v-col>
      <v-col cols="8" color="white">
        <v-btn
          color="#fc4c02"
          class="mx-2"
          rounded
          v-for="country in countries"
          :key="country"
          :text="selectedCountry !== country.toLocaleLowerCase()"
          @click="filterByCountry(country)"
        >{{ country }}</v-btn>
        <v-btn
          color="#fc4c02"
          rounded
          :text="selectedCountry !== 'all'"
          @click="filterByCountry('all')"
        >All</v-btn>
      </v-col>
      <v-col cols="3" class="text-right">
        <v-text-field width="120px" class="d-inline-block" v-model="searchText"></v-text-field>
        <v-btn class="mx-2 d-inline-block" fab dark small color="#fc4c02" @click="searchByName">
          <i class="fas fa-search"></i>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-card class="race" width="255" v-for="race in paginatedRaces" :key="race.id">
        <v-card-text>
          <h3 class="text--primary">{{ race.name }}</h3>
          <p>
            {{ race.city }}, {{ race.state ? race.state + "," : "" }}
            {{ race.country }}
          </p>
          <div class="text--primary">
            <i class="far fa-calendar-alt"></i>
            {{ moment(race.start_date_local).format("YYYY-MM-DD HH:mm") }}
            <br />
            <i class="fas fa-map-pin"></i>
            <span v-if="race.distance === 42195">Marathon Distance</span>
            <span v-if="race.distance === 21097">Half-Marathon Distance</span>
            <span v-if="race.distance < 21097">
              {{ race.distance / 1000 - ((race.distance / 1000) % 1) }}km
              Distance
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="#fc4c02">Learn More</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center" v-if="currentRaces.length === 0">
      No events found that match your criteria.
      <div class="text-right"></div>
    </v-row>
    <v-row justify="center" v-if="currentRaces.length > 0">
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
    searchByName: function () {
      if (this.searchText !== "") {
        var result = [];
        this.currentRaces.forEach((race) => {
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
    filterByCountry: function (country) {
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
    paginatedRaces: function () {
      if (this.currentRaces.length <= this.pageSize) return this.currentRaces;

      const start = (this.page - 1) * this.pageSize,
        end = start + this.pageSize;

      return this.currentRaces.slice(start, end);
    },
    totalPages: function () {
      return parseInt(this.currentRaces.length / this.pageSize) + 1;
    },
  },
  mounted() {
    // Get Races
    this.$http
      .get("https://www.strava.com/api/v3/running_races?year=2020", {
        headers: {
          Authorization: "Bearer " + this.$accessCode,
        },
      })
      .then((response) => {
        this.races = response.data;
        this.currentRaces = this.races;
        this.races.forEach((race) => {
          if (!this.countries.includes(race.country))
            this.countries.push(race.country);
        });
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
  margin: 20px 10px 10px 10px;
}
</style>
