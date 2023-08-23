import { SafeAreaView, TouchableOpacity, Modal, View, Text, TextInput, Button } from 'react-native';
import { globalStyles } from '../Constants/Stylesheets';


export default function AddTaskModal(props) {


    return (
        <SafeAreaView style={globalStyles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.isModalVisible}
                onRequestClose={props.toggleModal}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}
                        onPress={props.toggleModal}
                    >
                        <View
                            style={{
                                backgroundColor: '#F7F7F7',
                                width: '85%',
                                padding: 20,
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>
                                Add Task
                            </Text>
                            <TextInput
                                style={{ height: 40, borderColor: '#DBDBDB', borderWidth: 1, marginBottom: 12, marginTop: 12, paddingLeft: 10 }}
                                placeholder="Enter task"
                                onChangeText={text => {
                                    props.setMsg("")
                                    props.setTaskText(text)
                                }}
                            />
                            <Text style={globalStyles.warningTxt}>
                                {props.msg}
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Button title="Add Task" onPress={props.handleAddTask} />
                                <Button title="Close" color={"red"} onPress={props.toggleModal} />
                            </View>

                        </View>
                    </TouchableOpacity>

                </View>
            </Modal>
        </SafeAreaView>
    );
}
