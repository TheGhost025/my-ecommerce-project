import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text
} from 'react-native';
import { useRouter } from 'expo-router';
import { createProduct } from '@/services/productService';
import { Productt } from '@/types/Product';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const handleAddProduct = async () => {
    const product: Productt = {
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock),
      category,
      description,
    };

    try {
      await createProduct(product);
      Alert.alert('Success', 'Product Added!');
      router.push('/(tabs)/products');
    } catch (err) {
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />
      <TextInput style={styles.input} placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Add Product" onPress={handleAddProduct} color="#007AFF" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});