import { View, Text, TextInput, Alert, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { updateProduct, getProductById } from '@/services/productService';
import { Product } from '@/types/Products';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    supplier: { _id: '', name: '' },
  });

  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const color = theme === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id as string);
        setProduct(res);
        setLoading(false);
      } catch (err) {
        Alert.alert('Error', 'Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (key: keyof Omit<Product, "_id" | "supplier">, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [key]: key === 'price' || key === 'stock' ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatePayload = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        supplier: product.supplier._id,
      };

      await updateProduct(id, updatePayload);
      Alert.alert('Success', 'Product updated');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  if (loading) return <Text style={[styles.loading, { color: color.text }]}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.background }]}>
      <Text style={[styles.title, { color: color.text }]}>Edit Product</Text>

      {Object.entries(product).map(([key, value]) => {
        if (key === 'supplier' || key === '_id') return null;
        return (
          <TextInput
            key={key}
            style={[styles.input, {
              borderColor: color.inputBorder,
              color: color.text,
            }]}
            placeholder={key}
            placeholderTextColor={color.inputPlaceholder}
            value={String(value)}
            onChangeText={(text) => handleChange(key as any, text)}
          />
        );
      })}

      <View style={styles.buttonGroup}>
        <Pressable onPress={handleUpdate} style={[styles.button, { backgroundColor: color.primary }]}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 30,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
