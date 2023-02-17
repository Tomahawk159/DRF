import React from 'react';
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export class ProjectCreatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": '',
            'user': this.props?.users[0]?.id,
            'repoLink': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.user, this.state.name, this.state.repoLink)
        event.preventDefault()
    }

    render() {
        return (
            <Box justifyContent='center' sx={{ maxWidth: '30%', margin: '0 auto' }}>
                <h1 style={{ marginBottom: "30px" }}>Creating project</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormControl>
                        <FormLabel sx={{ textAlign: "center" }}>Name</FormLabel>
                        <Input sx={{ marginBottom: "10px", border: "1px solid teal", textAlign: "center" }}
                            type="text" value={this.state.name} name="name" placeholder="name"
                            onChange={(event) => this.handleChange(event)} />

                        <FormLabel sx={{ textAlign: "center" }}>Owner</FormLabel>
                        <Select name="user" className='form-control' onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option
                                value={item.id}>{item.username}</option>)}
                        </Select>

                        <FormLabel sx={{ textAlign: "center" }}>repoLink</FormLabel>
                        <Input sx={{ marginBottom: "10px", border: "1px solid teal", textAlign: "center" }}
                            type="text" value={this.state.repoLink} name="repoLink" placeholder="repoLink"
                            onChange={(event) => this.handleChange(event)} />
                        <Input sx={{ border: "1px solid teal", backgroundColor: "teal" }} type="submit" value="Create!" />
                    </FormControl>
                </form>
            </Box>
        );
    }
}
