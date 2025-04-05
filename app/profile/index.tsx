import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, ListItem } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { theme } from '../theme';

export default function ProfileScreen() {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route as any);  // Using type assertion as a temporary fix
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={100}
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={styles.avatar}
        />
        <Text h3 style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <ListItem 
          bottomDivider 
          onPress={() => navigateTo('./edit-profile')}
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>Edit Profile</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.text.primary} />
        </ListItem>
        <ListItem 
          bottomDivider 
          onPress={() => navigateTo('./orders')}
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>My Orders</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.text.primary} />
        </ListItem>
        <ListItem 
          bottomDivider 
          onPress={() => navigateTo('../profile/settings')}
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>Settings</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.text.primary} />
        </ListItem>
        <ListItem 
          bottomDivider 
          onPress={() => navigateTo('../profile/wishlist')}
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>Wishlist</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.text.primary} />
        </ListItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    backgroundColor: theme.colors.surface,
    marginBottom: 10,
  },
  name: {
    color: theme.colors.text.primary,
    marginBottom: 5,
  },
  email: {
    color: theme.colors.text.secondary,
    fontSize: 16,
  },
  section: {
    marginTop: 20,
  },
  listItem: {
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
  },
  listItemTitle: {
    color: theme.colors.text.primary,
  },
});
