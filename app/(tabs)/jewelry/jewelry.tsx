import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Text, Card, Icon, Button, Header } from '@rneui/themed';
import { useRouter } from 'expo-router';

interface JewelryItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
}

interface JewelryData {
  necklaces: JewelryItem[];
  rings: JewelryItem[];
  earrings: JewelryItem[];
  bracelets: JewelryItem[];
}

interface Category {
  id: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  name: string;
  icon: string;
}

// Sample jewelry data
export const JEWELRY_DATA: JewelryData = {
  necklaces: [
    {
      id: 1,
      name: 'Diamond Necklace',
      description: 'Elegant 18K gold necklace with diamond pendant',
      image: 'https://example.com/necklace1.jpg',
      price: '$1,299',
      category: 'necklaces'
    },
    // Add more necklaces
  ],
  rings: [
    {
      id: 1,
      name: 'Engagement Ring',
      description: 'Classic solitaire diamond ring in white gold',
      image: 'https://example.com/ring1.jpg',
      price: '$2,499',
      category: 'rings'
    },
    // Add more rings
  ],
  earrings: [
    {
      id: 1,
      name: 'Diamond Studs',
      description: 'Round brilliant cut diamond studs',
      image: 'https://example.com/earrings1.jpg',
      price: '$899',
      category: 'earrings'
    },
    // Add more earrings
  ],
  bracelets: [
    {
      id: 1,
      name: 'Tennis Bracelet',
      description: 'Diamond tennis bracelet in white gold',
      image: 'https://example.com/bracelet1.jpg',
      price: '$3,499',
      category: 'bracelets'
    },
    // Add more bracelets
  ]
};

const CATEGORIES: Category[] = [
  { id: 'necklaces', name: 'Necklaces', icon: 'necklace' },
  { id: 'rings', name: 'Rings', icon: 'ring' },
  { id: 'earrings', name: 'Earrings', icon: 'earrings' },
  { id: 'bracelets', name: 'Bracelets', icon: 'bracelet' }
];

export default function JewelryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category['id']>('necklaces');
  const router = useRouter();

  const renderCategories = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              type="material-community"
              color={selectedCategory === category.id ? '#FFD700' : '#ffffff'}
              size={24}
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderJewelryItems = () => {
    const items = JEWELRY_DATA[selectedCategory];
    return (
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Card key={item.id} containerStyle={styles.card}>
            <Card.Image
              source={{ uri: item.image }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Button
                title="View Details"
                onPress={() => router.push({
                  pathname: "/(tabs)/jewelry/item-detail",
                  params: { id: item.id.toString(), category: selectedCategory }
                })}
                buttonStyle={styles.viewButton}
              />
            </View>
          </Card>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderCategories()}
        {renderJewelryItems()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    borderBottomWidth: 0,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#3a3a3a',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  categoryText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#FFD700',
  },
  scrollView: {
    flex: 1,
  },
  itemsContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderWidth: 0,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  cardImage: {
    height: 200,
    borderRadius: 8,
  },
  cardContent: {
    padding: 8,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 18,
  },
  itemPrice: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    marginTop: 8,
  },
});
