<template>
    <div id="chess-board">
        <div v-for="(row, rowIndex) in displayedGrid" :key="rowIndex" class="chess-row">
            <chess-square
                v-for="(squarePiece, colIndex) in row"
                :piece-char="squarePiece || ''"
                :col="colIndex"
                :row="getRowIndex(rowIndex)"
                :is-selected="false"
                :is-legal-move="false"
            />
        </div>
    </div>
</template>

<script>
import ChessSquare from './ChessSquare.vue';

export default {
    components: {
        ChessSquare,
    },
    props: {
        fen: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            grid: [], // 2D array in the form of (null | char)[8][8]
            yourColor: localStorage.getItem('yourColor') || 'white',
        }
    },
    watch: {
        fen: {
            immediate: true,
            handler(newFen) {
                this.grid = this.createGrid(newFen);
            }
        }
    },
    computed: {
        displayedGrid() {
            return this.yourColor === 'black' ? this.grid.slice().reverse() : this.grid;
        }
    },
    methods: {
        createGrid(fen) {
            const rows = fen.split("/");
            const grid = []

            for (const row of rows) {
                const gridRow = [];
                for (const char of row) {
                    if (isNaN(char)) {
                        gridRow.push(char);
                    } else {
                        for (let i = 0; i < parseInt(char); i++) {
                            gridRow.push(null);
                        }
                    }
                }
                grid.push(gridRow);
            }

            return grid;
        },
        getRowIndex(rowIndex) {
            return this.yourColor === 'black' ? 7 - rowIndex : rowIndex;
        }
    }
}
</script>

<style scoped>
#chess-board {
    display: flex;
    flex-direction: column;
    width: 70vh;
    height: 70vh;
}

.chess-row {
    display: flex;
    width: 100%;
    height: 12.5%;
}
</style>
