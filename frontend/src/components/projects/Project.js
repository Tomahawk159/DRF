import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useTable } from "../../hooks/useTable";
import { ROW_PER_PAGE_PROJECTS } from "../../App";
import { TableFooter } from "../tableFooter/tableFooter";


export const PROJECT_COLUMN_NAMES = ['Number', 'Name', 'Users', 'Repository link', 'Created at', 'Tasks']

export const UserItem = ({ user }) => {
    return (
        <p><Link to={`/users/${user.id}`} className='customLink'>{user.username}</Link></p>
    )
}

export const TaskItem = ({ task }) => {
    return (
        <p><Link to={`/tasks/${task.id}`} className='customLink'> - {task.taskNumber}</Link></p>
    )
}

export const ProjectItem = ({ item, tasks, users }) => {
    let projectTasks = tasks.filter(task => task.project === item?.id).slice(0, 3)
    let projectUsers = users.filter(user => item.users?.includes(user.id)).slice(0, 3)
    return (
        <Tr>
            <Td sx={{ textAlign: "center" }}><Link className='customLink'
                to={`/projects/${item.id}`}>{item.projectNumber}</Link></Td>
            <Td sx={{ textAlign: "center" }}>{item.name}</Td>
            <Td sx={{ textAlign: "center" }}>{projectUsers.map(user => <UserItem user={user} key={user.id} />)}</Td>
            <Td sx={{ textAlign: "center" }}><a href={item.repoLink}>{item.repoLink}</a></Td>
            <Td sx={{ textAlign: "center" }}>{item.createdAt.slice(0, 10)}</Td>
            <Td sx={{ textAlign: "center" }}>{projectTasks.map(task => <TaskItem task={task} key={task.id} />)}</Td>
        </Tr>
    )
}


export const ProjectList = ({ items, tasks, users }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(items, page, ROW_PER_PAGE_PROJECTS);
    return (
        <TableContainer>
            <Link to='/projects/create'><Button sx={{ backgroundColor: "teal" }}>Create</Button></Link>
            <Table variant='simple' colorScheme='blackAlpha' size='sm'>
                <TableCaption>Projects list</TableCaption>
                <Thead>
                    <Tr>
                        {PROJECT_COLUMN_NAMES.map(item => <Th sx={{ textAlign: "center" }}>{item}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {slice.map((item) => <ProjectItem users={users} item={item} tasks={tasks} key={item.id} />)}
                </Tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </TableContainer>
    )
}
