import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Switch, Text, Divider } from '@rneui/themed';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive alerts and updates</ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={notifications} onValueChange={setNotifications} />
        </ListItem>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Dark Mode</ListItem.Title>
            <ListItem.Subtitle>Switch to dark theme</ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </ListItem>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Biometric Login</ListItem.Title>
            <ListItem.Subtitle>Use fingerprint or face ID</ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={biometric} onValueChange={setBiometric} />
        </ListItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    color: '#666',
  },
  divider: {
    marginVertical: 15,
  },
});
