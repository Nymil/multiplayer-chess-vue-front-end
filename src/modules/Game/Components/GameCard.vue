<template>
    <div class="game-card">
        <img src="../../../assets/chess-pawn-icon.svg" alt="Pawn Icon" class="pawn-icon" />
        <div class="game-info">
            <p><strong>Opponent:</strong> {{ game.players[0] }}</p>
            <p><strong>Status:</strong> {{ game.state }}</p>
        </div>
        <button @click="joinGame">Join Game</button>
    </div>
</template>

<script>
export default {
    props: {
        game: {
            type: Object,
            required: true
        }
    },
    methods: {
        joinGame() {
            this.$emit('join', this.game);
        }
    },
    emits: ['join']
};
</script>

<style scoped>
.game-card {
  display: flex;
  align-items: center;
  background: #333;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 30rem;
}

.pawn-icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.game-info {
  flex-grow: 1;
}

button {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

button:hover {
  background: linear-gradient(135deg, #a777e3, #6e8efb);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.game-info p {
  margin: 0.5rem;
}
</style>