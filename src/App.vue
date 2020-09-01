<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Strava Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo/strava.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Strava Text"
          class="shrink mr-2"
          contain
          src="./assets/logo/strava-text.png"
          transition="scale-transition"
          width="100"
        />
        <span class="mr-2">Activities</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.strava.com/oauth/authorize?client_id=51311&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read"
        target="_blank"
        text
      >
        <span class="mr-2">Log in</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",
  components: {
    Home,
  },
  data: () => ({}),
};
</script>
