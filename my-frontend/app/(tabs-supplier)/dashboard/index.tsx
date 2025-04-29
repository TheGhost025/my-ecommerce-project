import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getProductsBySupplier } from '@/services/productService';
import { Product } from '@/types/Products';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const supplierId = await AsyncStorage.getItem('userId');
      if (supplierId) {
        const data = await getProductsBySupplier(supplierId);
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productStock}>Stock: {item.stock}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supplier Dashboard</Text>
      <Button title="Add New Product" onPress={() => { /* navigate to add product page */ }} />
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
  productCard: { backgroundColor: '#f2f2f2', padding: 15, marginVertical: 10, borderRadius: 10 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productStock: { fontSize: 14, marginTop: 5 },
  productPrice: { fontSize: 14, marginTop: 5 },
});