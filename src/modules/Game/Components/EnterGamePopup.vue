<template>
<div id="enter-game-popup" @click.self="closePopup">
    <div class="popup-content">
      <h2>{{ isJoin ? `Join ${opponent}'s game` : 'Create a new game' }}</h2>
      <label for="your-name">Enter your name:</label>
      <input type="text" id="your-name" v-model="yourName" />
      <p class="error-message">{{ errorMessage }}</p>
      <button @click.prevent="submit">{{ isJoin ? 'Join Game' : 'Create Game' }}</button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        opponent: {
                type: String,
                required: false,
                default: ''
            },
            isJoin: {
                type: Boolean,
                required: false,
                default: false
            },
            errorMessage: {
                type: String,
                required: false,
                default: ''
            }
    },
    data() {
        return {
            yourName: ''
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.yourName);
        },
        closePopup() {
            this.$emit('close');
        }
    },
    emits: ['submit']
}
</script>

<style scoped>
#enter-game-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup-content {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 30rem;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

input {
  width: 20rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #ff4d4d;
  margin-bottom: 1rem;
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
</style>