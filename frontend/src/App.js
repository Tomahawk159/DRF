import { LoginForm } from "./components/Auth";
import Cookies from "universal-cookie";
import { Header } from "./components/Header";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Footer } from "./components/Footer";
import { ProjectCreatingForm } from "./components/projects/ProjectCreatingForm";
import { TaskCreatingForm } from "./components/tasks/TaskCreatingForm";


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

export const ROW_PER_PAGE_USERS = 17
export const ROW_PER_PAGE_PROJECTS = 8
export const ROW_PER_PAGE_TASKS = 15


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'tasks': [],
      'projects': [],
      'token': '',
    };
  }

  setToken(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.loadData())
  }
  setUsername(username) {
    const cookies = new Cookies()
    cookies.set('username', username)
  }

  getUsername() {
    const cookies = new Cookies()
    return cookies.get('username')
  }


  isAuthenticated() {
    return this.state.token !== ''
  }
  logout() {
    this.setToken('')
    this.setUsername('')
  }
  getTokenFromStorage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.loadData())
  }
  getToken(username, password) {
    axios.post(
      'http://127.0.0.1:8000/api-auth-token/',
      { username: username, password: password }
    ).then(response => {
      this.setToken(response.data['token'])
      this.setUsername(username)
    }).catch(error => alert(error))
  }

  getHeaders() {
    let headers = {
      'Content-Type': 'application/json',
    }
    if (this.isAuthenticated()) {
      headers['Authorization'] = 'Token' + this.state.token
    }
    return headers
  }
  _sendAxiosGetRequest(url, state_param) {
    const headers = this.getHeaders()
    axios.get(url, { headers })
      .then(response => {
        const object = response.data.results
        this.setState(
          {
            [state_param]: object
          }
        )
      }).catch(error => console.log(error))
  }

  deleteProject(id) {
    const headers = this.getHeaders()
    console.log(headers)
    axios.delete(`http://127.0.0.1:8000/projects/${id}`, { headers })
      .then(response => {
        this.setState({ 'projects': this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  deleteTask(id) {
    const headers = this.getHeaders()
    console.log(headers)
    axios.delete(`http://127.0.0.1:8000/TODO/${id}`, { headers })
      .then(response => {
        this.setState({ 'tasks': this.state.tasks.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  createProject(user, name, repoLink) {
    const headers = this.getHeaders()
    const data = { name: name, users: [user], repoLink: repoLink }
    axios.post(`http://127.0.0.1:8000/projects/`, data, { headers })
      .then(response => {
        let new_project = response.data
        this.setState({ projects: [...this.state.projects, new_project] })
      }).catch(error => console.log(error))
  }

  createTask(name, creator, project, body) {
    const headers = this.getHeaders()
    const data = { name: name, creator: creator, project: project, body: body }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/TODO/`, data, { headers })
      .then(response => {
        let new_task = response.data
        this.setState({ tasks: [...this.state.tasks, new_task] })
      }).catch(error => console.log(error))
  }


  loadData() {
    this._sendAxiosGetRequest('http://127.0.0.1:8000/users/?limit=100', 'users')
    this._sendAxiosGetRequest('http://127.0.0.1:8000/TODO/?limit=100', 'tasks')
    this._sendAxiosGetRequest('http://127.0.0.1:8000/projects/?limit=100', 'projects')
  }

  componentDidMount() {
    this.getTokenFromStorage()
  }
  render() {
    return (
      <BrowserRouter>
        <Grid sx={{ display: "flex", flexDirection: "column", minHeight: "97vh" }}>
          <GridItem>
            <Header isAuthenticated={() => this.isAuthenticated()} getUsername={() => this.getUsername()}
              logout={() => this.logout()} />
          </GridItem>
          <GridItem>
            <Container sx={{ paddingBottom: "100", marginTop: "10", maxWidth: "70em", textAlign: "center" }}>

              <Switch>
                {/*user routes*/}
                <Route exact path="/"
                  component={() => <UserList users={this.state.users}
                  />} />
                <Route exact path="/users/:id"
                  component={() => <UserDetail users={this.state.users}
                    projects={this.state.projects} />} />
                {/*project routes*/}
                <Route exact path="/projects/create"
                  component={() => <ProjectCreatingForm users={this.state.users}
                    createProject={(user, name, repoLink) => this.createProject(user, name, repoLink)} />} />


                <Route exact path="/projects"
                  component={() => <ProjectList users={this.state.users}
                    items={this.state.projects}
                    tasks={this.state.tasks} />} />
                <Route exact path="/projects/:id"
                  component={() => <ProjectDetail users={this.state.users}
                    items={this.state.projects}
                    tasks={this.state.tasks}
                    deleteProject={(id) => this.deleteProject(id)} />} />
                {/*task routes*/}
                <Route exact path="/tasks"
                  component={() => <TaskList users={this.state.users}
                    projects={this.state.projects}
                    items={this.state.tasks} />} />
                <Route exact path="/tasks/create"
                  component={() => <TaskCreatingForm users={this.state.users}
                    projects={this.state.projects}
                    createTask={(name, creator, project, body) => this.createTask(name, creator, project, body)}
                  />} />
                <Route exact path="/tasks/:id"
                  component={() => <TaskDetail users={this.state.users}
                    projects={this.state.projects}
                    items={this.state.tasks}
                    deleteTask={(id) => this.deleteTask(id)}
                  />} />

                {/*other*/}
                <Route exact path='/login' component={() => <LoginForm
                  get_token={(username, password) => this.getToken(username, password)}
                  isAuth={() => this.isAuthenticated()} />} />

                <Redirect from="/users" to="/" />
                <Route component={NotFound404} />
              </Switch>

            </Container>
          </GridItem>
          <GridItem
            sx={{ position: "absolute", height: "30px", bottom: "0", left: "0", right: "0" }}>
            <Footer />
          </GridItem>
        </Grid>
      </BrowserRouter>
    )
  }
}
export default App;