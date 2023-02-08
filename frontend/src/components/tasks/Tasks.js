import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useTable } from "../../hooks/useTable";
import { ROW_PER_PAGE_TASKS } from "../../App";
import { TableFooter } from "../tableFooter/tableFooter";

const TASK_COLUMN_NAMES = ['Number', 'Name', 'Creator', 'Project', 'Created at', 'Is active']

const TaskItem = ({ item, users, projects }) => {
    const creator = users.find(user => user?.id === item?.creator)
    const project = projects.find(project => project?.id === item?.project)
    return (
        <Tr>
            <Td sx={{ textAlign: "center" }}><Link to={`/tasks/${item.id}`} className='customLink'>{item.taskNumber}</Link></Td>
            <Td sx={{ textAlign: "center" }}>{item.name}</Td>
            <Td sx={{ textAlign: "center" }}><Link to={`/users/${creator.id}`} className='customLink'>{creator.username}</Link></Td>
            <Td sx={{ textAlign: "center" }}><Link to={`/projects/${project.id}`} className='customLink'>{project.name}</Link></Td>
            <Td sx={{ textAlign: "center" }}>{item.createdAt.slice(0, 10)}</Td>
            <Td sx={{ textAlign: "center" }}>{item.isActive ? 'Yes' : 'No'}</Td>
        </Tr>
    )
}

export const TaskList = ({ items, users, projects }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(items, page, ROW_PER_PAGE_TASKS);
    return (
        <TableContainer>
            <Link to='/tasks/create'><Button sx={{ backgroundColor: "teal" }}>Create</Button></Link>
            <Table variant='simple' colorScheme='blackAlpha' size='sm'>
                <TableCaption>Tasks list</TableCaption>
                <Thead>
                    <Tr>
                        {TASK_COLUMN_NAMES.map(item => <Th sx={{ textAlign: "center" }}>{item}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {slice.map((item) => <TaskItem users={users} projects={projects} item={item} key={item.id} />)}
                </Tbody>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </TableContainer>
    )
}