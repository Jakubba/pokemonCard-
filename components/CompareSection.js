import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const typeEffectiveness = {
  fire: ["grass"],
  water: ["fire", "rock"],
  grass: ["water", "rock"],
  electric: ["water"],
  ghost: [],
  psychic: [],
  rock: ["fire"],
  fighting: ["rock"],
};

export default function CompareSection({ first, second }) {
  const [winner, setWinner] = useState(null);

  const calculateWinner = () => {
    if (!first || !second) return;

    let score1 = first.hp;
    let score2 = second.hp;

    first.types.forEach(t => {
      if (second.types.some(st => typeEffectiveness[t]?.includes(st))) score1 += 20;
    });
    second.types.forEach(t => {
      if (first.types.some(ft => typeEffectiveness[t]?.includes(ft))) score2 += 20;
    });

    if (score1 > score2) setWinner(first.name);
    else if (score2 > score1) setWinner(second.name);
    else setWinner("Remis");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Compare Pokémon</Text>

      <Text style={{ marginBottom: 4 }}>
        First: {first ? first.name : "—"} | Second: {second ? second.name : "—"}
      </Text>

      <TouchableOpacity
        onPress={calculateWinner}
        style={{ marginTop: 8, backgroundColor: "#E53935", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Fight!</Text>
      </TouchableOpacity>

      {winner && (
        <Text style={{ marginTop: 8, fontSize: 16 }}>
          Winner: <Text style={{ fontWeight: "bold" }}>{winner}</Text>
        </Text>
      )}
    </View>
  );
}
