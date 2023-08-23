import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        padding: 10
        // justifyContent: 'center',
    },
    input: {
        height: 40,
        width: "100%",
        marginBottom: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        paddingLeft:10
    },
    primaryButton: {
        height: 40,
        width: 150,
        backgroundColor: "#3d88ff",
        borderRadius: 10,
        display: "flex",
        alignItems: 'center',
        justifyContent: "center"
    },
    contentCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    profileLogo: {
        backgroundColor: "blue",
        color: "white",
        width: 50,
        height: 50,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    headlineTxt: {
        fontSize: 24,
        fontWeight: "700",

    },
    taskText: {
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 5,
        flex: 1,
        display: "flex",
        flexWrap: "wrap"
    },
    warningTxt: {
        fontSize: 16,
        color: "red",
    },
    lgTxt: {
        fontSize: 24,
        fontWeight: "600"
    },
    mdTxt: {
        fontSize: 20,
        marginBottom: 10,
    },
    logoutBtn: {
        fontSize: 20,
        marginTop: 15,
        color: "gray"
    },
    prmBtn:{
        backgroundColor:""
    }
});