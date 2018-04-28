import React, {Component} from 'react';
import axios from 'axios';

class GetDrivers extends Component
{
    constructor(props)
    {
        super(props);
        this.handleDriverId = this.handleDriverId.bind(this);
        this.state = {
            drivers: "",
            id: "",
        };
    }

    componentDidMount()
    {
        this.getDrivers();
    }

    handleDriverId(event)
    {
        this.setState({id: event.target.value});
    }

    getDrivers()
    {
        var get = {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'address': '601 University Dr, San Marcos, TX 78666',
                'distance': '300000'
            },

        }

        fetch('https://nuber-rest.herokuapp.com/customer', get)
            .then(function (res)
            {
                return res.json();
            })
            .then(data =>
            {
               console.log(data);
               const drivers = data.map((driver) =>
                   {
                    return(
                        <div key={driver._id}>
                            <h3 key={driver._id + "name"} className="h3name">{driver.name}</h3>
                            <h3 key={driver._id + "id"} className="h3id">{driver._id}</h3>
                            <h3 key={driver._id + "location"} className="h3location">{driver.currentCoords}</h3>
                            <hr/>
                        </div>
                    )
               });

               this.setState({
                  drivers,
                   id: ""
               });
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }

    setDriver = event =>
    {
        event.preventDefault();

        this.setState({
            drivers: event.target.value,
            id: event.target.value
        });

        var body = JSON.stringify({
            name: "Joe Bob",
            address: "601 University Dr, San Marcos, TX 78666",
            id: this.state.id
        })

        var options = {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }

        fetch('https://nuber-rest.herokuapp.com/customer', options)
            .then(response => {
                console.log(response, "Driver is on the way!");
                this.getDrivers();
            });
    }

    render()
    {
        return <div>

            <div className="welcomeContainer">
                <h2>Welcome to NUber</h2>
            </div>

            <br/>

            <div>
                <button
                    className = "getButtonDrivers"
                    type="get"
                    onClick={this.getDrivers}
                >
                    Get Drivers<i className="GetDriversButton" aria-hidden="true"/>
                </button>
            </div>

            <br/>

            <div>
                <input
                    onChange={this.handleDriverId}
                    name="Driver ID"
                    className="idInputForm"
                    value={this.state.id}
                    placeholder="Enter driverID for pickup"
                />

                <br/>

                <button
                    className="setDriver"
                    type="set"
                    onClick={this.setDriver}
                >
                    Set This Driver<i className="SetDriverButton" aria-hidden="true"/>
                </button>
            </div>

            <br/>

            <div className="driverDataContainer">
                <h6>Drivers near you</h6>
                {this.state.drivers}
            </div>

        </div>
    }
}

export default GetDrivers
