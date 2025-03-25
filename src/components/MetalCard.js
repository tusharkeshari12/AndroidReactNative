import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@rneui/themed';

const MetalCard = ({ title, price, change, currency = 'USD' }) => {
  const isPositive = change >= 0;
  
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{currency} {price}</Text>
        <Text style={[styles.change, { color: isPositive ? '#4CAF50' : '#F44336' }]}>
          {isPositive ? '+' : ''}{change}%
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    marginBottom: 5,
  },
  change: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MetalCard;
