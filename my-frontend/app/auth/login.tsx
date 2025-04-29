import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { login } from "@/services/authService";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const user = await login(email, password);
            if(user.role === 'customer'){
                router.push('../(tabs-customer)/home');

            }
            else if(user.role === 'supplier'){
                router.push('../(tabs-supplier)/dashboard');
            }
        }
        catch (error) {
            console.error("Login failed", error);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}