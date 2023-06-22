import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.replace('Home');
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.replace('Home');
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={text => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={{marginTop: 5}}>
                <Button title="Registrar" onPress={handleRegister} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
