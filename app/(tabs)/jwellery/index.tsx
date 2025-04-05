import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Text, Card, Icon, Button, Header } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';


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
      image: 'https://media.istockphoto.com/id/1658696488/photo/close-up-of-gold-and-diamond-necklace-with-pair-of-earrings.jpg?s=2048x2048&w=is&k=20&c=xcblAozSyYMnn19zuurWQAmSOTNz0047LpKRBALt1SQ=',
      price: '$1,299',
      category: 'necklaces'
    },
    {
      id: 2,
      name: 'Gold Necklace',
      description: 'Elegant 22K gold necklace with diamond pendant',
      image: 'https://cdn.pixabay.com/photo/2024/03/27/19/39/ai-generated-8659741_1280.jpg',
      price: '$1,299',
      category: 'necklaces'
    },
    {
      id: 3,
      name: 'Platinum Necklace',
      description: 'Elegant platinum necklace with diamond pendant',
      image: 'https://cdn.pixabay.com/photo/2015/10/01/15/14/beads-967179_960_720.jpg',
      price: '$1,299',
      category: 'necklaces'
    },
    {
      id: 4,
      name: 'Platinum Necklace',
      description: 'Elegant platinum necklace with diamond pendant',
      image: 'https://example.com/necklace3.jpg',
      price: '$1,299',
      category: 'necklaces'
    },
  ],
  rings: [
    {
      id: 1,
      name: 'Engagement Ring',
      description: 'Classic solitaire diamond ring in white gold',
      image: 'https://cdn.pixabay.com/photo/2018/06/30/10/08/ring-3507370_1280.jpg',
      price: '$2,499',
      category: 'rings'
    },
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

  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (item: JewelryItem) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (item: JewelryItem) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[item.id] > 1) {
        updatedCart[item.id] -= 1;
      } else {
        delete updatedCart[item.id]; // Remove item if count is 0
      }
      return updatedCart;
    });
  };



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
            style={[styles.categoryButton, selectedCategory === category.id && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryText, selectedCategory === category.id && styles.selectedCategoryText]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderJewelryItems = () => {
    return (
      <FlatList
        data={JEWELRY_DATA[selectedCategory]}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Click only on image to go to detail screen */}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/jwellery/item-detail',
                  params: { id: item.id.toString(), category: selectedCategory }
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            </TouchableOpacity>

            <View style={styles.cardContent}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>

              {/* Price and Add to Cart Section */}
              <View style={styles.priceCartContainer}>
                <Text style={styles.itemPrice}>{item.price}</Text>

                {cart[item.id] ? (
                  <View style={styles.cartControls}>
                    <TouchableOpacity style={styles.cartButton} onPress={() => handleRemoveFromCart(item)}>
                      <Text style={styles.cartButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.cartCount}>{cart[item.id]}</Text>

                    <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(item)}>
                      <Text style={styles.cartButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                    <Text style={styles.addToCartText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {renderCategories()}
      {renderJewelryItems()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e'
  },

  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },

  categoryButton: {
    padding: 12,
    margin: 5,
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18
  },

  selectedCategory: {
    backgroundColor: '#FFD700'
  },

  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },

  selectedCategoryText: {
    color: '#000',
    fontWeight: 'bold'
  },

  itemsContainer: {
    padding: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  card: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    margin: 8,
    overflow: 'hidden',
    paddingBottom: 12,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  cardContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center'
  },

  itemName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4
  },

  itemPrice: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  viewButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 8,
    width: '80%',
    alignSelf: 'center'
  },

  priceCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },

  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },

  cartButton: {
    backgroundColor: '#FFD700',
    width: 20,   // Reduced width
    height: 20,  // Reduced height
    borderRadius: 10, // Smaller circular buttons
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,  // Reduced spacing
  },

  cartButtonText: {
    color: '#000',
    fontSize: 12, // Smaller font
    fontWeight: 'bold',
  },

  cartCount: {
    color: '#fff',
    fontSize: 12, // Smaller font
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },

  addToCartButton: {
    backgroundColor: '#FFD700',
    width: 24,  // Smaller button
    height: 24, // Smaller button
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },

  addToCartText: {
    color: '#000',
    fontSize: 12, // Smaller font
    fontWeight: 'bold',
  },
});

