import React,{Component} from "react";
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

export default class UserLogin extends Component{
    constructor(props){
        super(props)
        this.state= {
            username: "",
            email: "",
            password: ""
        }
      }
    handleChangeUsername = (event) =>{
        console.log(event.target.value)
        this.setState({
            username:event.target.value
        })
    }
    handleChangeEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    handleChangePassword = (event) =>{
        this.setState({
            password:event.target.value
        })
    }

    handleSubmit =(event) =>{
        console.log(this.state.username)
        console.log(this.state.email)
        console.log(this.state.password)
        event.preventDefault()
        fetch(this.props.baseURL + 'auth/' + 'register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username, 
                email: this.state.email,
                password: this.state.password
            }),
            headers:{'Content-Type': 'application/json'},
            credentials: "include"
        }).then(res =>{
            return res.json()
        }).then(data =>{
            if(data.status === 201){
                this.props.setUser(data.data)
                this.props.setUserForm("")
                this.setState({
                    username: "",
                    email: "",
                    password: ""
                })
            }
        }).catch(error =>console.error({'Error': error}))
    }
    
    handleLogin =(event) =>{
        event.preventDefault()
        fetch(this.props.baseURL + 'auth' + '/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username, 
                email: this.state.email,
                password: this.state.password
            }),
            headers:{'Content-Type': 'application/json'},
            credentials: "include"
        }).then(res =>{
            return res.json()
        }).then(data =>{
            if(data.status === 200){
                this.props.setUser(data.data)
                this.props.setUserForm("")
                this.setState({
                    username: "",
                    email: "",
                    password: ""
                })
            }
        }).catch(error =>console.error({'Error': error}))
    }
    
      render(){
      return (
        <div className="UserContainer">

            {
                this.props.userFormType === "register" &&
                <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            onChange={(e) => this.handleChangeUsername(e)}
                            id='form-input-control-username'
                            control={Input}
                            label='Username'
                            placeholder='Enter Username'
                        />
                        <Form.Field
                            onChange={(e) => this.handleChangeEmail(e)}
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='Enter Email'
                        />
                        <Form.Field
                            onChange={(e) => this.handleChangePassword(e)}
                            id='form-input-control-password'
                            control={Input}
                            label='Password'
                            placeholder='Enter Password'
                        />
                    </Form.Group>
                    <input primary compact type="submit" value="Register"/>
                </Form>
            }
            {
                this.props.userFormType === "login" &&
                <Form className="" onSubmit={this.handleLogin}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            onChange={(e) => this.handleChangeEmail(e)}
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='Enter Email'
                        />
                        <Form.Field
                            onChange={(e) => this.handleChangePassword(e)}
                            id='form-input-control-password'
                            control={Input}
                            label='Password'
                            placeholder='Enter Password'
                        />
                    </Form.Group>
                    <input primary compact type="submit" value="Login"/>
                </Form>
            }
            
            
        </div>
      );}
}