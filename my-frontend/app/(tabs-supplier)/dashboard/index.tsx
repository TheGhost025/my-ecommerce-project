import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { getProductsBySupplier } from '@/services/productService';
import { Product } from '@/types/Products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import { Colors } from '@/constants/Colors'; // Import your color constants

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light; // Use the appropriate colors based on the scheme

  useEffect(() => {
    const fetchProducts = async () => {
      const supplierId = await AsyncStorage.getItem('userId');
      if (supplierId) {
        const data = await getProductsBySupplier(JSON.parse(supplierId));
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: colors.card, shadowColor: colors.text }]}
      onPress={() => router.push(`../(tabs-supplier)/product-details/${item._id}`)}
    >
      <Text style={[styles.productName, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.productStock, { color: colors.text }]}>Stock: {item.stock}</Text>
      <Text style={[styles.productPrice, { color: colors.price }]}>Price: ${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Supplier Dashboard</Text>
      <View style={styles.addButtonContainer}>
        <Button
          title="Add New Product"
          onPress={() => router.push("../(tabs-supplier)/add-product")}
          color={colors.primary}
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  addButtonContainer: { marginBottom: 15 },
  productCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productName: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  productStock: { fontSize: 14, marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: '600' },
});