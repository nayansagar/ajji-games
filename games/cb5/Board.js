import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares,
      participants_list: props.participants_list,
    };

    this.makeMoves = this.makeMoves.bind(this);
    this.getPath = this.getPath.bind(this);
    this.getNodeIndexFromPath = this.getNodeIndexFromPath.bind(this);
  }

  getPath(color) {
    var colorPath = {
      yellow: [
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: 0, y: 3 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
      ],

      red: [
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: 0, y: 3 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 2 },
      ],

      blue: [
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],

      green: [
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: 0, y: 3 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
    };

    return colorPath[color];
  }

  getNodeIndexFromPath(colorPath, xIndex, yIndex) {
    for (var i = 0; i < colorPath.length; i++) {
      if (colorPath[i].x == xIndex && colorPath[i].y == yIndex) {
        return i;
      }
    }
    return -1;
  }

  makeMoves(xIndex, yIndex, isSafe) {
    var color = this.props.color;
    this.state.squares = JSON.parse(JSON.stringify(this.props.squares));
    console.log(
      "In makeMoves, xIndex : " +
        xIndex +
        ", yIndex : " +
        yIndex +
        ", color : " +
        color
    );
    console.log("this.state.squares : " + JSON.stringify(this.state.squares));
    console.log(
      "this.state.squares[xIndex][yIndex][color] : " +
        this.state.squares[xIndex][yIndex][color]
    );
    console.log(
      "this.state.squares[xIndex][yIndex][color] : ",
      this.state.squares[xIndex][yIndex][color]
    );
    if (
      !this.state.squares[xIndex][yIndex][color] ||
      this.state.squares[xIndex][yIndex][color] <= 0
    ) {
      console.log(
        "Invalid source selected, no coins for this user in square : [" +
          xIndex +
          "," +
          yIndex +
          "], color : " +
          color
      );
      this.props.commentaryShow("You don't have a coin there!");
      return;
    }

    var colorPath = this.getPath(color);
    console.log("colorPath : " + JSON.stringify(colorPath));
    var startIndex = this.getNodeIndexFromPath(colorPath, xIndex, yIndex);
    var endIndex = startIndex + this.props.current["scoreToMove"];
    if (endIndex >= colorPath.length) {
      this.props.commentaryShow(
        "Can't move this coin by " +
          this.props.current["scoreToMove"] +
          ' places. If you can\'t move all scores, click "PASS" to let the next player play'
      );
      return;
    }
    var boardX = colorPath[endIndex].x;
    var boardY = colorPath[endIndex].y;
    var killed;
    var killable = false;
    var letsKill = false;
    ["red", "blue", "yellow", "green"].forEach((c) => {
      console.log(
        "Checking square [" +
          boardX +
          "," +
          boardY +
          "] for color : " +
          c +
          "; square : " +
          JSON.stringify(this.state.squares[boardX][boardY])
      );
      if (
        this.state.squares[boardX][boardY][c] > 0 &&
        c != color &&
        !this.state.squares[boardX][boardY]["isSafe"]
      ) {
        killable = true;
        letsKill = window.confirm(
          "Confirm! Kill " + c + " coin? You cannot UNDO this move."
        );
        if (letsKill == true) {
          this.state.squares[xIndex][yIndex][color] =
            this.state.squares[xIndex][yIndex][color] - 1;
          this.state.squares[boardX][boardY][color] =
            this.state.squares[boardX][boardY] &&
            this.state.squares[boardX][boardY][color]
              ? this.state.squares[boardX][boardY][color] + 1
              : 1;
          console.log(
            "Should be killing a coin : " +
              c +
              " found at : [" +
              boardX +
              "," +
              boardY +
              "], participants_list : " +
              JSON.stringify(this.props.participants_list)
          );
          var colorHome = this.props.participants_list.find(
            (p) => p.color == c
          ).home;
          this.state.squares[boardX][boardY][c] =
            this.state.squares[boardX][boardY][c] - 1;
          this.state.squares[colorHome.x][colorHome.y][c] =
            this.state.squares[colorHome.x][colorHome.y] &&
            this.state.squares[colorHome.x][colorHome.y][c]
              ? this.state.squares[colorHome.x][colorHome.y][c] + 1
              : 1;
          killed = { color: c, home: colorHome };
          this.props.addToHistory(
            { x: xIndex, y: yIndex },
            { x: boardX, y: boardY },
            this.props.current["scoreToMove"],
            killed
          );
          this.props.setPlayOnKill();
        } else {
          console.log("letsKill not confirmed");
          this.props.undoSelectToMove();
          return;
        }
      }
    });
    if (!killable) {
      console.log("Nothing is killed : " + killed);
      this.state.squares[xIndex][yIndex][color] =
        this.state.squares[xIndex][yIndex][color] - 1;
      this.state.squares[boardX][boardY][color] =
        this.state.squares[boardX][boardY] &&
        this.state.squares[boardX][boardY][color]
          ? this.state.squares[boardX][boardY][color] + 1
          : 1;
      this.props.addToHistory(
        { x: xIndex, y: yIndex },
        { x: boardX, y: boardY },
        this.props.current["scoreToMove"],
        killed
      );
    }

    if (endIndex == colorPath.length - 1) {
      this.props.commentaryShow(
        "GOOD JOB! The coin has reached it's destination!",
        true
      );
    }
    this.props.updateSquares(this.state.squares);
  }

  renderSquare(xIndex, yIndex, isSafe = false, color = "black") {
    if (this.props.squares && this.props.squares.length > 0) {
      return (
        <Square
          x={xIndex}
          y={yIndex}
          isSafe={isSafe}
          color={color}
          data={this.props.squares[xIndex][yIndex]}
          makeMoves={this.makeMoves}
        />
      );
    } else {
      return (
        <Square x={xIndex} y={yIndex} isSafe={isSafe} color={color} data="" />
      );
    }
  }

  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2, true, "blue")}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(2, 0, true, "green")}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2, true)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4, true, "red")}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2, true, "yellow")}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 5,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 2,
  },
  board: {
    flex: 18,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
