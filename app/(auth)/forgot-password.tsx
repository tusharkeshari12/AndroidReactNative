import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    alert('Password reset link sent to your email');
    router.push('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text h3 style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password
        </Text>

        <Input
          placeholder="Email"
          leftIcon={{ type: 'material', name: 'email' }}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
        />

        <Button
          title="Send Reset Link"
          onPress={handleResetPassword}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />

        <View style={styles.backToLoginContainer}>
          <Text>Remember your password? </Text>
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
    paddingHorizontal: 20,
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
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    color: '#2089dc',
  },
});
