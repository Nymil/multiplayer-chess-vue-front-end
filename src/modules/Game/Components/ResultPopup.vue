<template>
    <div id="result-popup">
        <div class="popup-content">
            <h2>{{ winner ? `${winner} wins!` : 'Draw' }}</h2>
            <p>Reason: {{ reason }}</p>
            <button @click="backToMenu">Back to menu</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        winner: {
            type: String,
            required: true,
            default: ""
        },
        reason: {
            type: String,
            required: true,
            default: ""
        }
    },
    methods: {
        backToMenu() {
            this.$router.push({ name: "GameSelection" });
        }
    }
}
</script>

<style scoped>
#result-popup {
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
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

p {
    font-size: 1.5rem;
    margin-bottom: 3rem;
}

button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    font-size: 1.5rem;
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