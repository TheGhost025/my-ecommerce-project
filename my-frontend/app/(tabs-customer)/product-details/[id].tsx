import { View, Text, Image, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { getProductById } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { addToWishlist ,removeFromWishlist, isWhishlisted} from "@/services/wishlistService";
import { Product } from "@/types/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const data = await getProductById(id as string);
            setProduct(data);

            const userId = await AsyncStorage.getItem('userId');
            const userIdParse = JSON.parse(userId as string);
            if (userIdParse) {
                const wishlisted = await isWhishlisted(userIdParse, data._id);
                setIsWishlisted(wishlisted);
            }

        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    fetchProduct();}, [id]);

    const handleAddToCart = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParse = JSON.parse(userId as string);
        try {
          if (!userIdParse || !product) return;
          await addToCart(userIdParse, product._id, quantity);
        } catch (error) {
          console.error("Add to cart failed", error);
        }
      };

const toggleWishlist = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const userIdParse = JSON.parse(userId as string);
    if (!userIdParse || !product) return;

    if (isWishlisted) {
      await removeFromWishlist({ userId: userIdParse, productId: product._id });
      setIsWishlisted(false);
      Platform.OS === 'web'
        ? window.alert("Product removed from wishlist")
        : Alert.alert("Removed", "Product removed from wishlist");
    } else {
      await addToWishlist({ userId: userIdParse, productId: product._id });
      setIsWishlisted(true);
      Platform.OS === 'web'
        ? window.alert("Product added to wishlist")
        : Alert.alert("Success", "Product added to wishlist");
    }
  } catch (error) {
    console.error("Wishlist toggle failed", error);
    const msg = isWishlisted ? "Failed to remove from wishlist" : "Failed to add to wishlist";
    Platform.OS === 'web'
      ? window.alert(msg)
      : Alert.alert("Error", msg);
  }
};


    if(!product) {
        return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return(
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.scrollContent}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
            <Text style={[styles.productPrice, { color: colors.price }]}>${product.price.toFixed(2)}</Text>
            <Text style={[styles.productDescription, { color: colors.text }]}>{product.description}</Text>
            <View style={styles.metaContainer}>
                <Text style={[styles.meta, { color: colors.text }]}>Category: {product.category}</Text>
                <Text style={[styles.meta, { color: colors.text }]}>Stock: {product.stock}</Text>
                <Text style={[styles.meta, { color: colors.text }]}>Supplier: {product.supplier.name}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setQuantity(prev => Math.max(1, prev - 1))} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleWishlist} style={styles.heartIcon}>
            <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={32}
                color={isWishlisted ? 'red' : colors.text}
            />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: '600',
    },
    productDescription: {
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 10,
    },
    metaContainer: {
        marginTop: 15,
        width: '100%',
    },
    meta: {
        fontSize: 14,
        marginVertical: 2,
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    wishlistButton: {
        backgroundColor: '#FF6F61', // a warm color to differentiate
    },
    heartIcon: {
        position: 'absolute',
        top: 30,
        right: 30,
        zIndex: 10,
        },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        },
        quantityButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        },
        quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        },
        quantityValue: {
        fontSize: 18,
        fontWeight: 'bold',
        },
        loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
});