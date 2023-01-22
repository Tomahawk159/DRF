import React from 'react'


const TaskItem = ({ task }) => {
    return (
        <tr>
            <td>
                {task.project}
            </td>
            <td>
                {task.creator}
            </td>
            <td>

                {task.text}
            </td>
        </tr>
    )
}

const TaskList = ({ tasks }) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Creator
            </th>
            <th>
                Text
            </th>
            {tasks.map((task) => <TaskItem task={task} />)}
        </table>
    )
}
export default TaskList;
