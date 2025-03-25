import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const wishlistItems = [
  {
    id: '1',
    name: '18K Gold Chain',
    price: '$999.99',
    image: 'https://example.com/gold-chain.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Diamond Earrings',
    price: '$1,499.99',
    image: 'https://example.com/diamond-earrings.jpg',
    inStock: true,
  },
  {
    id: '3',
    name: 'Pearl Necklace',
    price: '$599.99',
    image: 'https://example.com/pearl-necklace.jpg',
    inStock: false,
  },
];

export default function WishlistScreen() {
  const handleRemove = (id: string) => {
    console.log('Removing item:', id);
  };

  const handleAddToCart = (id: string) => {
    console.log('Adding to cart:', id);
  };

  return (
    <ScrollView style={styles.container}>
      {wishlistItems.map((item) => (
        <Card key={item.id} containerStyle={styles.card}>
          <View style={styles.itemContent}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={[
                styles.stockStatus,
                { color: item.inStock ? 'green' : 'red' }
              ]}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
            
            <View style={styles.actions}>
              <Button
                type="clear"
                icon={<Icon name="trash" type="font-awesome" size={20} color="red" />}
                onPress={() => handleRemove(item.id)}
              />
              <Button
                title="Add to Cart"
                disabled={!item.inStock}
                onPress={() => handleAddToCart(item.id)}
                size="sm"
              />
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: '#2089dc',
    marginBottom: 5,
  },
  stockStatus: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
