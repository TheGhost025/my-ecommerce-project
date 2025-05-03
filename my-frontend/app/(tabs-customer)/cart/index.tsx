import {useState, useEffect} from 'react';
import {Text, View, Button, FlatList, Image} from 'react-native';
import {getCart, removeFromCart} from '@/services/cartService';
import {CartData} from '@/types/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const [cart, setCart] = useState<CartData | null>(null);

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
        <FlatList 
            data={cart?.items ?? []}
            keyExtractor={(item) => item.product._id}
            renderItem={({item}) => (
                <View>
                <Image source={{ uri: item.product.image }} style={{ width: 100, height: 100 }} />
                <Text>{item.product.name}</Text>
                <Text>{item.quantity} x ${item.product.price}</Text>
                <Button title="Remove" onPress={() => handleRemove(item.product._id)} />
              </View>
            )}
        />
    );
}