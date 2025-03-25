import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../../../components/ui/IconSymbol';
import { Pressable } from 'react-native';

export default function JewelryLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* <Stack.Screen
        name="index"
        options={{
          title: 'Jewelry Collection',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2d2d2d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable onPress={() => router.push('/(tabs)/profile')} style={{ marginRight: 15 }}>
              <IconSymbol
                name="person.fill"
                size={28}
                color="#fff"
              />
            </Pressable>
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="jwellery"
        options={{
          title: 'Jewelry Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2d2d2d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
    </Stack>
  );
}
