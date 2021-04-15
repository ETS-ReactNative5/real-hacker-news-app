import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainNewsScreen from "./app/screens/MainNewsScreen";
import StoriesContainer from "./app/containers/StoriesContainer";

export default function App() {

  return (
    <View style={styles.container}>
      <View>
        <Text>Bringing you the finest news!</Text>
        <MainNewsScreen />
        <StoriesContainer />
        <Text>Hacker news v.0.0.12</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});