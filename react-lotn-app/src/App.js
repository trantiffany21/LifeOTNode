import './App.css';
import React,{ Component } from 'react';
import { Button } from 'semantic-ui-react'
import NewTrip from "./js/NewTrip"
import ShowTrip from "./js/ShowTrip"
import UserLogin from "./js/UserLogin"

let baseURL = 'http://localhost:8000/'

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      trips: [],
      showModalOpen: true,
      editModalOpen: false,
      userLoggedIn: false,
      userFormType: "",
      username: "",
      id: "",
      email: ""
    }
  }  
  getTrips = () =>{
    fetch(baseURL + "trips/",{credentials: "include"})
    .then(res => {
      return res.json()
    }).then(data => {
      this.setState({
        trips: data.data
      })
    })
  }

  addTrips = (newTrip) =>{
    console.log("newtrip: " + newTrip)
    const copyTrips = [...this.state.trips]
    copyTrips.push(newTrip)
    this.setState({
      trips: copyTrips
    })
  }
  setTrips = (trips) =>{
    this.setState({
      trips:trips
    })
  }

  setUserForm = (type)=>{
    this.setState({
      userFormType: type
    })
  }

  setUser = (user) =>{
    this.setState({
      userLoggedIn: true,
      username: user.username,
      id: user.id,
      email: user.email
    })
    this.getTrips()
  }
  clearUser = () =>{
    this.setState({
      userLoggedIn: false,
      userFormType: "",
      username: "",
      id: "",
      email: ""
    })
  }

  componentDidMount(){
    if(this.state.userLoggedIn){
      this.getTrips()
    }
  }

  render(){
  return (
    <div className="App">
      <h1>Trip App</h1>
      {!this.state.userLoggedIn &&
          <>
          <Button primary compact className="" onClick={() => this.setUserForm("register")}>Register</Button>
          <Button secondary compact className="" onClick={() => this.setUserForm("login")}>Login</Button>
          </>
      }
      {this.state.userLoggedIn &&
          <>
          <Button className="" onClick={() => this.clearUser()}>Logout</Button>
          </>
      }
        <UserLogin baseURL={baseURL} userFormType={this.state.userFormType} setUserForm={this.setUserForm} setUser={this.setUser}/>
      
      {this.state.userLoggedIn && 
        <>
          <NewTrip baseURL={baseURL} addTrips={this.addTrips} />
          <ShowTrip trips={this.state.trips} baseURL={baseURL} setTrips={this.setTrips}/>
        </>
      }
      
    </div>
  );}
}

export default App;
