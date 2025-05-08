import {Text, View, StyleSheet, useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import { getSupplierById } from '@/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';


export default function Profile() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, {color: colors.text}]}>Profile</Text>
            <Text style={[styles.info, {color: colors.text}]}>Name: {name}</Text>
            <Text style={[styles.info, {color: colors.text}]}>Email: {email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    }
});