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
            <Text style={[styles.heading, {color: colors.text}]}>Your Orders</Text>
            <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={[styles.orderCard, { backgroundColor: colors.card , borderColor: colors.border }]}>
                <Text style={[styles.date, {color: colors.text}]}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                {item.products.map((p: any, index: number) => (
                    <View key={index} style={styles.productRow}>
                        <Text style={{color: colors.text}}>{p.product.name}</Text>
                        <Text style={{color: colors.text}}>Qty: {p.quantity}</Text>
                        <Text style={{color: colors.text}}>Supplier: {p.product.supplier?.name || "N/A"}</Text>
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