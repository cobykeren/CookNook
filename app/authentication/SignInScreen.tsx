// app/SignInScreen.tsx
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
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
      <Title style={styles.title}>Login</Title>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
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
        placeholder="Enter your password"
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
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Sign In
      </Button>
      <Button
        mode="text"
        onPress={() => router.replace("/authentication/SignUpScreen")}
        style={styles.button}
      >
        Don't have an account? Sign Up
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
    marginTop: 70,
    marginBottom: 40,
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

export default SignInScreen;
