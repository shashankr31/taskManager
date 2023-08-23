import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { globalStyles } from './Constants/Stylesheets';
import { useState } from 'react';
import axios from 'axios';
import useGlobalData from '../stateManagement/GlobalData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [inputFields, setInputFields] = useState({})
    const [msg, setMsg] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { backendPort, globalInitialUpdateData, globalUserIdUpdate } = useGlobalData()

    const onChangeTxt = (key, value) => {
        setInputFields({ ...inputFields, [key]: value });
    }

    const onLoginPress = () => {
        let payload = {
            userEmail: inputFields.userEmail,
            password: inputFields.password,
        }
        axios.post(`${backendPort}/users/login`, payload)
            .then((res) => {
                setMsg(res.data.message)
                setShowSuccessModal(true)
                if (res.data.status) {
                    setInputFields({})
                    globalUserIdUpdate(res.data.userData._id)
                    globalInitialUpdateData(res.data.userData)
                    navigation.navigate('task_manager')
                    _storeData(res.data.userData._id)
                }
            })
            .catch((err) => {
                setMsg(res.data.message)
            })
    }

    const _storeData = async (userId) => {
        console.log("userId.toString()", userId.toString());
        try {
            await AsyncStorage.setItem(
                'usersId',
                userId.toString(),
            );
        } catch (error) {
            // Error saving data
        }
    };


    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 28, marginTop: 28 }}>Login here</Text>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(value) => onChangeTxt('userEmail', value)}
                    value={inputFields.userEmail}
                    placeholder="Enter your Email-ID"
                />
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(value) => onChangeTxt('password', value)}
                    value={inputFields.password}
                    placeholder="Enter your password"
                    secureTextEntry={true} // For password fields
                />

                <TouchableOpacity
                    style={[globalStyles.primaryButton]}
                    onPress={onLoginPress}
                >
                    <Text style={{ color: "#ffffff" }}>Login</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 20, fontSize: 20 }}>
                    {msg}
                </Text>
            </View>
        </SafeAreaView>
    );
}
