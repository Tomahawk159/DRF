import React from 'react';
import './App.css';
import axios from 'axios'
import UserList from './components/User';
import MenuList from './components/Menu';
import FooterList from './components/Footer';
import ProjectList from './components/Project';
import TaskList from './components/Task';
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'menu': [],
      'footer': [],
      'project': [],
      'task': []
    }
  }


  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data
        const projects = response.data
        const tasks = response.data
        this.setState(
          {
            'users': users,
            'projects': projects,
            'tasks': tasks
          }
        )
      }).catch(error => console.log(error))

    this.state.menu = [
      {
        name: 'Elem_1',
        link: '#'
      },
      {
        name: 'Elem_2',
        link: '#'
      },
      {
        name: 'Elem_3',
        link: '#'
      }
    ]

    this.state.footer = [
      {
        name: 'Elem_1',
        link: '#'
      },
      {
        name: 'Elem_2',
        link: '#'
      },
      {
        name: 'Elem_3',
        link: '#'
      }
    ]
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
              component={() => <UserList users={this.state.users} projects={this.state.projects} />} />
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
        </div >
      </BrowserRouter >
    )
  }
}


export default App;
