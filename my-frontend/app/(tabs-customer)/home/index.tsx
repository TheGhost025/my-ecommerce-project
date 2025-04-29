import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {useState, useEffect} from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/Products';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    const styles = StyleSheet.create({
        container: {flex: 1, padding: 20},
        title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
        productCard: {flex: 1, margin: 10, padding: 10, borderRadius: 10, backgroundColor: '#fff', elevation: 2},
        productImage: {width: '100%', height: 100, borderRadius: 10},
        productName: {fontSize: 16, fontWeight: 'bold', marginTop: 5},
        productPrice: {fontSize: 14, color: 'green', marginTop: 5},
    });
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity style={styles.productCard}>

            <Image source={{ uri: item.image }} style={styles.productImage}/>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Customer!</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
            />
        </View>
    );
}