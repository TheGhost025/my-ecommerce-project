import { View, Text, Image, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { getProductById } from "@/services/productService";
import { Product } from "@/types/Products";
import { Colors } from "@/constants/Colors";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);   
    const colorScheme = useColorScheme();
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

useEffect(() => {
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id as string);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
        finally {
            setLoading(false);
        }
    };
    fetchProduct();}, [id]);

    if(!product) {
        return( 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>);
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
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
});