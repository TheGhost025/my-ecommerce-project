import {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {signup} from '@/services/authService';
import {router} from 'expo-router';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'customer' | 'supplier'>('customer');

    const handleSignup = async () => {
        try {
            const user = await signup(name, email, password, role);
            router.replace('../auth/login'); // Redirect to login after signup
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <View style={{padding: 20}}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{borderWidth: 1, marginBottom: 10, padding: 10}}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{borderWidth: 1, marginBottom: 10, padding: 10}}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{borderWidth: 1, marginBottom: 10, padding: 10}}
            />
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={{borderWidth: 1, marginBottom: 10}}
            >
                <Picker.Item label="Customer" value="customer" />
                <Picker.Item label="Supplier" value="supplier" />
            </Picker>
            <Button title="Signup" onPress={handleSignup} />
        </View>
    );
}