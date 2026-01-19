import React from "react";
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const getTypeDetails = (type, isSelected) => {
  const colors = {
    electric: { borderColor: "#FFD700", backgroundColor: "#FFF9DB" },
    water: { borderColor: "#3399FF", backgroundColor: "#E6F2FF" },
    fire: { borderColor: "#FF4500", backgroundColor: "#FFE6E0" },
    grass: { borderColor: "#32CD32", backgroundColor: "#E8F8E8" },
    ghost: { borderColor: "#6A0DAD", backgroundColor: "#F1E6FA" },
  };
  const defaultColor = { borderColor: "#ccc", backgroundColor: "#fff" };

  const style = colors[type] || defaultColor;

  if (isSelected) style.backgroundColor = "#FFEB3B";

  return style;
};

export default function PokemonCard({ pokemon, onSelectForBattle, isSelected }) {
  const type = pokemon.types[0];
  const style = getTypeDetails(type, isSelected);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.hpContainer}>
          <FontAwesome5 name="heart" size={16} color="red" />
          <Text style={styles.hp}>{pokemon.hp}</Text>
        </View>
      </View>

      <Image source={{ uri: pokemon.image }} style={styles.image} />

      <View style={styles.typeContainer}>
        <Text style={styles.type}>{type}</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="sword" size={16} />
        <Text style={styles.text}>{pokemon.moves.join(", ")}</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="skull-crossbones" size={16} color="#c00" />
        <Text style={styles.weakness}>{pokemon.weakness.length > 0 ? pokemon.weakness.join(", ") : "—"}</Text>
      </View>

      {/* 🔹 Przycisk WALCZ */}
      <TouchableOpacity
        onPress={() => onSelectForBattle(pokemon)}
        style={styles.battleButton}
      >
        <Text style={styles.battleButtonText}>WALCZ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 3, padding: 16, marginHorizontal: 16, backgroundColor: "#fff", ...Platform.select({ android: { elevation: 4 }, ios: { shadowColor: "#333", shadowOpacity: 0.3, shadowRadius: 4 } }) },
  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 20, fontWeight: "bold", textTransform: "capitalize" },
  hpContainer: { flexDirection: "row", gap: 6 },
  hp: { fontWeight: "600" },
  image: { width: 160, height: 160, alignSelf: "center", resizeMode: "contain", marginVertical: 8 },
  typeContainer: { alignSelf: "center", borderWidth: 2, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8 },
  type: { textTransform: "capitalize", fontWeight: "600" },
  row: { flexDirection: "row", gap: 6, marginBottom: 4 },
  text: { color: "#555" },
  weakness: { color: "#c00" },
  battleButton: {
    marginTop: 8,
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  battleButtonText: { color: "#fff", fontWeight: "bold" },
});
