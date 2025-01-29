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
}