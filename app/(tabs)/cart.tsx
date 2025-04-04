import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: 'Gold Ring', price: 5000, quantity: 1, image: 'https://example.com/ring.jpg' },
        { id: 2, name: 'Silver Necklace', price: 8000, quantity: 1, image: 'https://example.com/necklace.jpg' }
    ]);

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getTotalPrice = (): string => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <View style={styles.container}> 
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}> 
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>₹{item.price}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <Text style={styles.remove}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.total}>Total: ₹{getTotalPrice()}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10, backgroundColor: '#ffffff', borderRadius: 10, padding: 10 },
    image: { width: 80, height: 80, borderRadius: 10 },
    details: { flex: 1, marginLeft: 10 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    price: { fontSize: 16, marginVertical: 5, color: '#777' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    quantityButton: { fontSize: 22, paddingHorizontal: 10, color: '#555' },
    quantity: { fontSize: 18, marginHorizontal: 10, color: '#333', fontWeight: 'bold' },
    remove: { fontSize: 18, padding: 10, color: 'red', fontWeight: 'bold' },
    footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#ddd', alignItems: 'center', backgroundColor: '#ffffff' },
    total: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    checkoutButton: { backgroundColor: '#ffcc00', padding: 12, borderRadius: 8, marginTop: 10 },
    checkoutText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
});

export default CartScreen;