import { View, Text, Image, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { getProductById } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { addToWishlist } from "@/services/wishlistService";
import { Product } from "@/types/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

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

      const handleAddToWishlist = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParse = JSON.parse(userId as string);
        await addToWishlist({
          userId: userIdParse,
        productId: product?._id ?? ''});
        console.log("Product added to wishlist");
    }

    if(!product) {
        return <Text>Loading...</Text>;
    }

    return(
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.scrollContent}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
            <Text style={[styles.productPrice, { color: colors.price }]}>${product.price.toFixed(2)}</Text>
            <Text style={[styles.productDescription, { color: colors.text }]}>{product.description}</Text>
            <View style={styles.metaContainer}>
                <Text style={[styles.meta, { color: colors.text }]}>Category: {product.category}</Text>
                <Text style={[styles.meta, { color: colors.text }]}>Stock: {product.stock}</Text>
                <Text style={[styles.meta, { color: colors.text }]}>Supplier: {product.supplier.name}</Text>
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.wishlistButton]} onPress={handleAddToWishlist}>
                <Text style={styles.buttonText}>Add to Wishlist</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: '600',
    },
    productDescription: {
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 10,
    },
    metaContainer: {
        marginTop: 15,
        width: '100%',
    },
    meta: {
        fontSize: 14,
        marginVertical: 2,
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    wishlistButton: {
        backgroundColor: '#FF6F61', // a warm color to differentiate
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});