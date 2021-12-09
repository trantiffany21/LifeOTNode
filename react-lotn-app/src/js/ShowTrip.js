import React,{Component} from "react";
import { Table,Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

export default class ShowTrip extends Component{
    constructor(props){
        super(props)
        this.state= {
          editModalOpen: false,
          name: "",
          origin:"",
          destination:"",
          lodgingName:"",
          lodgingAddress:"",
          tripToEdit: {}
        }
      }
      showEditForm = (trip) =>{
        this.setState({
          editModalOpen: true,
          name: trip.name,
          origin: trip.origin,
          destination: trip.destination,
          lodgingName: trip.lodging.lodging_name,
          lodgingAddress: trip.lodging.lodging_address,
          tripToEdit: trip
        })
      }
    
      handleChangeName = (event) =>{
        this.setState({
            name:event.target.value
        })
      }
      handleChangeOrigin = (event) =>{
          this.setState({
              origin:event.target.value
          })
      }
      handleChangeDestination = (event) =>{
          this.setState({
              destination:event.target.value
          })
      }
      handleChangeLodgingName = (event) =>{
          this.setState({
              lodgingName:event.target.value
          })
      }
      handleChangeLodgingAddress = (event) =>{
          this.setState({
            lodgingAddress:event.target.value
          })
      }
    
      handleSubmit = async (e) =>{
        e.preventDefault()
        const editUrl = this.props.baseURL + 'trips/' + this.state.tripToEdit.id
        try{
          const response = await fetch(editUrl, {
            method: 'PUT', 
            body:JSON.stringify({
              name: e.target.name.value,
              origin: e.target.origin.value,
              destination: e.target.destination.value,
              lodging:{
                  lodging_name: e.target.lodgingName.value,
                  lodging_address: e.target.lodgingAddress.value,
              }
            }),
            headers: {
              'Content-Type' : 'application/json'
            }, 
            credentials: "include"
          })
    
          if(response.status === 200 ){
            const updatedTrip = await response.json()
            const findIndex = this.props.trips.findIndex(trip => trip.id === updatedTrip.data.id)
            const copyTrips = [...this.props.trips]
            copyTrips[findIndex] = updatedTrip.data
            this.props.setTrips(copyTrips)
            this.setState({
              editModalOpen:false
            })
          }
        }
        catch(err){
          console.log('Error => ', err)
        }
      }
    
      deleteTrip = (id) =>{
        fetch(this.props.baseURL + 'api/v1/trips/' + id, {
          method: 'DELETE', 
          credentials: "include"
        }).then(res =>{
          const findIndex = this.props.trips.findIndex(trip => trip.id === id)
          const copyTrips = [...this.props.trips]
          copyTrips.splice(findIndex,1)
          this.props.setTrips(copyTrips)
        })
      }
    
      render(){
      return (
        <div className="TripContainer">
          <Table >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Trip Name</Table.HeaderCell>
                  <Table.HeaderCell>Origin</Table.HeaderCell>
                  <Table.HeaderCell>Destination</Table.HeaderCell>
                  <Table.HeaderCell>Lodging Name</Table.HeaderCell>
                  <Table.HeaderCell>Lodging Destination</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            <tbody>
            {this.props.trips.map((trip, i) =>{
              return(
                <Table.Row key={trip.id}>
                  <Table.Cell>{trip.name}</Table.Cell>
                  <Table.Cell>{trip.origin}</Table.Cell>
                  <Table.Cell>{trip.destination}</Table.Cell>
                  <Table.Cell>{trip.lodging.lodging_name}</Table.Cell>
                  <Table.Cell>{trip.lodging.lodging_address}</Table.Cell>
                  <Table.Cell> <Button positive compact onClick={() => this.showEditForm(trip)}>Edit</Button></Table.Cell>
                  <Table.Cell> <Button negative compact onClick={() => this.deleteTrip(trip.id)}>Delete</Button></Table.Cell>
                </Table.Row>
              )
            })
            }
            </tbody>
            </Table> 
            {this.state.editModalOpen &&
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Field
                        onChange={(e) => this.handleChangeName(e)}
                        id='name'
                        name='name'
                        control={Input}
                        label='Name'
                        value={this.state.name}
                        />
                    <Form.Field
                        onChange={(e) => this.handleChangeOrigin(e)}
                        id='origin'
                        name='origin'
                        control={Input}
                        label='Origin'
                        value={this.state.origin}
                    />
                    <Form.Field
                        onChange={(e) => this.handleChangeDestination(e)}
                        id='destination'
                        name='destination'
                        control={Input}
                        label='Destination'
                        value={this.state.destination}
                    />
                    </Form.Group>
                    <Form.Field
                        onChange={(e) => this.handleChangeLodgingName(e)}
                        id='lodgingName'
                        name='lodgingName'
                        control={Input}
                        label='Lodging Name'
                        value={this.state.lodgingName}
                    />
                    <Form.Field
                        onChange={(e) => this.handleChangeLodgingAddress(e)}
                        id='lodgingAddress'
                        name='lodgingAddress'
                        control={Input}
                        label='Lodging Address'
                        value={this.state.lodgingAddress}
                    />
                <input primary compact type="submit" value="Edit Trip"/>    
              </Form>
            }


        </div>
        );
    }
}