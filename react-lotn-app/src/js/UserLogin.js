import React, { Component } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import { Form, Input, Button } from 'semantic-ui-react'
import NewTrip from './NewTrip'
import ShowTrip from './ShowTrip'

let baseURL = process.env.REACT_APP_BASEURL

export default class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trips: [],
            userFormType: "",
            userId: "",
            username: "",
            email: "",
            password: "",
            userLoggedIn: false,
            newTripItem: false
        }
    }
    getTrips = () => {
        fetch(baseURL + "trips/", { credentials: "include" })
            .then(res => {
                return res.json()
            }).then(data => {
                this.setState({
                    trips: data.data
                })
                console.log("trips: " + this.state.trips)
            })
    }

    addTrips = (newTrip) => {
        console.log("newtrip: " + newTrip)
        const copyTrips = [...this.state.trips]
        copyTrips.push(newTrip)
        this.setState({
            trips: copyTrips
        })
    }
    setTrips = (trips) => {
        this.setState({
            trips: trips
        })
    }
    setUserForm = (type) => {
        this.setState({
            userFormType: type
        })
    }

    setUser = (user) => {
        this.setState({
            userLoggedIn: true,
            username: user.username,
            userId: user.id,
            email: user.email
        })
        this.getTrips()
    }
    clearUser = () => {
        this.setState({
            userLoggedIn: false,
            userFormType: "",
            username: "",
            userId: "",
            email: ""
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log(this.state.username)
        console.log(this.state.email)
        console.log(this.state.password)
        event.preventDefault()
        const regUrl = baseURL + 'auth/' + 'register'
        fetch(regUrl, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.status === 201) {
                this.setUser(data.data)
                this.setUserForm("")
            }
        }).catch(error => console.error({ 'Error': error }))
    }

    handleLogin = (event) => {
        console.log(this.state.username)
        console.log(this.state.email)
        console.log(this.state.password)
        event.preventDefault()
        fetch(baseURL + 'auth' + '/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.status === 200) {
                this.setUser(data.data)
                this.setUserForm("")
            }
        }).catch(error => console.error({ 'Error': error }))
    }
    setNewTripItem = () => {
        this.setState({newTripItem: !this.state.newTripItem})
    }

    render() {
        if (this.state.userLoggedIn) {
            return(
            <>
                <ShowTrip trips={this.state.trips} baseURL={baseURL} setTrips={this.setTrips}/>
                <Button onClick={()=> this.setNewTripItem()}>+ New Trip</Button>
                {this.state.newTripItem &&
                    <NewTrip userId={this.state.userId} baseURL={baseURL} addTrips={this.addTrips} />
                }
            </>)
        } else {
            return (
                <div className="UserContainer">
                    <Button primary compact className="" onClick={() => this.setUserForm("register")}>Register</Button>
                    <Button secondary compact className="" onClick={() => this.setUserForm("login")}>Login</Button>
                    {
                        this.state.userFormType === "register" &&
                        <Form className="" onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    onChange={(e) => this.handleChange(e)}
                                    id='form-input-control-username'
                                    control={Input}
                                    name="username"
                                    label='Username'
                                    placeholder='Enter Username'
                                />
                                <Form.Field
                                    onChange={(e) => this.handleChange(e)}
                                    id='form-input-control-email'
                                    control={Input}
                                    name="email"
                                    label='Email'
                                    placeholder='Enter Email'
                                />
                                <Form.Field
                                    onChange={(e) => this.handleChange(e)}
                                    id='form-input-control-password'
                                    control={Input}
                                    name="password"
                                    label='Password'
                                    placeholder='Enter Password'
                                />
                            </Form.Group>
                            <Button primary compact type="submit">Register</Button>
                        </Form>
                    }
                    {
                        this.state.userFormType === "login" &&
                        <Form className="" onSubmit={this.handleLogin}>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    onChange={(e) => this.handleChange(e)}
                                    id='form-input-control-email'
                                    control={Input}
                                    name="email"
                                    label='Email'
                                    placeholder='Enter Email'
                                />
                                <Form.Field
                                    onChange={(e) => this.handleChange(e)}
                                    id='form-input-control-password'
                                    control={Input}
                                    name="password"
                                    label='Password'
                                    placeholder='Enter Password'
                                />
                            </Form.Group>
                            <Button primary compact type="submit">Login</Button>
                        </Form>
                    }
                    {this.state.userLoggedIn &&
                        <>
                            <Button className="" onClick={() => this.clearUser()}>Logout</Button>
                        </>
                    }



                </div>
            );
        }
    }
}