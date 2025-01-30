<template>
    <section id="game-header">
        <h2>Opponent: {{ opponent }}</h2>
        <h1>Chess game😲</h1>
    </section>
    <div id="main-game-content">
        <chess-board :fen="chessBoardFen" />
    </div>
    <p id="current-player">Current player: {{ currentPlayer }}</p>
</template>

<script>
import GameService from '../modules/Game/Services/GameService.js';
import ChessBoard from '../modules/Game/Components/ChessBoard.vue';

export default {
    components: {
        ChessBoard,
    },
    data() {
        return {
            service: new GameService(),
            gameId: this.$route.params.gameId,
            gameDetail: null,
            yourUsername: localStorage.getItem('userName'),
            opponent: '',
            currentPlayer: 'You',
            chessBoardFen: '8/8/8/8/8/8/8/8',
        }
    },
    created() {
        this.getGameDetail();
    },
    methods: {
        async getGameDetail() {
            this.gameDetail = await this.service.getGameDetail(this.gameId);
        },
        setOpponent() {
            if (this.opponent !== "") return; // opponent name never changes

            if (this.gameDetail.players[0] !== this.yourUsername) {
                this.opponent = this.gameDetail.players[0];
            } else if (this.gameDetail.players.length > 1 && this.gameDetail.players[1] !== this.yourUsername) {
                this.opponent = this.gameDetail.players[1];
            }
        },
        setCurrentPlayer() {
            if (this.gameDetail.currentPlayer === this.yourUsername) {
                this.currentPlayer = 'You';
            } else {
                this.currentPlayer = this.opponent;
            }
        },
        setChessBoardFen() {
            this.chessBoardFen = this.gameDetail?.board.split(" ")[0] || '8/8/8/8/8/8/8/8';
        }
    },
    watch: {
        gameDetail: function() {
            this.setOpponent();
            this.setChessBoardFen();
            this.setCurrentPlayer();
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
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem;
    width: 100vw;
}
</style>