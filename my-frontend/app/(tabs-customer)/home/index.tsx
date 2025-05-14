import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import {useState, useEffect} from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/Products';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light; // Use the appropriate colors based on the scheme
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: colors.card, shadowColor: colors.text }]}
      onPress={() => router.push(`../(tabs-customer)/product-details/${item._id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.productPrice, { color: colors.price }]}>
        ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
    );

    return(
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Welcome, Customer!</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>

    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  row: { justifyContent: 'space-between' },
  productCard: {
    width: '48%',
    padding: 12,
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: { width: '100%', height: 130, borderRadius: 12, marginBottom: 8 },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { fontSize: 14, fontWeight: '500', marginTop: 4 },
});