import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { createProduct } from "@/services/productService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';


export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");

    const styles = StyleSheet.create({
        container: {flex: 1, padding: 20},
        title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
        input: {borderBottomWidth: 1, marginBottom: 20, padding: 10, fontSize: 16},
    });

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
            alert("Product added successfully!");
            router.replace("/(tabs-supplier)/dashboard");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add New Product</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={styles.input} />
            <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />

            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
}