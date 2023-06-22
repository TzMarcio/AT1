import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppInfoScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Informações do App</Text>
            <Text style={styles.text}>
                Este aplicativo permite cadastrar, editar e remover produtos. Você pode gerenciar facilmente seu estoque de produtos com essa funcionalidade.
            </Text>
            {/* Adicione outras informações relevantes do seu aplicativo */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default AppInfoScreen;
