import { Tabs } from "expo-router";

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