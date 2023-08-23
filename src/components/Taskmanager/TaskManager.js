import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity, Image, Modal, ScrollView, FlatList, SectionList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { globalStyles } from '../Constants/Stylesheets';
import useGlobalData from '../../stateManagement/GlobalData';
import Addimg from '../../../assets/Add.svg';
import AddTaskModal from './AddTaskModal';
import NavBarScene from '../NavBar';
import IndivisualTask from './IndivisualTask';
import RNPickerSelect from 'react-native-picker-select';
export default function TaskManager() {
    const [inputFields, setInputFields] = useState({})
    const [msg, setMsg] = useState("")
    const { backendPort, userData, globalInitialUpdateData, userId, globalAddTask, userTasks } = useGlobalData()
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [searchTxt, setSearchTxt] = useState('');

    const [filteredData, setFilteredData] = useState(userTasks)
    const [filterStatus, setFilterStatus] = useState(null); // Initially no option is selected

    const onChangeTxt = (key, value) => {
        setInputFields({ ...inputFields, [key]: value });
    }

    useEffect(() => {
        axios.get(`${backendPort}/users/getInitialData?userId=${userId}`)
            .then((res) => {
                globalInitialUpdateData(res.data)
                setFilteredData(res.data.tasks)
            })
            .catch((err) => {

            })
    }, [])

    const toggleModal = () => {
        setMsg("")
        setModalVisible(!isModalVisible);
    };

    const handleAddTask = () => {
        let payload = {
            task: taskText,
            userId: userId
        }
        if (taskText === "") {
            setMsg("Please enter task")
        }
        else {
            axios.post(`${backendPort}/users/addTask`, payload)
                .then((res) => {
                    console.log('Task added:', res.data.task);
                    globalAddTask([res.data.task])
                    toggleModal();
                    setTaskText("")
                    setMsg("Added Task")
                })
                .catch((err) => {

                })
        }
    };

    useEffect(() => {
        onSearchChange("")
    }, [userTasks, filterStatus])

    const onSearchChange = (text) => {
        // setSearchTxt(text);
        // const filteredTasks = userTasks.filter((task) => {
        //     return task.name.toLowerCase().includes(text.toLowerCase());
        // });
        // setFilteredData(filteredTasks);
        setSearchTxt(text);

        const filteredTasks = userTasks.filter((task) => {
            return (
                task.name.toLowerCase().includes(text.toLowerCase()) &&
                (!filterStatus || filterStatus === 'all' || task.status === filterStatus)
            );
        });
        setFilteredData(filteredTasks);
    }

    const handleStatusChange = (value) => {
        setFilterStatus(value);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <NavBarScene />
            {
                userTasks != undefined && userTasks.length > 0 ? <View >
                    <View style={{ padding: 15 }}>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TextInput
                                    style={{ height: 45, borderColor: '#DBDBDB', borderWidth: 1, flex: 1, paddingLeft: 10 }}
                                    onChangeText={text => {
                                        onSearchChange(text)
                                    }}
                                    placeholder="Search Task"
                                />
                                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => toggleModal()}>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={require('../../../assets/Add.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                            <Text style={globalStyles.headlineTxt}>
                                All Tasks
                            </Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select status', value: null }}
                                value={filterStatus}
                                onValueChange={handleStatusChange}
                                items={[
                                    { label: 'All', value: null },
                                    { label: 'Done', value: 'done' },
                                    { label: 'Pending', value: 'pending' },
                                ]}
                            />
                        </View>
                        <ScrollView >
                            <View style={{ height: 1700 }}>
                                {filteredData.map((dt, i) => (
                                    <IndivisualTask name={dt.name} key={i} taskStatus={dt.status} taskId={dt._id} />
                                ))}

                            </View>
                        </ScrollView>

                    </View>

                </View> :

                    <View style={{ marginTop: 25, display: "flex", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, color: "lightgray" }}>
                            No Tasks found
                        </Text>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => toggleModal()}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../../../assets/Add.png')}
                            />
                        </TouchableOpacity>

                    </View>
            }

            <AddTaskModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                setTaskText={setTaskText}
                handleAddTask={handleAddTask}
                msg={msg}
                setMsg={setMsg}
            />

        </SafeAreaView>
    );
}
