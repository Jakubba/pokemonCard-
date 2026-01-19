import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ListHeader = () => (
  <View style={styles.header}>
    <MaterialCommunityIcons name="pokeball" size={40} color="#fff" />
    <Text style={styles.title}>Pokédex</Text>
    <Text style={styles.subtitle}>Dynamic API Version</Text>
  </View>
);

export const ListFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>End of Pokédex</Text>
  </View>
);

const styles = StyleSheet.create({
  header: { backgroundColor: "#E53935", padding: 24, alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 12 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 8 },
  subtitle: { color: "#FFDADA" },
  footer: { alignItems: "center", padding: 24 },
  footerText: { color: "#666" },
});
