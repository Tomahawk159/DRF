import React from "react";
import { Link } from "react-router-dom";


export const UserItem = ({ user }) => {
    return (
        <div><Link to={`/users/${user.id}`}>{user.username}</Link></div>
    )
}

export const TaskItem = ({ task }) => {
    return (
        <div><Link to={`/tasks/${task.id}`}>{task.number}:{task.body}</Link></div>
    )
}
export const ProjectItem = ({ item, tasks }) => {
    let projectTasks = tasks.filter(task => task.project.name === item.name)
    return (<tr>
        <td><Link to={`/projects/${item.id}`}>{item.id}</Link></td>
        <td>{item.number}</td>
        <td>{item.name}</td>
        <td>{item.users.map(user => <UserItem user={user} />)}</td>
        <td><a href={item.repoLink}>{item.repoLink}</a></td>
        <td>{item.createdAt}</td>
        <td>{projectTasks.map(task => <TaskItem task={task} />)}</td>
    </tr>)
}



export const ProjectList = ({ items, tasks }) => {
    const columnNames = ['Id', 'Number', 'Name', 'Users', 'Repository link', 'Created at', 'Tasks']
    return (
        <table className='body'>
            <thead>
                <tr>
                    {columnNames.map(item => <th>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {items.map((item) => <ProjectItem item={item} tasks={tasks} />)}
            </tbody>
        </table>)
}

export default ProjectList