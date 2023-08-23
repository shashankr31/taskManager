import { create } from 'zustand'

const initialState = {
    backendPort: "http://192.168.29.83:5000",
    theme: "light",
    userId: "",
    userData: [],
    userTasks: [],

}
const useGlobalData = create((set, get) => ({
    backendPort: initialState.backendPort,
    theme: initialState.theme,
    userId: initialState.userId,
    userData: initialState.userData,
    userTasks: initialState.userTasks,

    globalInitialUpdateData: (data) => {
        set((state) => ({ ...state, userData: data, userTasks: data.tasks }))
    },

    globalUserIdUpdate: (id) => {
        set((state) => ({ ...state, userId: id }))
    },

    globalAddTask: (task) => {
        let previosTasks = get().userTasks;
        let temp = [...previosTasks, ...task]
        set((state) => ({ ...state, userTasks: temp }))
    },

    globalUpdateTask: (updatedTask) => {
        set((state) => {
            const updatedTasks = state.userTasks.map(task => {
                if (task._id === updatedTask._id) {
                    return { ...task, name: updatedTask.name, status: updatedTask.status };
                }
                return task;
            });

            return { ...state, userTasks: updatedTasks };
        });
    },

    globalDeleteTask: (deletedTask) => {
        set((state) => ({
            ...state,
            userTasks: state.userTasks.filter(task => task._id !== deletedTask._id),
        }));
    },
}))

export default useGlobalData;