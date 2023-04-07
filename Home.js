import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

const Icons = [
  {
    name: "ChowkaBara 5x5",
    uri: "https://s3.amazonaws.com/chowkabara.com/assets/5x5Board.png",
    id: "cb5",
  },
  {
    name: "Huli Ghatta",
    uri: "https://s3.amazonaws.com/chowkabara.com/assets/hg.png",
    id: "hg",
  },
];

export default class Home extends Component {
  state = { data: Icons };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.flatList}
        data={this.state.data}
        numColumns={1}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => this.props.createGame(item.id)}
            >
              <View style={styles.inner}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  resizeMode={"contain"}
                />
                <Text style={styles.textFont}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      ></FlatList>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 100,
    marginRight: 50,
    marginLeft: 50,
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  column: {
    margin: 20,
  },
  inner: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
    alignContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
  },
  textFont: {
    fontSize: 20,
  },
});
