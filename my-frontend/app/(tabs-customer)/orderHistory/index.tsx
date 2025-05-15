import {View, Text, FlatList, StyleSheet, useColorScheme} from 'react-native';
import {useState, useEffect} from 'react';
import {getOrdersByCustomer} from '@/services/orderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Orders } from '@/types/Orders';
import { Colors } from '@/constants/Colors';

export default function OrderHistory() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = await AsyncStorage.getItem('userId');
            const userIdParsed = JSON.parse(userId as string);
            try{
                const data = await getOrdersByCustomer(userIdParsed);
                setOrders(data);
            }
            catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    return(
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>🛒 Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.text }]}>
            <Text style={[styles.date, { color: colors.text }]}>
              📅 {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            {item.products.map((p: any, index: number) => (
              <View key={index} style={styles.productRow}>
                <Text style={[styles.productName, { color: colors.text }]}>🛍️ {p.product.name}</Text>
                <Text style={{ color: colors.text }}>Qty: {p.quantity}</Text>
                <Text style={{ color: colors.text }}>🏷️ Supplier: {p.product.supplier?.name || "N/A"}</Text>
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: colors.text, textAlign: 'center', marginTop: 50 }}>
            You haven’t placed any orders yet.
          </Text>
        }
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  orderCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  date: { fontWeight: '600', fontSize: 16, marginBottom: 12 },
  productRow: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  productName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
});