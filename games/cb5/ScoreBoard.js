import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toPlay:
        this.props.current && this.props.current.toPlay == this.props.me.color
          ? true
          : false,
      current: this.props.current ? this.props.current : {},
      play:
        this.props.current &&
        this.props.current.latestScore &&
        (this.props.current.latestScore != "eight" ||
          this.props.current.latestScore != "four") &&
        !this.props.playOnKill
          ? false
          : true,
    };
    this.rollDice = this.rollDice.bind(this);
    this.selectToMove = this.selectToMove.bind(this);
    this.chatSend = this.chatSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onShare = this.onShare.bind(this);
    this.quit = this.quit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "nextProps : " +
        JSON.stringify(nextProps) +
        ", prevState : " +
        JSON.stringify(prevState)
    );
    console.log(
      "Object.keys(nextProps).length : " + Object.keys(nextProps).length
    );
    if (!nextProps || !nextProps["me"] || !nextProps["current"]) {
      return null;
    } else {
      return {
        toPlay:
          nextProps.current && nextProps.current.toPlay == nextProps.me.color
            ? true
            : false,
        current: nextProps.current ? nextProps.current : prevState.current,
        play:
          nextProps.current &&
          nextProps.current.latestScore &&
          nextProps.current.latestScore != "eight" &&
          nextProps.current.latestScore != "four" &&
          !nextProps.playOnKill
            ? false
            : true,
      };
    }
  }

  rollDice() {
    const dice = [
      "one",
      "two",
      "two",
      "three",
      "three",
      "four",
      "four",
      "eight",
    ];
    var roll = dice[Math.floor(Math.random() * dice.length)];
    this.state.current["latestScore"] = roll;
    this.state.current[roll] = this.state.current[roll]
      ? this.state.current[roll] + 1
      : 1;
    if (
      this.state.current["history"] &&
      this.state.current["history"].length > 0
    ) {
      var lastInHistory = this.state.current["history"].pop();
      if (lastInHistory.killed) {
        if (!lastInHistory.killed["afterKill"]) {
          lastInHistory.killed["afterKill"] = [];
        }
        lastInHistory.killed["afterKill"].push(roll);
      }
      this.state.current["history"].push(lastInHistory);
    }
    if (roll == "four" || roll == "eight") {
      this.state.play = true;
      this.props.commentaryShow(
        "You got " + roll + ", you get another chance!",
        true
      );
    } else {
      this.state.play = false;
      this.props.unsetPlayOnKill();
      if (
        this.props.squares[this.props.me.home.x][this.props.me.home.y][
          this.props.me.color
        ] == 4
      ) {
        this.props.commentaryShow(
          roll +
            '!\n\n To move a score:\n 1. click on the score (Eg., "' +
            roll +
            ": " +
            this.state.current[roll] +
            '")\n 2. select the coin to move on the board\n 3. When you have moved all scores, click "DONE"\n',
          true,
          5000
        );
      } else {
        this.props.commentaryShow(roll.toUpperCase() + "!", true, 1500);
      }
    }
    this.setState(this.state);
    this.props.updateCurrentState(this.state.current);
  }

  selectToMove(score) {
    this.state.current["scoreToMove"] = score;
    this.state.current.score =
      this.state.current.score > 0 ? this.state.current.score - 1 : 0;
    this.setState(this.state);
    this.props.updateCurrentState(this.state.current);
  }

  handleChange(event) {
    console.log("In handleChange : " + event);
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  chatSend(event) {
    event.preventDefault();
    console.log("In chatSend : " + this.state.chatMsg);
    this.props.sendChatMessage(this.state.chatMsg);
    this.state.chatMsg = "";
    this.setState(this.state);
  }

  onShare() {
    var gameUrl =
      window.location.href.split("?")[0] + "?gid=" + this.props.gameId;
    console.log("sharing URL : " + gameUrl);
    if (navigator.share) {
      navigator
        .share({
          title: "",
          text: "Hey! how about a game of ChowkaBara? :)",
          url: gameUrl,
        })
        .then(() => {
          console.log("Share successful!");
        })
        .catch((error) => {
          console.log("Share failed!");
        });
    } else {
      if (navigator.clipboard) {
        console.log("Sharing not supported, URL copied to clipboard");
        navigator.clipboard.writeText(gameUrl);
        window.alert(
          "Link copied - share with your friends to invite them to play"
        );
      } else {
        console.log(
          "navigator.clipboard not supported, URL be shared manually"
        );
        window.alert(
          "Can't open share dialog. Please share the current browser URL manually."
        );
      }
    }
  }

  quit() {
    this.props.leaveGame(this.state.toPlay && this.state.play);
  }

  getPcptString(participant) {
    var displayName = participant.name;
    if (participant.me) {
      displayName = displayName + " (you)";
    }

    var currentTemp = this.props.current;

    var yourTurn = "\u27A4\u27A4\u27A4";
    var starUnicode = "\uD83C\uDF1F \uD83C\uDF1F";
    let starColor = null;
    if (
      currentTemp.leader_board &&
      currentTemp.leader_board[participant.color] == 1
    ) {
      starColor = "#ffd700";
      starUnicode = "GOLD \uD83C\uDF1F";
    }

    if (
      currentTemp.leader_board &&
      currentTemp.leader_board[participant.color] == 2
    ) {
      starColor = "#C0C0C0";
      starUnicode = "SILVER \uD83C\uDF1F";
    }

    if (
      currentTemp.leader_board &&
      currentTemp.leader_board[participant.color] == 3
    ) {
      starColor = "#CD7F32";
      starUnicode = "BRONZE \uD83C\uDF1F";
    }

    var toReturn = displayName;

    if (participant.color == currentTemp.toPlay) {
      toReturn = toReturn + " " + yourTurn;
    }

    if (starColor) {
      toReturn = toReturn + " " + starUnicode;
    }

    return toReturn;
  }

  render() {
    console.log(
      "ScoreBoard.render :: state : " +
        JSON.stringify(this.state) +
        ", props : " +
        JSON.stringify(this.props)
    );
    var pcptList;
    var currentTemp = this.props.current;
    if (this.props && this.props.participants_list) {
      pcptList = this.props.participants_list.map(function (
        participant,
        index
      ) {
        var displayName = participant.name;
        if (participant.me) {
          displayName = displayName + " (you)";
        }
        var yourTurn = "\u27A4\u27A4\u27A4";
        var starUnicode = "\uD83C\uDF1F \uD83C\uDF1F";
        let starColor = null;
        if (
          currentTemp.leader_board &&
          currentTemp.leader_board[participant.color] == 1
        ) {
          starColor = "#ffd700";
          starUnicode = "GOLD \uD83C\uDF1F";
        }

        if (
          currentTemp.leader_board &&
          currentTemp.leader_board[participant.color] == 2
        ) {
          starColor = "#C0C0C0";
          starUnicode = "SILVER \uD83C\uDF1F";
        }

        if (
          currentTemp.leader_board &&
          currentTemp.leader_board[participant.color] == 3
        ) {
          starColor = "#CD7F32";
          starUnicode = "BRONZE \uD83C\uDF1F";
        }
        var textColor = participant.color == "yellow" ? "black" : "white";
        return (
          <tr style={{ height: "2%", border: "none" }} key={index}>
            <td
              style={{
                height: "2%",
                background: participant.color,
                border: "none",
                color: textColor,
              }}
            >
              <div style={{ fontSize: "20px" }}>
                <b>{displayName}</b>
              </div>
            </td>
            <td
              style={{
                height: "2%",
                background: participant.color,
                border: "none",
                color: textColor,
              }}
            >
              <div>
                {participant.color == currentTemp.toPlay ? (
                  <b
                    style={{
                      fontSize: "20px",
                      textAlign: "right",
                      alignSelf: "stretch",
                    }}
                  >
                    {yourTurn}
                  </b>
                ) : null}
              </div>
              <div>
                {starColor ? (
                  <b
                    style={{
                      color: starColor,
                      fontSize: "20px",
                      textAlign: "right",
                      alignSelf: "stretch",
                    }}
                  >
                    {starUnicode}
                  </b>
                ) : null}
              </div>
            </td>
          </tr>
        );
      });
      if (pcptList.length >= 3) {
        var tempPcpt = pcptList[1];
        pcptList[1] = pcptList[2];
        pcptList[2] = tempPcpt;
      }
    } else {
      pcptList = null;
    }

    var finalAction;
    if (
      (!this.state.current["one"] || this.state.current["one"] == 0) &&
      (!this.state.current["two"] || this.state.current["two"] == 0) &&
      (!this.state.current["three"] || this.state.current["three"] == 0) &&
      (!this.state.current["four"] || this.state.current["four"] == 0) &&
      (!this.state.current["eight"] || this.state.current["eight"] == 0) &&
      !this.state.playOnKill
    ) {
      finalAction = "DONE";
    } else {
      finalAction = "PASS";
    }

    return (
      <View style={styles.scoreBoard}>
        <View style={styles.menuStrip}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={this.onShare}
              title="Invite"
            >
              <Text style={styles.menuButtonTitle}>Invite</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={this.quit}
              title="Quit"
            >
              <Text style={styles.menuButtonTitle}>Quit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={this.props.refresh}
              title="Refresh"
            >
              <Text style={styles.menuButtonTitle}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={this.props.help}
              title="Help"
            >
              <Text style={styles.menuButtonTitle}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.scoreCardStrip}>
          <View style={styles.participantList}>
            {this.props && this.props.participants_list
              ? this.props.participants_list.map((pcpt) => (
                  <Text style={{ backgroundColor: pcpt.color }}>
                    {this.getPcptString(pcpt)}
                  </Text>
                ))
              : null}
          </View>
          <View style={styles.centerView}>
            <View>
              {this.props.participants_list &&
              this.props.participants_list.length < 2 ? (
                <Text>Click "Invite" to play the game with your friends</Text>
              ) : this.state.toPlay && this.state.play ? (
                <TouchableOpacity
                  style={{ backgroundColor: this.props.me.color }}
                  onPress={this.rollDice}
                  title="Play"
                >
                  <Text style={styles.menuButtonTitle}>PLAY</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View>
              {this.state.toPlay && !this.state.play ? (
                <TouchableOpacity
                  style={{ backgroundColor: "grey" }}
                  onPress={this.props.undoLastMove(0)}
                  title="Undo"
                >
                  <Text style={styles.menuButtonTitle}>UNDO</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View>
              {this.state.toPlay && !this.state.play ? (
                <TouchableOpacity
                  style={{ backgroundColor: "grey" }}
                  onPress={this.props.finishTurn}
                  title="Done"
                >
                  <Text style={styles.menuButtonTitle}>{finalAction}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.scoresView}>
            <View style={{ flexDirection: "row" }}>
              <View>
                {this.state.current && this.state.current.eight > 0 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: "grey" }}
                    onPress={this.selectToMove(8)}
                    disabled={!this.state.toPlay}
                    title="Done"
                  >
                    <Text style={styles.menuButtonTitle}>
                      Eight: {this.state.current.eight}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View>
                {this.state.current && this.state.current.four > 0 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: "grey" }}
                    onPress={this.selectToMove(4)}
                    disabled={!this.state.toPlay}
                    title="Done"
                  >
                    <Text style={styles.menuButtonTitle}>
                      Four: {this.state.current.four}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                {this.state.current && this.state.current.three > 0 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: "grey" }}
                    onPress={this.selectToMove(3)}
                    disabled={!this.state.toPlay}
                    title="Done"
                  >
                    <Text style={styles.menuButtonTitle}>
                      Three: {this.state.current.three}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View>
                {this.state.current && this.state.current.two > 0 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: "grey" }}
                    onPress={this.selectToMove(2)}
                    disabled={!this.state.toPlay}
                    title="Done"
                  >
                    <Text style={styles.menuButtonTitle}>
                      Two: {this.state.current.two}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                {this.state.current && this.state.current.one > 0 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: "grey" }}
                    onPress={this.selectToMove(1)}
                    disabled={!this.state.toPlay}
                    title="Done"
                  >
                    <Text style={styles.menuButtonTitle}>
                      One: {this.state.current.one}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreBoard: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  menuStrip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    backgroundColor: "slateblue",
    width: 125,
    alignItems: "center",
  },
  menuButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  scoreCardStrip: {
    width: 500,
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  participantList: {
    flex: 3,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  centerView: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scoresView: {
    flex: 3,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
