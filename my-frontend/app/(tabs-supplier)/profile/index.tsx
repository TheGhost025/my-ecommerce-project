import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import { getSupplierById } from '@/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const id = await AsyncStorage.getItem('userId');
            try {
                const idPaerse = JSON.parse(id as string);
                const data = await getSupplierById(idPaerse);
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Profile</Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: {name}</Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: {email}</Text>
        </View>
    );
}