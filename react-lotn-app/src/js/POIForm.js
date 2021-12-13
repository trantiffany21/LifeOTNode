import React, { Component } from "react";
import { Table, Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

export default class POIForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModalOpen: false,
            name: "",
            address: "",
            pois: [],
            poiToEdit: {},
            lat:"45.34",
            long:"50.32"
        }
    }

    getPois = (trip) => {
        fetch(this.props.baseURL + "trips/pois/route/" + trip.id, { credentials: "include" })
            .then(res => {
                return res.json()
            }).then(data => {
                this.setState({
                    pois: data.data
                })
                console.log(this.state.pois[0])
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    showEditForm = (poi) => {
        if (this.state.editModalOpen) {
            this.setState({ editModalOpen: false })
        } else {
            this.setState({
                editModalOpen: true,
                name: poi.name,
                address: poi.address,
                poiToEdit: poi
            })
        }
    }

    setPOIs = (pois) =>{
        this.setState({
          pois:pois
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const editUrl = this.props.baseURL + 'trips/pois/' + this.state.poiToEdit.id
        try {
            const response = await fetch(editUrl, {
                method: 'PUT',
                body: JSON.stringify({
                    name: e.target.name.value,
                    address: e.target.address.value, 
                    trip: this.props.trip.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            if (response.status === 200) {
                const updatedPOI= await response.json()
                const findIndex = this.state.pois.findIndex(poi => poi.id === updatedPOI.data.id)
                const copyPOIs = [...this.state.pois]
                copyPOIs[findIndex] = updatedPOI.data
                this.setPOIs(copyPOIs)
                this.setState({
                    editModalOpen: false
                })
            }
        }
        catch (err) {
            console.log('Error => ', err)
        }
    }

    deletePOI = (id) => {
        fetch(this.props.baseURL + 'trips/pois/' + id, {
            method: 'DELETE',
            credentials: "include"
        }).then(res => {
            const findIndex = this.state.pois.findIndex(poi => poi.id === id)
            const copyPOIs = [...this.state.pois]
            copyPOIs.splice(findIndex, 1)
            this.setPOIs(copyPOIs)
        })
    }

    componentDidMount() {
        this.getPois(this.props.trip)
    }

    render() {
        return (
            <div className="POIContainer">
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Stop Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <tbody>
                        {this.state.pois.map((poi, i) => {
                            return (
                                <Table.Row key={poi.id}>
                                    <Table.Cell>{poi.name}</Table.Cell>
                                    <Table.Cell>{poi.address}</Table.Cell>
                                    <Table.Cell> <Button positive compact onClick={() => this.showEditForm(poi)}>Edit</Button></Table.Cell>
                                    <Table.Cell> <Button negative compact onClick={() => this.deletePOI(poi.id)}>Delete</Button></Table.Cell>
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
                                onChange={(e) => this.handleChange(e)}
                                id='name'
                                name='name'
                                control={Input}
                                label='Name'
                                value={this.state.name}
                            />
                            <Form.Field
                                onChange={(e) => this.handleChange(e)}
                                id='address'
                                name='address'
                                control={Input}
                                label='Address'
                                value={this.state.address}
                            />
                        </Form.Group>
                        <Button primary compact type="submit"> Edit POI </Button>
                    </Form>
                }

            </div>
        );
    }
}