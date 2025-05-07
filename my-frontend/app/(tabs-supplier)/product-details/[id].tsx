import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { getProductById } from "@/services/productService";
import { Product } from "@/types/Products";
import { Colors } from "@/constants/Colors";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const colorScheme = useColorScheme();
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const data = await getProductById(id as string);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    fetchProduct();}, [id]);

    if(!product) {
        return <Text>Loading...</Text>;
    }

    return(
        <View style={[styles.container,{ backgroundColor: colors.background}]}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={[styles.productName, {color: colors.text}]}>{product.name}</Text>
            <Text style={[styles.productPrice, {color: colors.price}]}>${product.price.toFixed(2)}</Text>
            <Text style={[styles.productDescription, {color: colors.text}]}>{product.description}</Text>
            <Text style={[styles.meta, {color: colors.text}]}>Category: {product.category}</Text>
            <Text style={[styles.meta, {color: colors.text}]}>Stock: {product.stock}</Text>
            <Text style={[styles.meta, {color: colors.text}]}>Supplier: {product.supplier.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    productImage: {width: '100%', height: 200, borderRadius: 10, marginBottom: 20},
    productName: {fontSize: 24, fontWeight: 'bold'},
    productPrice: {fontSize: 20, marginVertical: 10},
    productDescription: {fontSize: 16, marginTop: 10},
    meta: { fontSize: 14, marginTop: 5 },
});