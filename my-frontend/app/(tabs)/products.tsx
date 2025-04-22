import React , {useEffect, useState} from "react";
import {SafeAreaView, View,ActivityIndicator , Text, FlatList } from "react-native";
import { Product } from "../../types/Products";
import { getProducts } from "../../services/productService";
import ProductItem from "../../components/ProductItem";

const ProductListScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProductItem product={item} />}
            />
        </SafeAreaView>
    );
};

export default ProductListScreen;