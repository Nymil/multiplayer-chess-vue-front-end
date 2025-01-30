<template>
    <div id="captured-pieces">
        <div class="captured-section">
            <h3>Black's Captured Pieces</h3>
            <div class="pieces">
                <img v-for="(piece, index) in capturedPieces.black" :key="index" :src="getPieceImage(piece, 'black')" :alt="piece" class="captured-piece" />
            </div>
        </div>
        <div class="captured-section">
            <h3>White's Captured Pieces</h3>
            <div class="pieces">
                <img v-for="(piece, index) in capturedPieces.white" :key="index" :src="getPieceImage(piece, 'white')" :alt="piece" class="captured-piece" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        capturedPieces: {
            type: Object,
            required: true,
            default: { white: [], black: [] }
        }
    },
    methods: {
        getPieceImage(piece, color) {
            return `../../../src/assets/images/pieces/${color.toLowerCase()}-${piece.toLowerCase()}.png`
        }
    }
}
</script>

<style scoped>
#captured-pieces {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 25vh;
    height: 70vh;
    margin-left: 5rem;
    background: linear-gradient(135deg, #1a1a1a, #333);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.captured-section {
    width: 100%;
    margin-bottom: 1rem;
}

.captured-section h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 0.5rem;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.pieces {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.captured-piece {
    width: 3rem;
    height: 3rem;
    margin: 0.2rem;
    border: 2px solid #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
}

.captured-piece:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>