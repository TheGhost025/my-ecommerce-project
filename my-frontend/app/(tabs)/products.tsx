import React , {useEffect, useState} from "react";
import {SafeAreaView, View,ActivityIndicator , Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Product } from "../../types/Products";
import { getProducts } from "../../services/productService";
import ProductItem from "../../components/ProductItem";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const ProductListScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

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
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Products</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/product/add")}
          >
            <AntDesign name="pluscircleo" size={24} color="#0066cc" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
  
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/product/[id]", params: { id: item._id } })
              }
            >
              <ProductItem product={item} />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
};

export default ProductListScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    addText: {
      fontSize: 16,
      color: "#0066cc",
    },
  });