const BASE_URL = (await fetch('../../../config.json').then(res => res.json()))['base-url'];

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
            })
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

        const response = await fetch(`${BASE_URL}/games/${gameId}/join`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": yourName
            })
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error);
        }

        return json.gameId;
    }
}