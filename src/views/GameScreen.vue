<template>
    <section v-show="gameDetail !== null" id="game-header">
        <h2 v-if="opponent !== ''">Opponent: {{ opponent }}</h2>
        <h1>Chess game😲</h1>
    </section>
    <div v-show="gameDetail !== null" id="main-game-content">
        <chess-board
            :fen="chessBoardFen"
            @square-clicked="handleSquareClick"
            :legal-moves="legalMoves"
            :your-color="yourColor"
        />
        <captured-pieces :captured-pieces="capturedPieces" />
    </div>
    <p v-show="gameDetail !== null" id="current-player">Current player: {{ currentPlayer }}</p>
    
    <!-- popups -->
    <waiting-popup v-show="popups.showWaitingPopup" />
    <promotion-popup v-show="popups.showPromotionPopup" :player-color="yourColor" @promotion-piece-selected="makePromotion" @close-promotion-popup="cancelPromotion" />
    <result-popup v-show="popups.showResultPopup" :reason="reason" :winner="winner" />
</template>

<script>
import GameService from '../modules/Game/Services/GameService.js';
import ChessBoard from '../modules/Game/Components/ChessBoard.vue';
import CapturedPieces from '../modules/Game/Components/CapturedPieces.vue';
import WaitingPopup from '../modules/Game/Components/WaitingPopup.vue';
import PromotionPopup from '../modules/Game/Components/PromotionPopup.vue';
import ResultPopup from '../modules/Game/Components/ResultPopup.vue';

const shouldStopPolling = (detail, yourUsername) => {
    return (detail.state === "InProgress" && detail.currentPlayer === yourUsername)
        || detail.state === "Finished";
}

export default {
    components: {
        ChessBoard,
        CapturedPieces,
        WaitingPopup,
        PromotionPopup,
        ResultPopup
    },
    data() {
        return {
            service: new GameService(),
            gameId: this.$route.params.gameId,
            gameDetail: null,
            yourColor: localStorage.getItem('yourColor') || 'white',
            yourUsername: localStorage.getItem('userName'),
            lastClickedLocation: null,
            lastClickedPiece: null,
            clickedLocationForPromotion: null,
            legalMoves: [],
            popups: {
                showPromotionPopup: false,
                showResultPopup: false,
                showWaitingPopup: false
            }
        }
    },
    created() {
        this.getInitialGameDetail();
    },
    methods: {
        async getInitialGameDetail() {
            this.gameDetail = await this.service.getGameDetail(this.gameId);
            if (this.gameDetail.state === "Waiting") {
                this.popups = { ...this.popups, showWaitingPopup: true };
            }
            // creater needs to poll to check for the other player to join
            // and the joiner needs to poll because it is the creater's turn when the game starts
            this.startPolling();
        },
        async startPolling() {
            while (true) {
                const detail = await this.service.getGameDetail(this.gameId);
                if (shouldStopPolling(detail, this.yourUsername)) {
                    this.gameDetail = detail;

                    if (detail.state === "Finished") {
                        this.popups = { ...this.popups, showResultPopup: true };
                    }
                    this.popups = { ...this.popups, showWaitingPopup: false };
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
                // check for promotion first
                if (this.lastClickedPiece.toLowerCase() === "pawn" && (squareData.location[1] === '1' || squareData.location[1] === '8')) {
                    this.clickedLocationForPromotion = squareData.location;
                    this.popups = { ...this.popups, showPromotionPopup: true };
                    return;
                }

                await this.makeMove(moveToMake);
            } else {
                this.lastClickedLocation = null;
                this.lastClickedPiece = null;
                this.legalMoves = [];
            }
        },
        cancelPromotion() {
            this.clickedLocationForPromotion = null;
            this.popups = { ...this.popups, showPromotionPopup: false };
        },
        async makePromotion(piece) {
            const moveString = this.lastClickedLocation + this.clickedLocationForPromotion;
            this.gameDetail = await this.service.makeMove(this.gameId, moveString, piece);
            this.lastClickedLocation = null;
            this.lastClickedPiece = null;
            this.legalMoves = [];
            this.clickedLocationForPromotion = null;
            this.popups = { ...this.popups, showPromotionPopup: false };
            this.startPolling();
        },
        async showValidMoves(squareData) {
            this.legalMoves = await this.service.getValidMoves(this.gameId, squareData.location);
            this.lastClickedLocation = squareData.location;
            this.lastClickedPiece = squareData.piece;
        },
        async makeMove(moveString) {
            this.gameDetail = await this.service.makeMove(this.gameId, moveString);
            this.lastClickedLocation = null;
            this.lastClickedPiece = null;
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
        },
        winner() {
            return this.gameDetail?.result?.winner || "";
        },
        reason() {
            return this.gameDetail?.result?.reason || "";
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