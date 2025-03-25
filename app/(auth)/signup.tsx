import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    // TODO: Implement signup logic
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text h3 style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <Input
          placeholder="Full Name"
          leftIcon={{ type: 'material', name: 'person' }}
          onChangeText={setName}
          value={name}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Email"
          leftIcon={{ type: 'material', name: 'email' }}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Password"
          leftIcon={{ type: 'material', name: 'lock' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Confirm Password"
          leftIcon={{ type: 'material', name: 'lock' }}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />

        <View style={styles.loginContainer}>
          <Text>Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text style={styles.loginLink}>Login</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 25,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    color: '#2089dc',
  },
});
