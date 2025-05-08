import { Tabs , router } from "expo-router";
import {Button, Alert, Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  return(
    <Tabs screenOptions={{
      headerRight: () => (
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#f44336"
        />
      )
    }}>
      <Tabs.Screen name="home" options={{title: 'Home'}}/>
      <Tabs.Screen name="product" options={{title: 'Products'}}/>
      <Tabs.Screen name="cart" options={{title: 'Cart'}}/>
      <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
    </Tabs>
  );
}