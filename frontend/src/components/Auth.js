import React from "react";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { login: '', password: '' }
    }

    handleChange(event) {
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }


    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" value={this.state.login} name="login" placeholder="login"
                    onChange={(event) => this.handleChange(event)} />
                <input type="password" value={this.state.password} name="password" placeholder="password"
                    onChange={(event) => this.handleChange(event)} />
                <input type="submit" value="login" />
            </form>
        )
    }
}
