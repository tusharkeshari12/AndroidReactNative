import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Image, Card } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { JEWELRY_DATA } from './jewelry';

export default function JewelryDetailScreen() {
  const { id, category } = useLocalSearchParams<{ id: string; category: string }>();
  
  // Find the jewelry item
  const jewelryItem = JEWELRY_DATA[category as keyof typeof JEWELRY_DATA]?.find(
    item => item.id.toString() === id
  );

  if (!jewelryItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Image
          source={{ uri: jewelryItem.image }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{jewelryItem.name}</Text>
          <Text style={styles.price}>{jewelryItem.price}</Text>
          <Text style={styles.description}>{jewelryItem.description}</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderWidth: 0,
    borderRadius: 10,
    padding: 15,
    margin: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
