import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import PokemonCard from "../components/PokemonCard";
import CompareSection from "../components/CompareSection";
import { ListHeader, ListFooter } from "../components/ListHeaderFooter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(""); // 🔹 dodany stan wyszukiwania
  const flatListRef = useRef(null);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState(["All"]);

const filteredPokemons = pokemons.filter(p =>
  p.name.toLowerCase().includes(searchText.toLowerCase()) &&
  (selectedType === "All" || p.types.includes(selectedType.toLowerCase()))
);

const handleSelectForBattle = (pokemon) => {
  if (!first || first.id === pokemon.id) setFirst(pokemon);
  else if (!second || second.id === pokemon.id) setSecond(pokemon);
};
 useEffect(() => {
   fetchPokemons();
   fetchTypes();
 }, []);

 const fetchTypes = async () => {
   try {
     const res = await fetch("https://pokeapi.co/api/v2/type");
     const data = await res.json();
     const fetchedTypes = data.results
       .map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1))
       .filter(t => t !== "Unknown" && t !== "Shadow");
     setTypes(["All", ...fetchedTypes]);
   } catch (error) {
     console.error(error);
   }
 };

const fetchPokemons = async () => {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=151";
    const res = await fetch(url);
    const data = await res.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (p) => {
        const res2 = await fetch(p.url);
        const details = await res2.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default || 'https://via.placeholder.com/150',
          hp: details.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
          types: details.types.map((t) => t.type.name),
          moves: details.moves.slice(0, 2).map((m) => m.move.name),
          weakness: [],
        };
      })
    );

    setPokemons(detailedPokemons);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};



  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ListHeader />
      <SearchBar value={searchText}
                   onChange={setSearchText}
                   selectedType={selectedType}
                   onTypeChange={setSelectedType}
                   types={types}/>
      <CompareSection first={first} second={second} />
      <FlatList
        ref={flatListRef}
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>  <PokemonCard
                                      pokemon={item}
                                      onSelectForBattle={handleSelectForBattle}
                                      isSelected={first?.id === item.id || second?.id === item.id}
                                    />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={ListFooter}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <TouchableOpacity
        onPress={scrollToTop}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          backgroundColor: "#E53935",
          padding: 12,
          borderRadius: 24,
          elevation: 5,
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <MaterialCommunityIcons name="arrow-up" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
