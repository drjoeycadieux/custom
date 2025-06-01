import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Create Auth Context
const AuthContext = createContext();

// Authentication Provider
const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                  setUser(firebaseUser);
                  setLoading(false);
            });
            return unsubscribe;
      }, []);

      const login = async (email, password) => {
            try {
                  await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                  alert(error.message);
            }
      };

      const register = async (email, password) => {
            try {
                  await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                  alert(error.message);
            }
      };

      const logout = async () => {
            try {
                  await signOut(auth);
            } catch (error) {
                  alert(error.message);
            }
      };

      if (loading) return null;

      return (
            <AuthContext.Provider value={{ user, login, logout, register }}>
                  {children}
            </AuthContext.Provider>
      );
};

// Login Screen
const LoginScreen = ({ navigation }) => {
      const { login } = useContext(AuthContext);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      return (
            <View>
                  <Text>Login</Text>
                  <TextInput placeholder='Email' value={email} onChangeText={setEmail} autoCapitalize='none' />
                  <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry autoCapitalize='none' />
                  <Button title='Login' onPress={() => login(email, password)} />
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text>Don't have an account? Register</Text>
                  </TouchableOpacity>
            </View>
      );
};

// Register Screen (with Firebase)
const RegisterScreen = ({ navigation }) => {
      const { register } = useContext(AuthContext);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      return (
            <View>
                  <Text>Register</Text>
                  <TextInput placeholder='Email' value={email} onChangeText={setEmail} autoCapitalize='none' />
                  <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry autoCapitalize='none' />
                  <Button title='Register' onPress={() => register(email, password)} />
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Already have an account? Login</Text>
                  </TouchableOpacity>
            </View>
      );
};

// Home Screen (Protected)
const HomeScreen = () => {
      const { logout } = useContext(AuthContext);
      return (
            <View>
                  <Text>Home</Text>
                  <Button title='Logout' onPress={logout} />
            </View>
      );
};

// Profile Screen (Protected)
const ProfileScreen = () => (
      <View>
            <Text>Profile</Text>
      </View>
);

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

// Auth Navigator (Login/Register)
const AuthNavigator = () => (
      <AuthStack.Navigator>
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='Register' component={RegisterScreen} />
      </AuthStack.Navigator>
);

// Main App Navigator (Protected Routes)
const MainNavigator = () => (
      <MainTabs.Navigator>
            <MainTabs.Screen name='Home' component={HomeScreen} />
            <MainTabs.Screen name='Profile' component={ProfileScreen} />
      </MainTabs.Navigator>
);

// Root Navigation Handler
const RootNavigator = () => {
      const { user } = useContext(AuthContext);
      return <NavigationContainer>{user ? <MainNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

// App Entry Point
export default function App() {
      return (
            <AuthProvider>
                  <RootNavigator />
            </AuthProvider>
      );
}
