import { Tabs } from "expo-router";

export default function CustomerTabs() {
  return(
    <Tabs>
      <Tabs.Screen name="home" options={{title: 'Home'}}/>
      <Tabs.Screen name="product" options={{title: 'Products'}}/>
      <Tabs.Screen name="cart" options={{title: 'Cart'}}/>
      <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
    </Tabs>
  );
}