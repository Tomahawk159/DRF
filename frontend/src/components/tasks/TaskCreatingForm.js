import React from 'react';
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export class TaskCreatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": '',
            'creator': this.props?.users[0]?.id,
            'project': this.props?.projects?.id,
            'body': ''
        }
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log(this.state)
        this.props.createTask(this.state.name, this.state.creator, this.state.project, this.state.body)
        event.preventDefault()
    }

    render() {
        return (
            <Box justifyContent='center' sx={{ maxWidth: '30%', margin: '0 auto' }}>
                <h1 style={{ marginBottom: "30px" }}>Creating task</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormControl>
                        <FormLabel sx={{ textAlign: "center" }}>Name</FormLabel>
                        <Input sx={{ marginBottom: "10px", border: "1px solid teal", textAlign: "center" }}
                            type="text" value={this.state.name} name="name" placeholder="name"
                            onChange={(event) => this.handleChange(event)} />

                        <FormLabel sx={{ textAlign: "center" }}>Creator</FormLabel>
                        <Select name="creator" className='form-control' onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option
                                value={item.id}>{item.username}</option>)}
                        </Select>

                        <FormLabel sx={{ textAlign: "center" }}>Project</FormLabel>
                        <Select name="project" className='form-control' onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) => <option
                                value={item.id}>{item.name}</option>)}
                        </Select>

                        <FormLabel sx={{ textAlign: "center" }}>Body</FormLabel>
                        <Input sx={{ marginBottom: "10px", border: "1px solid teal", textAlign: "center" }}
                            type="text" value={this.state.repoLink} name="body" placeholder="Task body"
                            onChange={(event) => this.handleChange(event)} />
                        <Input sx={{ border: "1px solid teal", backgroundColor: "teal" }} type="submit" value="Create!" />
                    </FormControl>
                </form>
            </Box>
        );
    }
}
