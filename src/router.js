import Vue from 'vue'
import Router from 'vue-router'
import Race from './views/Race'
import RaceDetail from './views/RaceDetail'
import Profile from './views/Profile'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'race', component: Race },
        { path: '/race/:id', name: 'race', component: RaceDetail, props: true },
        { path: '/profile', name: 'profile', component: Profile },
    ]
})
