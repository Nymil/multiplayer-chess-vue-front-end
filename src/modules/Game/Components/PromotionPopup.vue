<template>
    <div id="promotion-popup" @click.prrevent="handleOutsideClick">
        <div class="popup-content">
            <h2>Promote your pawn</h2>
            <div class="piece">
                <img 
                    v-for="piece in promotionPieces"
                    :key="piece"
                    :src="getPieceImage(piece)"
                    :alt="piece"
                    @click.prevent="handlePromotionPieceClick(piece)"
                    class="promotion-piece"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['promotion-piece-selected', 'close-promotion-popup'],
    props: {
        playerColor: {
            type: String,
            required: true,
            default: 'White'
        }
    },
    data() {
        return {
            promotionPieces: ['Queen', 'Rook', 'Bishop', 'Knight']
        };
    },
    methods: {
        getPieceImage(piece) {
            return `../../../src/assets/images/pieces/${this.playerColor.toLowerCase()}-${piece}.png`;
        },
        handlePromotionPieceClick(piece) {
            this.$emit('promotion-piece-selected', piece);
        },
        handleOutsideClick() {
            this.$emit('close-promotion-popup');
        }
    }
}
</script>

<style scoped>
#promotion-popup {
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

.pieces {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.promotion-piece {
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.promotion-piece:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>