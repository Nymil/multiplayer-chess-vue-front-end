<template>
    <section id="game-header">
        <h2>Opponent: {{ opponent }}</h2>
        <h1>Chess game😲</h1>
    </section>
    <div id="main-game-content">
        <chess-board
            :fen="chessBoardFen"
            @square-clicked="handleSquareClick"
            :legal-moves="legalMoves"
            :your-color="yourColor"
        />
        <captured-pieces :captured-pieces="capturedPieces" />
    </div>
    <p id="current-player">Current player: {{ currentPlayer }}</p>
</template>

<script>
import GameService from '../modules/Game/Services/GameService.js';
import ChessBoard from '../modules/Game/Components/ChessBoard.vue';
import CapturedPieces from '../modules/Game/Components/CapturedPieces.vue';

const shouldStopPolling = (detail, yourUsername) => {
    return (detail.state === "InProgress" && detail.currentPlayer === yourUsername)
        || detail.state === "Finished";
}

export default {
    components: {
        ChessBoard,
        CapturedPieces
    },
    data() {
        return {
            service: new GameService(),
            gameId: this.$route.params.gameId,
            gameDetail: null,
            yourColor: localStorage.getItem('yourColor') || 'white',
            yourUsername: localStorage.getItem('userName'),
            lastClickedLocation: null,
            legalMoves: []
        }
    },
    created() {
        this.getInitialGameDetail();
    },
    methods: {
        async getInitialGameDetail() {
            this.gameDetail = await this.service.getGameDetail(this.gameId);
            // creater needs to poll to check for the other player to join
            // and the joiner needs to poll because it is the creater's turn when the game starts
            this.startPolling();
        },
        async startPolling() {
            while (true) {
                const detail = await this.service.getGameDetail(this.gameId);
                if (shouldStopPolling(detail, this.yourUsername)) {
                    this.gameDetail = detail;
                    break;
                }

                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        },
        async handleSquareClick(squareData) { // data is an object with keys location, pieceColor and piece
            if (this.gameDetail?.state !== "InProgress" || this.currentPlayer !== "You") return;

            if (squareData.pieceColor === this.yourColor) {
                await this.showValidMoves(squareData);
                return;
            }

            if (!this.lastClickedLocation) {
                return;
            }

            const moveToMake = this.lastClickedLocation + squareData.location;

            if (this.legalMoves.includes(moveToMake)) {
                await this.makeMove(moveToMake);
            } else {
                this.lastClickedLocation = null;
                this.legalMoves = [];
            }
        },
        async showValidMoves(squareData) {
            this.legalMoves = await this.service.getValidMoves(this.gameId, squareData.location);
            this.lastClickedLocation = squareData.location;
        },
        async makeMove(moveString) {
            this.gameDetail = await this.service.makeMove(this.gameId, moveString);
            this.lastClickedLocation = null;
            this.legalMoves = [];
            this.startPolling();
        }
    },
    computed: {
        opponent() {
            if (this.gameDetail === null) return "";

            if (this.gameDetail.players[0] !== this.yourUsername) {
                return this.gameDetail.players[0];
            } else if (this.gameDetail.players.length > 1 && this.gameDetail.players[1] !== this.yourUsername) {
                return this.gameDetail.players[1];
            }
            
            return "";
        },
        chessBoardFen() {
            return this.gameDetail?.board.split(" ")[0] || '8/8/8/8/8/8/8/8';
        },
        currentPlayer() {
            if (this.gameDetail === null) return "";

            if (this.gameDetail.currentPlayer === this.yourUsername) {
                return 'You';
            } else {
                return this.opponent;
            }
        },
        capturedPieces() {
            return this.gameDetail?.capturedPieces || { white: [], black: [] };
        }
    }
}
</script>

<style scoped>
#game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    position: relative;
}

#game-header h1 {
    font-weight: bold;
    font-size: 3.5rem;
    position: absolute;
    left: 50%;
    margin-top: 2rem;
    transform: translateX(-50%);
}

#game-header h2 {
    font-size: 1.5rem;
}

#main-game-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
}

#current-player {
    font-size: 2rem;
    text-align: center;
    margin: 2rem;
    width: 100vw;
}
</style>