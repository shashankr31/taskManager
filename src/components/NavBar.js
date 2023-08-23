import { View, Text, TouchableOpacity } from 'react-native'
import { globalStyles } from './Constants/Stylesheets'
import useGlobalData from '../stateManagement/GlobalData'
import { useNavigation } from '@react-navigation/native'

export default function NavBarScene() {
    const { userData } = useGlobalData()
    const navigation = useNavigation()
    return (
        <View style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e3e3e3", justifyContent: 'space-between' }}>
            {
                userData.userName != undefined ? <>
                    <View >

                        <Text style={{ fontSize: 24, marginLeft: 10 }}>Welcome, {userData.userName}</Text>
                    </View>
                    <View style={globalStyles.profileLogo}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("profile")
                        }}>
                            <Text style={{ color: 'white', fontSize: 26 }}>{userData.userName.split("")[0]}</Text>
                        </TouchableOpacity>
                    </View>
                </> : ""
            }
        </View>
    )
}