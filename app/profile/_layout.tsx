import { Stack } from 'expo-router';
import { theme } from '../theme';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: 'Edit Profile',
          headerShown: false,
          presentation: 'card',
          ...theme.header,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          presentation: 'card',
          ...theme.header,
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'My Orders',
          headerShown: false,
          presentation: 'card',
          ...theme.header,
        }}
      />
      <Stack.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          headerShown: false,
          presentation: 'card',
          ...theme.header,
        }}
      />
    </Stack>
  );
}
