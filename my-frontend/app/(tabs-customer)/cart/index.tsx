import {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import {getCart, removeFromCart, updateCartQuantity} from '@/services/cartService';
import {CartData} from '@/types/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Cart() {
    const [cart, setCart] = useState<CartData | null>(null);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        console.log("useEffect triggered");
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParse = JSON.parse(userId as string);
        const data = await getCart(userIdParse);
        console.log('Cart data:', data);
        setCart(data);
    };

    const handleRemove = async (productId: string) => {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParse = JSON.parse(userId as string);
        await removeFromCart(userIdParse, productId);
        fetchCart(); // Refresh the cart after removing an item
    }

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
      if (newQuantity <= 0) return; // optionally call handleRemove()

      const userId = await AsyncStorage.getItem('userId');
      const userIdParsed = JSON.parse(userId as string);
      await updateCartQuantity(userIdParsed, productId, newQuantity);
      fetchCart(); // refresh cart
    };


    const calculateTotal = () => {
      return cart?.items.reduce((total, item) => total + item.product.price * item.quamtity, 0) ?? 0;
  };

    return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cart?.items ?? []}
        keyExtractor={(item) => item.product._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={[styles.name, { color: colors.text }]}>{item.product.name}</Text>
              <Text style={[styles.price, { color: colors.price }]}>
                {item.quamtity} × ${item.product.price.toFixed(2)}
              </Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.product._id, item.quamtity - 1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={[styles.quantityText, { color: colors.text }]}>{item.quamtity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.product._id, item.quamtity + 1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => handleRemove(item.product._id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={[styles.totalText, { color: colors.text }]}>Total: ${calculateTotal().toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('../(tabs-customer)/checkout')}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
  },
});