import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement login logic
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text h3 style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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

        <TouchableOpacity style={styles.forgotPassword}>
          <Link href="/(auth)/forgot-password">
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Link>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={handleLogin}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2089dc',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 25,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupLink: {
    color: '#2089dc',
  },
});
