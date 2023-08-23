import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { globalStyles } from '../Constants/Stylesheets'
import doneImage from '../../../assets/done.png';
import notDoneImage from '../../../assets/notdone.png';
import { useState } from 'react';
import UpdateTaskModal from './UpdateTaskModal';
import useGlobalData from '../../stateManagement/GlobalData';
import axios from 'axios';

export default function IndivisualTask(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState(props.name);
    const [status, setStatus] = useState(props.taskStatus);
    const [msg, setMsg] = useState("")

    const { userId, backendPort, globalUpdateTask, globalDeleteTask } = useGlobalData();

    const toggleModal = () => {
        setMsg("")
        setModalVisible(!isModalVisible);
    };

    const onEditTaskPress = (taskStatus) => {
        let payload = {
            userId: userId,
            taskId: props.taskId,
            task: taskText,
            status: taskStatus ? taskStatus : status
        }
        axios.post(`${backendPort}/users/updateTask`, payload)
            .then((res) => {
                setMsg(res.data.message)
                if (res.data.task) {
                    globalUpdateTask(res.data.task); // Update global data
                    setMsg("")
                    setModalVisible(false);
                }
            })
            .catch((err) => {
                setMsg(err.message)
            })
    }

    const onDeleteTaskPress = () => {
        let payload = {
            userId: userId,
            taskId: props.taskId,
        };
        console.log('dsadsa');
        axios.post(`${backendPort}/users/deleteTask`, payload)
            .then((res) => {
                setMsg(res.data.message);
                if (res.data.task) {
                    globalDeleteTask(res.data.task); // Update global data
                    toggleModal();
                }
            })
            .catch((err) => {
                setMsg(err.message);
            });
    }

    const onUpdateTask = () => {
        setModalVisible(true)
    }
    return (
        <SafeAreaView
            key={props.taskId}
            style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 25,
                borderBottomWidth: 1,
                borderColor: "#e3e3e3",
                paddingVertical: 10, // Added padding for better spacing
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    let tempStatus = props.taskStatus === "done" ? "pending" : "done"
                    setStatus(tempStatus)
                    onEditTaskPress(tempStatus)
                }}>
                    <Image
                        style={{ width: 20, height: 20, marginRight: 10 }}
                        source={props.taskStatus === "done" ? doneImage : notDoneImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onUpdateTask()}>
                    <Text style={globalStyles.taskText}>
                        {props.name}
                    </Text>
                </TouchableOpacity>

            </View>

            {
                isModalVisible ? <UpdateTaskModal
                    toggleModal={toggleModal}
                    taskText={taskText}
                    setTaskText={setTaskText}
                    onEditTaskPress={onEditTaskPress}
                    onDeleteTaskPress={onDeleteTaskPress}
                    msg={msg}
                /> : ""
            }

            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                {/* <TouchableOpacity onPress={() => onDeleteTaskPress()}>
            <Image
                style={{ width: 40, height: 40 }}
                source={require('../../../assets/edit.png')}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEditTaskPress()}>
            <Image
                style={{ width: 40, height: 40, marginLeft: 10 }}
                source={require('../../../assets/delete.png')}
            />
        </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}