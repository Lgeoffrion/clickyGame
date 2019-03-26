import React, { Component } from "react";
import Card from "./components/Card/Card";
import Wrapper from "./components/Wrapper/Wrapper";
import Score from "./components/Scoreboard/Scoreboard";
import beach from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.beach to the cards json array
  state = {
    beach,
    clickedBeachIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  //shuffle the beach cards when clicked
  shuffleScoreCard = id => {
    let clickedBeachIds = this.state.clickedBeachIds;

    if(clickedBeachIds.includes(id)){
      this.setState({ clickedBeachIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedBeachIds.push(id)

      if(clickedBeachIds.length === 12){
        this.setState({score: 12, status: "You Won! Click to play again!", clickedBeachIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ beach, clickedBeachIds, score: clickedBeachIds.length, status: " " });

      for (let i = beach.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [beach[i], beach[j]] = [beach[j], beach[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dream Beach Memory Game</h1>
          <p className="App-intro">
            Try not to click the same image twice! Get all 12 to win!
          </p>
        </header>
        <Score total={this.state.score}
               goal={12}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.beach.map(beach => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={beach.id}
              key={beach.id}
              image={beach.image}
            />
          ))}
        </Wrapper>
    </div>
    );
  }
}

export default App;