import React, { Component } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSourceSelected = this.onSourceSelected.bind(this);
  }

  onSourceSelected() {
    console.log("In onSourceSelected");
    this.props.makeMoves(this.props.x, this.props.y, this.props.isSafe);
  }

  render() {
    let img;
    if (this.props.isSafe) {
      img = (
        <Image
          style={styles.square_bg_image}
          source={{
            uri: "https://s3.amazonaws.com/chowkabara.com/assets/ghatta.png",
          }}
          resizeMode={"contain"}
        />
      );
    } else {
      img = (
        <Image
          style={styles.square_bg_image}
          source={{
            uri: "https://s3.amazonaws.com/chowkabara.com/assets/plain-white-background.jpg",
          }}
          resizeMode={"contain"}
        />
      );
    }
    return (
      <View style={{ borderColor: this.props.color, borderWidth: 2, flex: 1 }}>
        {img}
        <View style={styles.square_grid}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              {this.props.data && this.props.data.green > 0 ? (
                <TouchableOpacity
                  style={styles.circle_green}
                  onClick={this.onSourceSelected}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    {this.props.data.green}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {this.props.data && this.props.data.red > 0 ? (
                <TouchableOpacity
                  style={styles.circle_red}
                  onClick={this.onSourceSelected}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    {this.props.data.red}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              {this.props.data && this.props.data.blue > 0 ? (
                <TouchableOpacity
                  style={styles.circle_blue}
                  onClick={this.onSourceSelected}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    {this.props.data.blue}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {this.props.data && this.props.data.yellow > 0 ? (
                <TouchableOpacity
                  style={styles.circle_yellow}
                  onClick={this.onSourceSelected}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    {this.props.data.yellow}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  square_bg_image: {
    width: 95,
    height: 95,
    zIndex: 1,
  },
  square_grid: {
    width: 95,
    height: 95,
    zIndex: 1,
    position: "absolute",
    top: 5,
    left: 5,
  },
  circle_green: {
    backgroundColor: "green",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    color: "white",
    flex: 0.5,
    flexDirection: "row",
  },
  circle_red: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    color: "white",
    flex: 0.5,
    flexDirection: "row",
  },
  circle_blue: {
    backgroundColor: "blue",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    color: "white",
    flex: 0.5,
    flexDirection: "row",
  },
  circle_yellow: {
    backgroundColor: "yellow",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    color: "white",
    flex: 0.5,
    flexDirection: "row",
  },
  helpText: {
    fontFamily: "Cochin",
  },
});
