import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from './Constants/Stylesheets';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useGlobalData from '../stateManagement/GlobalData';

export default function RegisterScreen({ navigation }) {
    const [inputFields, setInputFields] = useState({})
    const [msg, setMsg] = useState("")
    const { backendPort } = useGlobalData()
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const onChangeTxt = (key, value) => {
        setInputFields({ ...inputFields, [key]: value });
    }

    const onRegisterPress = () => {
        let payload = {
            userName: inputFields.userName,
            userEmail: inputFields.userEmail,
            password: inputFields.password,
        }
        axios.post(`${backendPort}/users/add`, payload)
            .then((res) => {
                setMsg("Successfully Added")
                setShowSuccessModal(true)
                setInputFields({})
            })
            .catch((err) => {
                setMsg("Error while adding user!")
            })
    }


    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 28, marginTop: 28 }}>Register here</Text>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(value) => onChangeTxt('userName', value)}
                    value={inputFields.userName}
                    placeholder="Enter your name"
                />
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
                    onPress={onRegisterPress}
                >
                    <Text style={{ color: "#ffffff" }}>Register</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 20, fontSize: 20 }}>
                    {msg}

                </Text>
                <View>
                    {
                        showSuccessModal ? <Button title='login here' onPress={() => {
                            navigation.navigate('login')
                        }} /> : ""
                    }
                </View>
            </View>
            {/* <Modal
                isVisible={showSuccessModal}
                animationType="slide"
                onBackdropPress={() => setShowSuccessModal(false)}
            >
                <View style={{ backgroundColor: 'red', padding: 20 }}>
                    <Text>Registration successful!</Text>
                    <Text>You can now login.</Text>
                </View>
            </Modal> */}
        </SafeAreaView>
    );
}
