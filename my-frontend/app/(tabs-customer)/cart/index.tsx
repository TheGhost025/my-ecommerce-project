import {useState, useEffect} from 'react';
import {Text, View, Button, FlatList, Image, StyleSheet,useColorScheme} from 'react-native';
import {getCart, removeFromCart} from '@/services/cartService';
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <FlatList
            data={cart?.items ?? []}
            keyExtractor={(item) => item.product._id}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                <Text style={[styles.itemName, {color: colors.text}]}>{item.product.name}</Text>
                <Text style={[styles.itemPrice , {color: colors.price}]}>
                  {item.quamtity} x ${item.product.price}
                </Text>
                <Button title="Remove" onPress={() => handleRemove(item.product._id)} color={'red'}/>
              </View>
            )}
          />
          <Button title="Checkout" onPress={() => router.push('../(tabs-customer)/checkout')} color={colors.primary} />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    itemContainer: {
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginBottom: 10,
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 14,
      marginBottom: 10,
    },
  });