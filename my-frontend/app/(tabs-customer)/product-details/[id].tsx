import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { getProductById } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { Product } from "@/types/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);

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

    const styles = StyleSheet.create({
        container: {flex: 1, padding: 20},
        productImage: {width: '100%', height: 200, borderRadius: 10, marginBottom: 20},
        productName: {fontSize: 24, fontWeight: 'bold'},
        productPrice: {fontSize: 20, color: 'green', marginVertical: 10},
        productDescription: {fontSize: 16, marginTop: 10},
        meta: { fontSize: 14, color: '#666', marginTop: 5 },
    });

    const handleAddToCart = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParse = JSON.parse(userId as string);
        try {
          if (!userIdParse || !product) return;
          await addToCart(userIdParse, product._id, 1);
        } catch (error) {
          console.error("Add to cart failed", error);
        }
      };

    if(!product) {
        return <Text>Loading...</Text>;
    }

    return(
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.meta}>Category: {product.category}</Text>
            <Text style={styles.meta}>Stock: {product.stock}</Text>
            <Text style={styles.meta}>Supplier ID: {product.supplier.name}</Text>

            <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
    );
}