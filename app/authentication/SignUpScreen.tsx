// app/SignUpScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Keyboard,
} from "react-native";
import { Button, Title } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/"); // Redirect to home (LibraryScreen) after sign-up
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Sign In Error", error.message);
      } else {
        Alert.alert("Sign In Error", "An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeLabel}> 🍳🥘🍲🍕🥗🍔🌮 </Text>
        <Text style={styles.welcomeLabel}>Welcome to CookNook!</Text>
        <Text style={styles.welcomeLabel}> 🥙🍣🍤🍜🥩🥓🥑 </Text>
      </View>
      <Title style={styles.title}>Sign Up</Title>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#C0C0C0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#C0C0C0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#C0C0C0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Create Account
      </Button>
      <Button
        mode="text"
        onPress={() => router.replace("/authentication/SignInScreen")}
        style={styles.button}
      >
        Already have an account? Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  welcomeContainer: {
    marginTop: 60,
    marginBottom: 50,
  },
  welcomeLabel: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#010000",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    marginTop: 16,
  },
});

export default SignUpScreen;
