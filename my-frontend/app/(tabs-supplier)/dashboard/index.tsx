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
    <TouchableOpacity style={[styles.productCard , {backgroundColor: colors.card}]} onPress={() => router.push(`../(tabs-supplier)/product-details/${item._id}`)}>
      <Text style={[styles.productName, {color: colors.text}]}>{item.name}</Text>
      <Text style={[styles.productStock, {color: colors.text}]}>Stock: {item.stock}</Text>
      <Text style={[styles.productPrice, {color: colors.price}]}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, {color: colors.primary}]}>Supplier Dashboard</Text>
      <Button title="Add New Product" onPress={() => { router.push("../(tabs-supplier)/add-product") }} color={colors.primary} />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: { padding: 15, marginVertical: 10, borderRadius: 10 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productStock: { fontSize: 14, marginTop: 5 },
  productPrice: { fontSize: 14, marginTop: 5 },
});