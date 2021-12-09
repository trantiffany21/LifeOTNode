import React,{Component} from "react";
import { Form,Input,Button } from "semantic-ui-react";

export default class NewTrip extends Component{
    constructor(props){
        super(props)
        this.state= {
          editModalOpen: false,
          name: "",
          origin:"",
          destination:"",
          lodgingName:"",
          lodgingAddress:"",
          lodgingLat:"45.34",
          lodgingLong:"50.32"
        }
      }
    handleChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit =(event) =>{
        event.preventDefault()
        fetch(this.props.baseURL + 'trips/', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                origin:this.state.origin,
                destination: this.state.destination,
                lodging:{
                    lodging_name:this.state.lodgingName,
                    lodging_address: this.state.lodgingAddress,
                    lodging_lat:this.state.lodgingLat,
                    lodging_long:this.state.lodgingLong
                },
                user: this.props.userId
            }),
            headers:{'Content-Type': 'application/json'},
            credentials:"include"
        }).then(res =>{
            return res.json()
        }).then(data =>{
            this.props.addTrips(data.data)
            this.setState({
                name: "",
                origin:"",
                destination:"",
                lodgingName:"",
                lodgingAddress:"",
                lodgingLat:"45.34",
                lodgingLong:"50.32"   
            })
        }).catch(error =>console.error({'Error': error}))
    }
    render(){
        return(
            <div className="NewDogContainer">
            <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Field
                        onChange={(e) => this.handleChange(e)}
                        id='name'
                        name='name'
                        control={Input}
                        label='Name'
                        value={this.state.name}
                        />
                    <Form.Field
                        onChange={(e) => this.handleChange(e)}
                        id='origin'
                        name='origin'
                        control={Input}
                        label='Origin'
                        value={this.state.origin}
                    />
                    <Form.Field
                        onChange={(e) => this.handleChange(e)}
                        id='destination'
                        name='destination'
                        control={Input}
                        label='Destination'
                        value={this.state.destination}
                    />
                    </Form.Group>
                    <Form.Field
                        onChange={(e) => this.handleChange(e)}
                        id='lodgingName'
                        name='lodgingName'
                        control={Input}
                        label='Lodging Name'
                        value={this.state.lodgingName}
                    />
                    <Form.Field
                        onChange={(e) => this.handleChange(e)}
                        id='lodgingAddress'
                        name='lodgingAddress'
                        control={Input}
                        label='Lodging Address'
                        value={this.state.lodgingAddress}
                    />
                <Button primary compact  type="submit"> New Trip </Button>
            </Form>
        </div>
        );
    }
}