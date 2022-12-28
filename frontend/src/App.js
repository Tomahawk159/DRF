import React from 'react';
import './App.css';
import axios from 'axios'
import UserList from './components/User';
import MenuList from './components/Menu';
import FooterList from './components/Footer';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'menu': [],
      'footer': []
    }
  }


  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
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
      <div>
        <MenuList elems={this.state.menu} />
        <UserList users={this.state.users} />
        <FooterList elems={this.state.footer} />
      </div>
    )
  }
}

export default App;
