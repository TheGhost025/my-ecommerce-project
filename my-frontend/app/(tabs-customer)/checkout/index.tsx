import {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet, Alert, useColorScheme, TouchableOpacity, ActivityIndicator,} from 'react-native';
import {getCart} from '@/services/cartService';
import { createOrder } from '@/services/orderService';
import { CartData } from '@/types/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

export default function Checkout(){
    const [cart,setCart] = useState<CartData | null>(null)
    const [loading,setLoading] = useState(false);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await AsyncStorage.getItem("userId");
            const userIdParsed = JSON.parse(userId as string);
            const data = await getCart(userIdParsed);
            setCart(data);
        };
        fetchUserId();
    }, []);

    const getTotal = () => cart?.items.reduce((total, item) => total + item.product.price * item.quamtity, 0) || 0;

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem("userId");
            const userIdParsed = JSON.parse(userId as string);
            const orderData = { customer: userIdParsed };
            const order = await createOrder(orderData);
            Alert.alert("Success", `Order ${order._id} created successfully!`);
        } catch (error) {
            console.error("Error creating order:", error);
            Alert.alert("Error", "Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };
      
      return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>🛒 Your Checkout</Text>
      <FlatList
        data={cart?.items}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={[styles.name, { color: colors.text }]}>{item.product.name}</Text>
              <Text style={{ color: colors.text }}>Qty: {item.quamtity}</Text>
              <Text style={[styles.price, { color: colors.price }]}>
                ${item.product.price.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>🛍️ Your cart is empty.</Text>}
      />

      <View style={styles.footer}>
        <Text style={[styles.total, { color: colors.text }]}>Total: ${getTotal().toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: loading ? '#aaa' : colors.primary }]}
          onPress={handleCheckout}
          disabled={loading || cart?.items.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
      );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});