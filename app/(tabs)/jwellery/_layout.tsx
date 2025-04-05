import { Stack } from 'expo-router';

export default function JewelryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="item-detail" options={{ headerShown: false, title: "Item Details" }} />
    </Stack>
  );
}
