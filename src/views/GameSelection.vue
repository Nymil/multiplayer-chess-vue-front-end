<template>
    <section id="game-selection-container">
        <h1>Game Selection</h1>
        <div class="games-container">
            <div v-if="games.length === 0" class="no-games">
                <p>No games available at the moment. Create one to play.</p>
            </div>
            <div v-for="game in games" :key="game.id">
                <GameCard :game="game" @join="joinGame" />
            </div>
        </div>
        <button @click.prevent="createGame" class="create-game-button">Create Game</button>
        <EnterGamePopup v-if="showPopup" :isJoin="isJoin" :errorMessage="errorMessage" :opponent="opponent" @submit="handlePopupSubmit" @close="closePopup" />
    </section>
</template>

<script>
import GameCard from '../modules/Game/Components/GameCard.vue';
import GameService from '../modules/Game/Services/GameService.js';
import EnterGamePopup from '../modules/Game/Components/EnterGamePopup.vue';

export default {
    components: {
        GameCard,
        EnterGamePopup
    },
    data() {
        return {
            service: new GameService(),
            games: [],
            errorMessage: '',
            showPopup: false,
            isJoin: false,
            opponent: '',
            clickedGameToJoin: null
        }
    },
    methods: {
        createGame() {
            this.isJoin = false;
            this.showPopup = true;
        },
        joinGame(game) {
            this.isJoin = true;
            this.opponent = game.players[0];
            this.showPopup = true;
            this.clickedGameToJoin = game;
        },
        closePopup() {
            this.showPopup = false;
            this.errorMessage = '';
            this.clickedGameToJoin = null;
        },
        async getGames() {
            this.games = await this.service.getJoinableGames();
        },
        async handlePopupSubmit(name) {
            try {
                let gameId;
                if (this.isJoin) {
                    gameId = await this.service.joinGame(name, this.clickedGameToJoin.id);
                    localStorage.setItem('yourColor', 'black');
                } else {
                    gameId = await this.service.createGame(name);
                    localStorage.setItem('yourColor', 'white');
                }
                localStorage.setItem('userName', name);
                this.$router.push({ name: 'Game', params: { gameId: gameId } });
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        
    },
    created() {
        this.getGames();
    }
};
</script>

<style scoped>
#game-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  color: white;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
}

h1 {
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.no-games {
  text-align: center;
  font-size: 1.5rem;
  color: #ccc;
}

.games-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  min-height: 10rem;
  overflow-y: auto;
  max-height: 60vh;
}

.create-game-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-top: 2rem; /* Adjust margin to ensure it's within the viewport */
}

.create-game-button:hover {
  background: linear-gradient(135deg, #a777e3, #6e8efb);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>