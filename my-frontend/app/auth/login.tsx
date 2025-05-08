import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet ,useColorScheme, TouchableOpacity } from "react-native";
import { login } from "@/services/authService";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors"; // Import your color constants

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light; // Use the appropriate colors based on the scheme

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={colors.text}
                style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={colors.text}
                style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
            />
            <Button title="Login" onPress={handleLogin} color={colors.primary}/>

            <TouchableOpacity onPress={() => router.push('../auth/signup')}>
                <Text style={[styles.signupText,{ color: colors.text }]}>
                    Don't have an account? Sign up
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: {
      borderWidth: 1,
      borderRadius: 6,
      marginBottom: 15,
      padding: 12,
      fontSize: 16,
    },
    signupText: {
        textAlign: "center",
        marginTop: 15,
    }
  });