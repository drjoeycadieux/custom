import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create Auth Context
const AuthContext = createContext();

// Authentication Provider
const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);

      useEffect(() => {
            const checkLogin = async () => {
                  const storedUser = await AsyncStorage.getItem('user');
                  if (storedUser) setUser(JSON.parse(storedUser));
            };
            checkLogin();
      }, []);

      const login = async (email, password) => {
            if (email === 'admin' && password === 'password') {
                  const userData = { email };
                  await AsyncStorage.setItem('user', JSON.stringify(userData));
                  setUser(userData);
            }
      };

      const logout = async () => {
            await AsyncStorage.removeItem('user');
            setUser(null);
      };

      return (
            <AuthContext.Provider value={{ user, login, logout }}>
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
                  <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
                  <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
                  <Button title='Login' onPress={() => login(email, password)} />
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text>Don't have an account? Register</Text>
                  </TouchableOpacity>
            </View>
      );
};

// Register Screen (Mockup)
const RegisterScreen = ({ navigation }) => (
      <View>
            <Text>Register</Text>
            <Button title='Go to Login' onPress={() => navigation.navigate('Login')} />
      </View>
);

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
