import React, { useState, useEffect } from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {Card, Divider, IconButton} from 'react-native-paper';
import { collection, doc, deleteDoc,onSnapshot, updateDoc    } from "firebase/firestore";
import {db} from "./firebase";

const productsRef = collection(db, "products");

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {

        const unsub = onSnapshot(productsRef, (doc) => {
            console.log(doc.data)
            const data = [];
            doc.forEach((doc) => data.push({id: doc.id, ...doc.data()}));
                setProducts(data);

                console.log(data);
        })
        console.log(unsub)

    }, []);

    const handleUpdateProduct = (item) => {
        setSelectedItem(item);
    };

    const handleSaveUpdatedProduct = () => {
        // Implemente a lógica para salvar as alterações do item no banco de dados
        console.log(selectedItem)
        updateDoc(doc(db, "products", selectedItem.id), {
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: selectedItem.quantity,
            description: selectedItem.description
        }).then(r => {
            console.log(r)
            setSelectedItem(null);
        })
    };

    const handleDeleteProduct = (id) => {
        // Implementar a lógica para excluir o produto com o ID fornecido
        deleteDoc(doc(db, "products", id)).then(r => console.log(r));
        console.log('Excluir produto:', id);
    };


    const renderProductItem = ({ item }) => {
        const isItemSelected = selectedItem && selectedItem.id === item.id;

        const handleSort = () => {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newSortOrder);
            const sortedProducts = products.slice().sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (newSortOrder === 'asc') {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            });
            setProducts(sortedProducts);
        };

        return (
            <Card style={styles.card}>
                <TouchableOpacity onPress={() => handleUpdateProduct(item)}>
                    {isItemSelected ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={selectedItem.name}
                                onChangeText={(text) =>
                                    setSelectedItem((prevItem) => ({
                                        ...prevItem,
                                        name: text,
                                    }))
                                }
                            />
                            <TextInput
                                style={styles.input}
                                value={selectedItem.price}
                                onChangeText={(text) =>
                                    setSelectedItem((prevItem) => ({
                                        ...prevItem,
                                        price: text,
                                    }))
                                }
                            />
                            <TextInput
                                style={styles.input}
                                value={selectedItem.quantity}
                                onChangeText={(text) =>
                                    setSelectedItem((prevItem) => ({
                                        ...prevItem,
                                        quantity: text,
                                    }))
                                }
                            />
                            <TextInput
                                style={styles.input}
                                value={selectedItem.description}
                                onChangeText={(text) =>
                                    setSelectedItem((prevItem) => ({
                                        ...prevItem,
                                        description: text,
                                    }))
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Card.Title title={item.name} subtitle={item.price} />
                            <Card.Content>
                                <Text>{item.quantity}</Text>
                                <Text>{item.description}</Text>
                            </Card.Content>
                        </>
                    )}
                </TouchableOpacity>
                {isItemSelected ? (
                    <IconButton
                        icon="check"
                        color="green"
                        size={20}
                        onPress={() => handleSaveUpdatedProduct()}
                        style={styles.saveIcon}
                    />
                ) : (

                    <View>
                        <IconButton
                            icon="delete"
                            color="red"
                            size={20}
                            onPress={() => handleDeleteProduct(item.id)}
                        />
                        <IconButton
                            icon="sort"
                            color="blue"
                            size={20}
                            onPress={handleSort}
                            style={styles.sortIcon}
                        />
                    </View>

                )}
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    card: {
        position: 'relative',
        marginBottom: 10,
    },
    sortIcon: {
        position: 'absolute',
        top: 10,
        right: 40,
    },
});

export default ProductListScreen;
