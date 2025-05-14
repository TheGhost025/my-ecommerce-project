import {useState} from 'react';
import { View, TextInput, Text, StyleSheet, useColorScheme, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {signup} from '@/services/authService';
import {router} from 'expo-router';
import {Colors} from '@/constants/Colors'; // Import your color constants

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'customer' | 'supplier'>('customer');
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light; // Use the appropriate colors based on the scheme

    const handleSignup = async () => {
        try {
            const user = await signup(name, email, password, role);
            router.replace('../auth/login'); // Redirect to login after signup
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.header, { color: colors.text }]}>Create Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={colors.inputPlaceholder}
        style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
      />
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

      <View style={[styles.pickerContainer, { borderColor: colors.inputBorder }]}>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          dropdownIconColor={colors.text}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Customer" value="customer" />
          <Picker.Item label="Supplier" value="supplier" />
        </Picker>
      </View>

      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <TouchableOpacity onPress={() => router.push("../auth/login")}>
        <Text style={[styles.link, { color: colors.text }]}>
          Already have an account? <Text style={{ fontWeight: "bold" }}>Log in</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
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