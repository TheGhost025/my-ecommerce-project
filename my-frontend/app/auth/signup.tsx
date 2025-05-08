import {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet,useColorScheme, TouchableOpacity} from 'react-native';
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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.text}
                style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
            />
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
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
            >
                <Picker.Item label="Customer" value="customer" color={colors.text}/>
                <Picker.Item label="Supplier" value="supplier" color={colors.text}/>
            </Picker>
            <Button title="Signup" onPress={handleSignup} color={colors.primary}/>

            <TouchableOpacity onPress={() => router.push('../auth/login')}>
                <Text style={[styles.signupText,{ color: colors.text }]}>
                    Already have an account? Log in
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