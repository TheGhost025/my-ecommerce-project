import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {getOrdersByCustomer} from '@/services/orderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Orders } from '@/types/Orders';

export default function OrderHistory() {
    const [orders, setOrders] = useState<Orders[]>([]);

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
        <View style={styles.container}>
            <Text style={styles.heading}>Your Orders</Text>
            <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.orderCard}>
                <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                {item.products.map((p: any, index: number) => (
                    <View key={index} style={styles.productRow}>
                    <Text>{p.product.name}</Text>
                    <Text>Qty: {p.quantity}</Text>
                    <Text>Supplier: {p.product.supplier?.name || "N/A"}</Text>
                    </View>
                ))}
                </View>
            )}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    orderCard: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
    date: { fontWeight: "600", marginBottom: 5 },
    productRow: { marginBottom: 5 }
  });