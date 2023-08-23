import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBarScene from './NavBar'
import useGlobalData from '../stateManagement/GlobalData'
import { globalStyles } from './Constants/Stylesheets'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfilePage() {
    const { userTasks, globalUserIdUpdate } = useGlobalData()
    const navigation = useNavigation()

    const onLogoutClick = () => {
        clearData();

    }

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('usersId');
            globalUserIdUpdate("")
            navigation.navigate('Home');

        } catch (error) {
            // Error saving data
        }
    };
    
    return (
        <View style={{ padding: 10 }}>
            <NavBarScene />
            <View style={{ marginTop: 25 }}>
                <Text style={globalStyles.lgTxt}>
                    User stats
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={globalStyles.mdTxt}>
                    Total Tasks: <Text >{userTasks.length}</Text>
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={globalStyles.mdTxt}>
                    Completed Tasks: <Text >{userTasks.filter((dt) => dt.status === "done").length}</Text>
                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => onLogoutClick()}>
                    <Text style={globalStyles.logoutBtn}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}