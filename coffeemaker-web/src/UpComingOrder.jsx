import React, { Component } from 'react';
const axios = require('axios');

const API_HOSTNAME = process.env.API_HOSTNAME || 'localhost';
const API_PORT = parseInt(process.env.API_PORT) || 5000;
const API_URL = `http://${API_HOSTNAME}:${API_PORT}`;

class UpcomingOrdersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
          upcoming_orders: []
        };
    }
    componentDidMount() {
        axios.get(`${API_URL}/waiting_list`)
    .then((response) => {
      this.setState({
        upcoming_orders: response.data
      });
    })
    }

    render() {
        return(
<div className='upComingOrderFirstContainer'>
            <div className='upComingOrderSecondContainer'>
                     <div className="orderFormTitleContainer">
                         <span className="orderFormTitleText">Coffee Waiting List</span>
                         <hr className="greenLine"></hr>
                     </div>
                     <div className='upComingOrderWaitingListContainer'>
                        <div className='upComingOrderWaitingList'>
                            <table className='upComingOrderWaitingListTable'>
                             <tr className='fixedRow'>
                                 <th className='upComingOrderFirstCollum'>Status</th>
                                 <th className='upComingOrderSecondCollum'>Name</th>
                                 <th className='upComingOrderThirdCollum'>Order</th>
                                 <th className='upComingOrderFourthCollum'>Estimated Time</th>
                             </tr>
                             <br />
                             {
                             this.state.upcoming_orders.map((curr,i) =>(
                                <>
                                <tr key={curr.id}>
                                     <td><div className='statusCircle' style={{backgroundColor:'Orange'}}></div></td>
                                     <td>{curr.name}</td>
                                     <td>{curr.position}'s {curr.drink}</td>
                                     <td>The time set for the coffee to be ready is at {new Date(curr.time).toLocaleString()}</td>
                                </tr>
                                <br />
                                </>
                             )
                              )}
                            </table>
                        </div>
                     </div>
            </div>
        </div>
        );
    }
}

export default UpcomingOrdersComponent;