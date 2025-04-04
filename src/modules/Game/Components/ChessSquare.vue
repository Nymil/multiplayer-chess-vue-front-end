<template>
    <div
        class="chess-square"
        :class="{
            'selected': isSelected,
            'legal-move': isLegalMove,
            'last-move': isLastMove,
            'white': isWhiteSquare,
            'black': !isWhiteSquare,
        }"
        :data-piece="piece"
        :data-piece-color="pieceColor"
        @click.prevent="handleClick"
    />
</template>

<script>
const PIECE_MAP = {
    'p': 'pawn',
    'r': 'rook',
    'n': 'knight',
    'b': 'bishop',
    'q': 'queen',
    'k': 'king'
}

export default {
    props: {
        pieceChar: {
            type: String,
            required: true,
            default: ''
        },
        col: {
            type: Number,
            required: true
        },
        row: {
            type: Number,
            required: true
        },
        isSelected: {
            type: Boolean,
            required: true,
            default: false
        },
        isLegalMove: {
            type: Boolean,
            required: false,
            default: false
        },
        isLastMove: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            piece: null,
            pieceColor: null,
            locationString: null,
            isWhiteSquare: false,
        }
    },
    created() {
        this.setPieceData();
        this.setLocationString();
        this.setSquareColor();
    },
    watch: {
        pieceChar() {
            this.setPieceData();
        },
        col() {
            this.setLocationString();
            this.setSquareColor();
        },
        row() {
            this.setLocationString();
            this.setSquareColor();
        }
    },
    methods: {
        setPieceData() {
            if (!this.pieceChar) {
                this.piece = null;
                this.pieceColor = null;
                return;
            }

            if (this.pieceChar.toUpperCase() === this.pieceChar) {
                this.pieceColor = 'white';
            } else {
                this.pieceColor = 'black';
            }

            this.piece = PIECE_MAP[this.pieceChar.toLowerCase()];
        },
        setLocationString() {
            this.locationString = String.fromCharCode(97 + this.col) + (8 - this.row);
        },
        setSquareColor() {
            this.isWhiteSquare = (this.col + this.row) % 2 === 0;
        },
        handleClick() {
            this.$emit('square-clicked', {
                pieceColor: this.pieceColor,
                piece: this.piece,
                location: this.locationString
            });
        }
    },
    emits: ['square-clicked']
}
</script>

<style scoped>
.chess-square {
    width: 12.5%;
    height: 100%;
    background-color: rgb(222, 219, 224);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}

.chess-square.black {
    background-color: #a777e3;
}

.chess-square.last-move.white {
    background-color: #efb2fc;
}
.chess-square.last-move.black {
    background-color: #db84ec;
}

.chess-square.legal-move.white {
    background-color: #88a1f1;
}
.chess-square.legal-move.black {
    background-color: #7190f3;
}


.chess-square.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 70%, rgba(0, 81, 255, 0.5) 70%);
    pointer-events: none;
}

[data-piece-color='white'][data-piece='pawn'] {
    background-image: url(/assets/images/pieces/white-pawn.png);
}

[data-piece-color='white'][data-piece='rook'] {
    background-image: url(/assets/images/pieces/white-rook.png);
}

[data-piece-color='white'][data-piece='knight'] {
    background-image: url(/assets/images/pieces/white-knight.png);
}

[data-piece-color='white'][data-piece='bishop'] {
    background-image: url(/assets/images/pieces/white-bishop.png);
}

[data-piece-color='white'][data-piece='queen'] {
    background-image: url(/assets/images/pieces/white-queen.png);
}

[data-piece-color='white'][data-piece='king'] {
    background-image: url(/assets/images/pieces/white-king.png);
}

[data-piece-color='black'][data-piece='pawn'] {
    background-image: url(/assets/images/pieces/black-pawn.png);
}

[data-piece-color='black'][data-piece='rook'] {
    background-image: url(/assets/images/pieces/black-rook.png);
}

[data-piece-color='black'][data-piece='knight'] {
    background-image: url(/assets/images/pieces/black-knight.png);
}

[data-piece-color='black'][data-piece='bishop'] {
    background-image: url(/assets/images/pieces/black-bishop.png);
}

[data-piece-color='black'][data-piece='queen'] {
    background-image: url(/assets/images/pieces/black-queen.png);
}

[data-piece-color='black'][data-piece='king'] {
    background-image: url(/assets/images/pieces/black-king.png);
}
</style>