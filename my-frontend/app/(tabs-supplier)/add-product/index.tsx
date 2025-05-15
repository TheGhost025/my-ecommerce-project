import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { createProduct } from "@/services/productService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import { Colors } from "@/constants/Colors"; // Import your color constants

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light; // Use the appropriate colors based on the scheme

    const handleAddProduct = async () => {
        const supplierId = await AsyncStorage.getItem('userId');
        var supplierIdParsed = JSON.parse(supplierId as string);
        try {
            const productData = {
                name,
                price: parseFloat(price),
                description,
                image,
                stock: parseInt(stock),
                category,
                supplier: supplierIdParsed || '',
            };
            await createProduct(productData);
            Alert.alert("Product added successfully!");
            router.replace("/(tabs-supplier)/dashboard");
        } catch (error) {
            console.error("Error adding product:", error);
            Alert.alert("Failed to add product. Please try again.");
        }
    }

    return(
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>🛒 Add New Product</Text>

      <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.inputPlaceholder}
          value={name}
          onChangeText={setName}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />
        <TextInput
          placeholder="Price"
          placeholderTextColor={colors.inputPlaceholder}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor={colors.inputPlaceholder}
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />
        <TextInput
          placeholder="Image URL"
          placeholderTextColor={colors.inputPlaceholder}
          value={image}
          onChangeText={setImage}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />
        <TextInput
          placeholder="Stock"
          placeholderTextColor={colors.inputPlaceholder}
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />
        <TextInput
          placeholder="Category"
          placeholderTextColor={colors.inputPlaceholder}
          value={category}
          onChangeText={setCategory}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleAddProduct}
        >
          <Text style={styles.buttonText}>➕ Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});