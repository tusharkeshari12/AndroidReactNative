import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { theme } from '../theme';
import { Platform } from 'react-native';

import TabBarBackground from '../../components/ui/TabBarBackground';
import { HapticTab } from '../../components/HapticTab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jewelry"
        options={{
          title: 'Jewelry',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="diamond.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
