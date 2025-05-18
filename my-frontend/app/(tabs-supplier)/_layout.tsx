import { Tabs, router } from "expo-router";
import { Button, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors"; // adjust the path if needed

const handleLogout = async () => {
  if (Platform.OS === "web") {
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
};

export default function SupplierTabs() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: colorScheme === "dark" ? "#222" : "#ccc",
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
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-product/index"
        options={{
          title: "Add Product",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders/index"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-stacked-outline" size={size} color={color} />
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
        name="product-details/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
      name="edit-product/[id]"
      options={{
        href: null,
      }}
      />
    </Tabs>
  );
}
