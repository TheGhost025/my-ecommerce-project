import { Tabs , router } from "expo-router";
import {Button, Alert, Platform, useColorScheme} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const handleLogout = async () => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("token");
      router.replace("/auth/login");
    }
  } else {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("userId");
          await AsyncStorage.removeItem("token");
          router.replace("/auth/login");
        },
      },
    ]);
  }
}

export default function CustomerTabs() {
  const colorSchema = useColorScheme();
  const theme = colorSchema === "dark" ? Colors.dark : Colors.light;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabInactive || "#888",
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: "#ccc",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.text,
        },
        headerRight: () => (
          <Button title="Logout" onPress={handleLogout} color="#f44336" />
        ),
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product/index"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetags-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="orderHistory/index"
        options={{
          title: "Order History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist/index"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product-details/[id]"
        options={{
          tabBarButton: () => null,
        }}
      />
        <Tabs.Screen
        name="checkout/index"
        options={{
          tabBarButton: () => null,
          
        }}
      />
    </Tabs>
  );
}