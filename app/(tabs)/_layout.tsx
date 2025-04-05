import { router, Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { theme } from '../theme';
import { Image, Platform, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { HapticTab } from '../../components/HapticTab';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const routeTitles:any = {
  index: 'Home',
  jwellery: 'Jwellery',
  cart: 'Cart',
  explore: 'Discover Trends',
  profile: 'Profile'
};


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState('');


  return (
    <Tabs
      screenOptions={({ route }: { route:any })=>({
        // headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        // headerTitleStyle: theme.header.titleStyle,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        },
        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerTitleStyle: {
          fontSize: 16, // ✅ Adjust title size if needed
        },
        headerTitleAlign: 'center',
        headerStyle: {
          height: 85, // ✅ Reduce header height (default is ~56-60)
        },
        headerTitle: () => 
          route.name === 'explore' ? (
            <Text style={{ fontSize: 12, color: Colors[colorScheme ?? 'light'].tint }}>{routeTitles[route.name]}</Text>  // Default title
          ) : (
            <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
              paddingHorizontal: 10,
              height: 35,
              width: 240, // ✅ Adjust width if needed
              fontSize: 14,
            }}
          />
          ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('../profile')} style={{ marginRight: 15 }}>
            <View style={{ alignItems: 'center' }}>
              <MaterialIcons name="account-circle" size={24} color={Colors[colorScheme ?? 'light'].tint} />
              <Text style={{ fontSize: 10, color: Colors[colorScheme ?? 'light'].text }}>{routeTitles['profile']}</Text>
            </View>
          </TouchableOpacity>
        ),

      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color:any }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jwellery"
        options={{
          title: 'Jwellery',
          tabBarIcon: ({ color }: { color:any }) => <IconSymbol size={28} name="diamond.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }: { color:any }) => <IconSymbol size={28} name="cart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }: { color:any }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
