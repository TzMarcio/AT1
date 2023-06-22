import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {collection, doc, addDoc, setDoc } from "firebase/firestore";
import {db} from "./firebase";

const productsRef = doc(collection(db, "products"));

const ProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const handleSaveProduct = () => {
        const productData = {
            name,
            price,
            quantity,
            description,
        };

        console.log('salvando')

        addDoc(collection(db, "products"), productData).then(() => {
            console.log('Produto salvo com sucesso!');
            setName('');
            setPrice('');
            setQuantity('');
            setDescription('');
        })
            .catch((error) => {
                console.log('Erro ao salvar o produto:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title="Salvar Produto" onPress={handleSaveProduct}/>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ProductScreen;
