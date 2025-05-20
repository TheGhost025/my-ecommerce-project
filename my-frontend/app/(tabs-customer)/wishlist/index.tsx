import React, { useEffect, useState } from "react";
import { getWishlistByUser, removeFromWishlist } from "@/services/wishlistService";
import { WishlistItem } from "@/types/WishlistItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, FlatList, Image, StyleSheet, useColorScheme, ActivityIndicator, Alert, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types/WishlistItem";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
    const colorScheme = useColorScheme();
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light;


  const fetchWishlist = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId");
    const userIdParse = JSON.parse(userId as string);
    if (userId) {
      try {
        const data = await getWishlistByUser(userIdParse);
        setWishlist(data.products);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    }
    setLoading(false);
  };

const handleRemove = async (productId: string) => {
  const confirmRemove = () => {
    Alert.alert(
      "Remove from Wishlist",
      "Are you sure you want to remove this item from your wishlist?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => proceedRemove(productId),
        },
      ]
    );
  };

  if (Platform.OS === "web") {
    const confirmed = window.confirm("Are you sure you want to remove this item from your wishlist?");
    if (confirmed) {
      await proceedRemove(productId);
    }
  } else {
    confirmRemove();
  }
};

const proceedRemove = async (productId: string) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;
    const userIdParse = JSON.parse(userId);

    await removeFromWishlist({ userId: userIdParse, productId });
    setWishlist((prev) => prev.filter((item) => item._id !== productId));

    if (Platform.OS === "web") {
      alert("Item removed from wishlist.");
    } else {
      Alert.alert("Success", "Item removed from wishlist.");
    }
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    if (Platform.OS === "web") {
      alert("Failed to remove item.");
    } else {
      Alert.alert("Error", "Failed to remove item.");
    }
  }
};

  useEffect(() => {
    fetchWishlist();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={[styles.card , { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.info, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, {color: colors.text}]}>{item.name}</Text>
        <Text style={{color: colors.price}}>${item.price}</Text>
        <Button title="Remove" color="#e53935" onPress={() => handleRemove(item._id)} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading , {color : colors.primary}]}>Your Wishlist</Text>
      {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: { flexDirection: "row", marginBottom: 16, padding: 10, borderRadius: 8 },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold" },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
});
