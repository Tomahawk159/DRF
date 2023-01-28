import './App.css';
import React from 'react';
import axios from "axios";
import { UserList } from "./components/Users";
import { ProjectList } from "./components/Projects";
import { TaskList } from "./components/Tasks";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { ProjectDetail } from "./components/ProjectDetail";
import UserDetail from "./components/UserDetail";
import { TaskDetail } from "./components/TaskDetail";
import { v4 } from 'uuid';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'tasks': [],
      'projects': [],
    };
  }
  _send_axios_get_request(url, state_param) {
    axios.get(url)
      .then(response => {
        const object = response.data.results
        this.setState(
          {
            [state_param]: object
          }
        )
      }).catch(error => console.log(error))
  }

  load_data() {
    this._send_axios_get_request('http://127.0.0.1:8000/users', 'users')
    this._send_axios_get_request('http://127.0.0.1:8000/TODO', 'tasks')
    this._send_axios_get_request('http://127.0.0.1:8000/projects', 'projects')
  }

  componentDidMount() {
    this.load_data()
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">Users</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/"
              component={() => <UserList key={v4()} users={this.state.users}
                projects={this.state.projects} />} />
            <Route exact path="/users/:id"
              component={() => <UserDetail users={this.state.users} projects={this.state.projects} />} />
            <Route exact path="/projects"
              component={() => <ProjectList items={this.state.projects} tasks={this.state.tasks} />} />
            <Route exact path="/projects/:id"
              component={() => <ProjectDetail items={this.state.projects} tasks={this.state.tasks} />} />
            <Route exact path="/tasks" component={() => <TaskList items={this.state.tasks} />} />
            <Route exact path="/tasks/:id" component={() => <TaskDetail items={this.state.tasks} />} />
            <Redirect from="/users" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
