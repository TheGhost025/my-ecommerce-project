import React from 'react';
import { Image, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Product } from '../types/Products';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';


type Props = {
    product: Product;
};

const router = useRouter();

const ProductItem = ({product}: Props) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: product._id } })}
      style={styles.container}
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>View Details</Text>
          <Feather name="arrow-right" size={16} color="#0066cc" />
        </View>
      </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 10,
      backgroundColor: '#f0f0f0',
    },
    info: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'space-between',
    },
    name: {
      fontSize: 17,
      fontWeight: '600',
      color: '#333',
    },
    price: {
      fontSize: 16,
      fontWeight: '500',
      color: 'green',
      marginVertical: 4,
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    detailsText: {
      fontSize: 14,
      color: '#0066cc',
    },
  });

export default ProductItem;