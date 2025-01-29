<template>
    <section id="game-selection-container">
        <h1>Game Selection</h1>
        <div class="games-container">
            <div v-if="games.length === 0" class="no-games">
                <p>No games available at the moment. Create one to play.</p>
            </div>
            <div v-for="game in games" :key="game.id">
                <GameCard :game="game" />
            </div>
        </div>
        <button @click.prevent="createGame" class="create-game-button">Create Game</button>
    </section>
</template>

<script>
import GameCard from '../modules/Game/Components/GameCard.vue';

export default {
    components: {
        GameCard
    },
    data() {
        return {
            games: [
                {
                    id: 'a6d5f0df-6299-4e52-aff9-d3237e5712f9',
                    players: ['george'],
                    state: 'Waiting'
                },
                {
                    id: 'a6d5f0df-6299-4e52-aff9-d3237e5ze2f9',
                    players: ['jeff'],
                    state: 'Waiting'
                },
                {
                    id: 'a6d5f0df-6299-4e52-aff9-d3237e5ze2f9',
                    players: ['arno'],
                    state: 'Waiting'
                },
            ]
        }
    },
    methods: {
        createGame() {
            console.log('Creating a new game');
        }
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