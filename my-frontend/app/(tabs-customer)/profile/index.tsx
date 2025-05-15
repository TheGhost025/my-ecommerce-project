import {Text, View, StyleSheet, useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import { getCustomerById } from '@/services/userService';
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
                const idParse = JSON.parse(id as string);
                const data = await getCustomerById(idParse);
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
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.card }]}>
          <Text style={[styles.avatarInitial, { color: colors.primary }]}>
            {name ? name[0].toUpperCase() : "U"}
          </Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.email, { color: colors.inputPlaceholder }]}>{email}</Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  avatarInitial: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
});