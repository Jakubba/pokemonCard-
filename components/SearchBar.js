import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

const typeColors = {
  Fire: "#FF7043",
  Water: "#42A5F5",
  Grass: "#66BB6A",
  Electric: "#FFD54F",
  Ghost: "#7E57C2",
  Psychic: "#EC407A",
  Rock: "#8D6E63",
  Fighting: "#D32F2F",
  Normal: "#A1887F",
  Ice: "#81D4FA",
  Dragon: "#5C6BC0",
  Dark: "#424242",
  Steel: "#90A4AE",
  Fairy: "#F48FB1",
  Poison: "#AB47BC",
  Bug: "#9CCC65",
  Ground: "#A1887F",
  Flying: "#29B6F6",
};

export default function SearchBar({ value, onChange, onSearch, selectedType, onTypeChange, types }) {
  const [text, setText] = React.useState(value);

  const handleGo = () => {
    onChange(text);
    if (onSearch) onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Search Pokémon..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleGo} style={styles.button}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
      </View>

      {/* przyciski typów */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesContainer}>
        {types.map((type) => {
          const selected = selectedType === type;
          const bgColor = typeColors[type] || "#ccc";
          return (
            <TouchableOpacity
              key={type}
              onPress={() => onTypeChange(type)}
              style={[
                styles.typeButton,
                { backgroundColor: selected ? "#E53935" : bgColor },
              ]}
            >
              <Text style={[styles.typeText, selected && styles.typeTextSelected]}>{type}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#E53935",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  typesContainer: { marginTop: 8, flexDirection: "row", gap: 8 },
  typeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  typeButtonSelected: { backgroundColor: "#E53935", borderColor: "#E53935" },
  typeText: { textTransform: "capitalize", color: "#000" },
  typeTextSelected: { color: "#fff", fontWeight: "bold" },
});
