import React from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import { Button, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";


export const TaskDetail = ({ items, users, projects, deleteTask }) => {
    const { id } = useParams()
    const task = items.filter(item => String(item.id) === id)[0]
    const creator = users.find(user => user?.id === task?.creator)
    const project = projects.find(project => project?.id === task?.project)
    return (
        !_.isEmpty(task) ?
            <SimpleGrid>
                <Stack textAlign={'left'} maxW={["80%"]} pl={[null, null, "20", "40"]}>
                    <Heading>
                        Task number: {task.taskNumber}
                    </Heading>
                    <Text>
                        <strong>Name:</strong> {task.name}
                    </Text>
                    <Text>
                        <strong>Creator:</strong> <Link className='customLink'
                            to={`/users/${creator.id}`}>{creator?.username}</Link>
                    </Text>
                    <Text>
                        <strong>Project:</strong> <Link className='customLink'
                            to={`/projects/${project?.id}`}>{project?.name}</Link>
                    </Text>
                    <Text>
                        <strong>Task body:</strong> {task.body}
                    </Text>
                    <Text>
                        <strong>Created at:</strong> {task.createdAt.slice(0, 10)}
                    </Text>
                    <Text>
                        <strong>Is active:</strong> {task.isActive ? 'Yes' : 'No'}
                    </Text>
                    <Link to={`/tasks/`}>
                        <Button onClick={() => deleteTask(task.id)} type='button'>Delete</Button>
                    </Link>
                    <Link to={`/tasks/`}>
                        <Button>Back to tasks list</Button>
                    </Link>
                </Stack>
            </SimpleGrid>
            :

            <h4>Ooops, such task not found!</h4>
    )
}