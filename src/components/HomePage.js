import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalData from '../stateManagement/GlobalData';
import NavBarScene from './NavBar';
import { globalStyles } from './Constants/Stylesheets';
import LoginScreen from './LoginScreen';
export default function HomePage({ navigation }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const { globalUserIdUpdate, userId } = useGlobalData();

    const onBtnClick = (path) => {
        navigation.navigate(path)
    }

    useEffect(() => {
        _retrieveData();
    }, []);

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('usersId');
            if (value !== null) {
                globalUserIdUpdate(value)
                navigation.navigate('task_manager');
            }
        } catch (error) {
            console.log("Error retrieving data:", error);
        }
    };

    return (
        <View style={globalStyles.container}>
            {
                userId === "" ? <View>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, marginTop: 28 }}>Task Management</Text>
                        
                        <Button
                            onPress={() => { onBtnClick("login") }}
                            title="Login"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Text>OR</Text>
                        <Button
                            onPress={() => { onBtnClick("register") }}
                            title="Register"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>

                </View> : <View>
                    <Text style={{ fontSize: 32, marginTop: 28 }}>Task Management</Text>

                    <Button
                        onPress={() => { onBtnClick("task_manager") }}
                        title="View all task"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            }
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
