const BASE_URL = "https://chess-api.matticeheyzak.software/api";

export default class GameService {
    async getJoinableGames() {
        try {
            const response = await fetch(`${BASE_URL}/games`);
            const json = await response.json();
            return json.filter(game => game.state === 'Waiting');
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async createGame(yourName) {
        yourName = yourName.trim();

        if (yourName === '') {
            throw new Error('Name must not be empty');
        }

        const response = await fetch(`${BASE_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": yourName
            }),
            credentials: 'include'
        });

        const json = await response.json();
        
        if (!response.ok) {
            throw new Error(json.error);
        }

        return json.gameId;
    }

    async joinGame(yourName, gameId) {
        yourName = yourName.trim();

        if (yourName === '') {
            throw new Error('Name must not be empty');
        }

        if (yourName === 'You') {
            throw new Error('Name must not be "You"');
        }

        const response = await fetch(`${BASE_URL}/games/${gameId}/join`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": yourName
            }),
            credentials: 'include'
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error);
        }

        return json.gameId;
    }

    async getGameDetail(gameId) {
        try {
            const response = await fetch(`${BASE_URL}/games/${gameId}`, {
                credentials: 'include'
            });
            const json = await response.json();
            return json;
        } catch (e) {
            return null;
        }
    }

    async getValidMoves(gameId, locationString) {
        try {
            const response = await fetch(`${BASE_URL}/games/${gameId}/valid-moves?position=${locationString}`, {
                credentials: 'include'
            });
            const json = await response.json();
            
            if (!response.ok) {
                throw new Error(json.error);
            }

            return json.validMoves;
        } catch(e) {
            return [];
        }
    }

    async makeMove(gameId, moveString, promotionPiece = null) {
        try {
            const response = await fetch(`${BASE_URL}/games/${gameId}/move?promotionPiece=${promotionPiece}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "move": moveString
                }),
                credentials: 'include'
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            return json;
        } catch (e) {
            return {};
        }
    }
}