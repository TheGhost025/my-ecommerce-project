import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Product } from '../types/Products';


type Props = {
    product: Product;
};

const ProductItem = ({product}: Props) => (
    <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image}/>
        <View style={styles.info}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price.toFixed(2)}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    info: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        marginTop: 5,
        fontSize: 16,
        color: 'green',
    },
});

export default ProductItem;