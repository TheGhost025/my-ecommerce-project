import { useLocalSearchParams } from "expo-router";
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { getProductById } from "../../services/productService";
import { Product } from "../../types/Products";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id as string);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{product.category}</Text>
        <Text style={styles.label}>Stock</Text>
        <Text style={styles.value}>{product.stock}</Text>
      </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 12,
      marginBottom: 16,
    },
    name: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 6,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 12,
    },
    label: {
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginTop: 12,
      fontSize: 16,
    },
    value: {
      fontSize: 15,
      alignSelf: 'flex-start',
      color: '#555',
    },
    description: {
      fontSize: 15,
      textAlign: 'justify',
      color: '#444',
      marginBottom: 10,
    },
    notFound: {
      padding: 20,
      textAlign: 'center',
      color: 'red',
    },
  });