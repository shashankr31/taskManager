import { SafeAreaView, TouchableOpacity, Modal, View, Text, TextInput, Button } from 'react-native';
import { globalStyles } from '../Constants/Stylesheets';


export default function UpdateTaskModal(props) {


    return (
        <SafeAreaView >
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.isModalVisible}
                onRequestClose={props.toggleModal}
            >
                <View style={{ flex: 1 }}>
                    {/* Overlay background */}
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}
                        onPress={props.toggleModal}
                    >
                        {/* Modal content */}
                        <View
                            style={{
                                backgroundColor: '#F7F7F7',
                                width: '85%',
                                padding: 20,
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>
                                Update Task
                            </Text>
                            <TextInput
                                style={{ height: 40, borderColor: '#DBDBDB', borderWidth: 1, marginBottom: 12, marginTop: 12 }}
                                placeholder="Enter task"
                                value={props.taskText}
                                onChangeText={text => props.setTaskText(text)}
                            />
                            <Text>
                                {props.msg}
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Button title="Update Task" onPress={props.onEditTaskPress} />
                                <Button title="Delete" color={"red"} onPress={props.onDeleteTaskPress} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
