import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import CB5Game from "./games/cb5/CB5Game";

export default class App extends Component {
  state = {};

  render() {
    let page;
    if (this.state.gameId && this.state.gameId === "CREATE-cb5") {
      page = (
        <View style={{ flex: 1 }}>
          <CB5Game
            gameId={this.state.gameId}
            goHomeNoConfirm={this.goHomeNoConfirm}
            goHome={this.goHome}
            showHelp={this.showHelp}
          />
        </View>
      );
    } else if (this.state.gameId && this.state.gameId === "CREATE-hg") {
      page = (
        <View>
          <HGGame />
        </View>
      );
    } else {
      page = (
        <View>
          <Home createGame={this.createGame} showHelp={this.showHelp} />
        </View>
      );
    }
    return page;
  }

  createGame = (gameName) => {
    if (gameName === "cb5") {
      this.setState({ gameId: "CREATE-cb5" });
    } else if (gameName === "hg") {
      this.setState({ gameId: "CREATE-hg" });
    } else {
      //do nothing. should not happen
    }
  };

  /* componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let gid = params.get("gid");
    if (gid) {
      this.setState({ gameId: gid });
    }
  } */

  goHome() {
    const letsGo = window.confirm("Do you want to leave this game?");
    if (letsGo == true) {
      //this.props.sendWSMessage(false, true, this.state.toPlay && this.state.play);
      this.setState({ gameId: null });
      history.replaceState(
        "Aata",
        "ChowkaBara",
        window.location.href.split("?")[0]
      );
    }
  }

  showHelp() {
    window.alert(
      '\n1. If you see the "PLAY" button, it is your turn to play. Arrows (>>>) next to the name indicate the current turn\n\n2. If you want to quit the game mid-way, click on "Quit" to let others continue\n\n3. Use "Help" option when needed\n\n4. Click "Refresh" if you feel the game is stuck\n'
    );
  }

  goHomeNoConfirm = () => {
    this.setState({ gameId: null });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
