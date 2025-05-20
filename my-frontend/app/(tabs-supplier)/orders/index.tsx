import {View, Text, FlatList, StyleSheet, useColorScheme, ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { getOrdersBySupplier } from '@/services/orderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Orders } from '@/types/Orders';
import { Colors } from '@/constants/Colors';

export default function SupplierOrders() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const userId = await AsyncStorage.getItem('userId');
            const userIdParsed = JSON.parse(userId as string);
            try{
                const data = await getOrdersBySupplier(userIdParsed);
                setOrders(data);
            }
            catch (error) {
                console.error("Error fetching orders:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return(
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.primary }]}>Supplier Orders</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          </View> ):
          ( <>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.inputBorder }]}>
            <Text style={[styles.customer, { color: colors.text }]}>Customer: {item.customer.name}</Text>
            <Text style={[styles.date, { color: colors.inputPlaceholder }]}>
              Ordered on {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            {item.products.map((p: any, index: number) => (
              <View key={index} style={styles.productRow}>
                <Text style={[styles.productName, { color: colors.text }]}>{p.product.name}</Text>
                <Text style={[styles.productQty, { color: colors.primary }]}>Qty: {p.quantity}</Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      /> </>)}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customer: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  productName: {
    fontSize: 14,
  },
  productQty: {
    fontSize: 14,
    fontWeight: '600',
  },
    loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});