import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Product } from '../../../types/Products';
import { searchProducts } from '../../../services/productService'; // <-- new service
import ProductItem from '../../../components/ProductItem';
import { useRouter } from 'expo-router';

const ProductSearchScreen = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (search.length === 0) {
      setProducts([]); // empty search => clear results
      return;
    }

    const fetchSearchedProducts = async () => {
      setLoading(true);
      try {
        const data = await searchProducts(search); // call API
        setProducts(data);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSearchedProducts();
    }, 500); // delay typing (debounce 500ms)

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item._id } })}
            >
              <ProductItem product={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 10,
  },
});
