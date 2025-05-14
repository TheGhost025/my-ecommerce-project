import { useState } from "react";
import { View, TextInput, Text, StyleSheet, useColorScheme, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, } from "react-native";
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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.header, { color: colors.text }]}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colors.inputPlaceholder}
        style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={colors.inputPlaceholder}
        style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
      />

      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <TouchableOpacity onPress={() => router.push("../auth/signup")}>
        <Text style={[styles.link, { color: colors.text }]}>
          Don't have an account? <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    fontSize: 14,
  },
});