import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, useColorScheme, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getProductsBySupplier, deleteProduct } from '@/services/productService';
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

    const confirmDelete = (productId: string) => {
    Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteProduct(productId);
          setProducts((prev) => prev.filter((p) => p._id !== productId));
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}
      onPress={() => router.push(`../(tabs-supplier)/product-details/${item._id}`)}
    >
{item.image && (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.stock, { color: colors.text }]}>Stock: {item.stock}</Text>
        <Text style={[styles.price, { color: colors.price }]}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.orders, { color: colors.text }]}>Ordered: {item.orderCount ?? 0} times</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push(`../(tabs-supplier)/edit-product/${item._id}`)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item._id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>My Products</Text>
      <TouchableOpacity
        onPress={() => router.push("../(tabs-supplier)/add-product")}
        style={[styles.addButton, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.addButtonText}>+ Add New Product</Text>
      </TouchableOpacity>
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
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    marginBottom: 16,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  image: { width: 90, height: 90 },
  infoContainer: { flex: 1, padding: 10, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  stock: { fontSize: 14 },
  price: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  orders: { fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#e74c3c',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});