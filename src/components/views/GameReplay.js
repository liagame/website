import React, { Component } from 'react';
import Moment from 'react-moment';
import Replay from '../elems/Replay';
import { seconds2time } from '../../utils/helpers/time';
import api from '../../utils/api';

class GameReplay extends Component {
  constructor(props){
		super(props);
    this.state = {
      matchId: "",
      replayUrl: "",
      date: "",
      player1: "",
      player2: "",
      result: "",
      duration: "",
      mapSeed: "",
      unitsRemain: "",
      loadingData: false,
      error: null
    };
  }

  componentDidMount = () => {
    if(this.props.location.state){
      this.setState(this.props.location.state);
    }
    this.loadGame(this.props.match.params.number)
  }

  loadGame = async (matchId) => {
    this.setState({loadingData: true});
    try {
      const respGame = await api.game.getGame(matchId);
      const matchData = respGame.match;
      this.setState({
        matchId: matchData.matchId,
        replayUrl: matchData.replayUrl,
        date: matchData.completed,
        player1: matchData.bots[0].user.username,
        player2: matchData.bots[1].user.username,
        result: (matchData.bots[0].isWinner ? 1 : 2),
        duration: matchData.duration,
        mapSeed: matchData.mapSeed,
        unitsRemain: Math.floor( (matchData.bots[0].unitsLeft + matchData.bots[1].unitsLeft) / 32 * 100 ) + "%",
        loadingData: false
      });
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  render(){
    const { player1, player2, date, duration, mapSeed, replayUrl } = this.state;

    return (
      <div>
        <div className="cont-game-title text-center">
          <div className="game-title">
            {player1 + " vs " + player2}
          </div>
          <div className="game-stats"><Moment format="DD/MM/YYYY HH:mm">{date}</Moment></div>
          <div className="game-stats">
            {"Duration: " + seconds2time(duration)}
          </div>
          <div className="game-stats">
            {"Map seed: " + mapSeed}
          </div>
        </div>
        <div key={this.state.matchId}>
          <Replay containerId="gameView" replayFileBase64="" number={0} replayUrl={replayUrl}/>
        </div>
      </div>
    )
  }
}

export default GameReplay;
