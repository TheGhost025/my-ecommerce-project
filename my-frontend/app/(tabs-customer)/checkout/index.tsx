import {useState, useEffect} from 'react';
import {Text, View, Button, FlatList, Image, StyleSheet, Alert} from 'react-native';
import {getCart} from '@/services/cartService';
import { createOrder } from '@/services/orderService';
import { CartData } from '@/types/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkout(){
    const [cart,setCart] = useState<CartData | null>(null)
    const [loading,setLoading] = useState(false);

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

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16 },
        item: { marginBottom: 12, padding: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
        name: { fontSize: 16, fontWeight: "bold" },
        footer: { marginTop: 20 },
        total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
      });
      
      return (
        <View style={styles.container}>
          <FlatList
            data={cart?.items}
            keyExtractor={(item) => item.product._id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.name}>{item.product.name}</Text>
                  <Text>Qty: {item.quamtity}</Text>
                  <Text>Price: ${item.product.price}</Text>
                </View>
              )}
            ListEmptyComponent={<Text>Your cart is empty.</Text>}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
            <Button
              title="Place Order"
              onPress={handleCheckout}
              disabled={loading || cart?.items.length === 0}
            />
          </View>
        </View>
      );
}