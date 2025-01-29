<template>
    <section id="landing-page-container">
        <h1>Chess game👍</h1>
        <router-link id="to-game-button" to="/game-selection">Start playing</router-link>
    </section>
</template>

<style scoped>
h1 {
    font-weight: bold;
    font-size: 4rem;
}

#landing-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

#to-game-button {
    padding: 1rem 2rem;
    display: block;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

#to-game-button:hover {
    background: linear-gradient(135deg, #a777e3, #6e8efb);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

</style>