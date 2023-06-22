import React from 'react';
import { StyleSheet, Platform, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductScreen from "./ProductScreen";
import ProductListScreen from "./ProductListScreen";
import AppInfoScreen from "./AppInfoScreen";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator style={styles.safeArea}>
            <Tab.Screen name="Cadastro" component={ProductScreen} />
            <Tab.Screen name="Produtos" component={ProductListScreen} />
            <Tab.Screen name="Informações" component={AppInfoScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
