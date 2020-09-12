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
        <span class="mr-2 text-uppercase font-weight-medium">Running Races</span>
      </div>

      <v-spacer></v-spacer>
      <v-btn :href="'/'" text>
        <span class="mr-2">Home</span>
        <i class="fas fa-home"></i>
      </v-btn>
      <v-btn :href="'/profile'" text>
        <span class="mr-2">Profile</span>
        <i class="fas fa-user"></i>
      </v-btn>
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
