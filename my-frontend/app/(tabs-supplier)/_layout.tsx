import { Tabs , router } from "expo-router";
import {Button, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SupplierTabs() {
  return(
    <Tabs>
      <Tabs.Screen name="dashboard" options={{title: 'Dashboard'}}/>
      <Tabs.Screen name="add-product" options={{title: 'Add Product'}}/>
      <Tabs.Screen name="orders" options={{title: 'Orders'}}/>
      <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
    </Tabs>
  );
}