import './App.css';
import React,{Component} from 'react';
import { Button,Menu } from 'semantic-ui-react'
import NewTrip from "./js/NewTrip"
import ShowTrip from "./js/ShowTrip"
import UserLogin from "./js/UserLogin"
import {Outlet, Link} from 'react-router-dom'

let baseURL = process.env.REACT_APP_BASEURL

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      showModalOpen: true,
      editModalOpen: false,
      userLoggedIn: false,
    }
  }  
  

  componentDidMount(){
    if(this.state.userLoggedIn){
      this.getTrips()
    }
  }

  render(){
  return (
    <div className="App">
      <Menu size='small'>
        <Menu.Item
          name='home'
        />
        <Menu.Item
          name='messages'
        />
        <Menu.Item size='medium'
          name='Life on the Node'
          />


        <Menu.Menu position='right'>
          <Menu.Item>
            <Link 
              to="lotn"
            ><Button> Log In or Sign Up</Button></Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Outlet/>
    </div>
  );}
}

export default App;
