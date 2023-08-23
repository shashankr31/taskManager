import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/components/HomePage';
import LoginScreen from './src/components/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen';
import TaskManager from './src/components/Taskmanager/TaskManager';
import ProfilePage from './src/components/ProfilePage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="task_manager" component={TaskManager} options={{ headerShown: false }} />
          <Stack.Screen name="profile" component={ProfilePage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
