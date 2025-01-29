import { createRouter, createWebHistory } from "vue-router";

// Import the components
import LandingPage from "../views/LandingPage.vue";
import GameSelection from "../views/GameSelection.vue";

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage
    },
    {
        path: "/game-selection",
        name: "GameSelection",
        component: GameSelection
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
