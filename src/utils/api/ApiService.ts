import GameService from './instances/game/service';
import PlayerService from './instances/player/service';

class ApiService {
  static game = GameService;
  static player = PlayerService;
}

export default ApiService;
