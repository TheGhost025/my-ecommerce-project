import { View, Text, TextInput, Button, StyleSheet, useColorScheme, Alert } from "react-native";
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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, {color: colors.primary}]}>Add New Product</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />
            <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />
            <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />
            <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={[styles.input,{ borderColor: colors.inputBorder, color: colors.text }]} />

            <Button title="Add Product" onPress={handleAddProduct} color={colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
    input: {
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 15,
        padding: 12,
        fontSize: 16,
      },
});