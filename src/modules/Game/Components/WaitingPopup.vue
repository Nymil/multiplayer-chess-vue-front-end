<template>
    <div id="waiting-popup">
        <div class="popup-content">
            <h2>Waiting for another player to join</h2>
            <p>Please wait<span>{{ dots }}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dots: ''
        };
    },
    mounted() {
        this.startDotAnimation();
    },
    methods: {
        startDotAnimation() {
            let dotCount = 0;
            setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                this.dots = '.'.repeat(dotCount);
            }, 500);
        }
    }
}
</script>

<style scoped>
#waiting-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.popup-content {
    background: #1a1a1a;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: white;
    width: 30rem;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1rem;
}
</style>