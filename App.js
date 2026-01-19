// App.js
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import PokedexScreen from "./screens/PokedexScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <PokedexScreen />
    </SafeAreaView>
  );
}
