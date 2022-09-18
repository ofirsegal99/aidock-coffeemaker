import React, { Component } from "react";
import {Link} from "react-router-dom";
const axios = require('axios');

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const API_HOSTNAME = process.env.API_HOSTNAME || 'localhost';
const API_PORT = parseInt(process.env.API_PORT) || 5000;
const API_URL = `http://${API_HOSTNAME}:${API_PORT}`;

class OrderHistoryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
          orders: []
        };
    }
    componentDidMount() {
        const now = new Date();
        const url = `${API_URL}/order_history?year=${now.getFullYear()}&month=${now.getMonth()}`;
        axios.get(url)
    .then((response) => {
      this.setState({
        orders: response.data
      });
    })
    }
    render() {
        return (<div className='upComingOrderFirstContainer'>
            <div className='upComingOrderSecondContainer OrderHistoryRouteSecondContainer'>
                     <div className="orderFormTitleContainer orderHistoryRouteTitleContainer">
                         <h1 class="headerTitleText headerTitle headerSubTitle">Current month : {month[new Date().getMonth()]}</h1>
                         <hr className="greenLine greenLineOrderHistoryRoute"></hr>
                         <div className="orderHistoryFirstContainer">
                         <div className="orderHistorySecondContainer">
                             <div className="formRow submitRow">
                                 <Link to="/"><button className="generalButton monthOrdersButton">Back to Home page</button></Link>
                             </div>
                             <div className="formRow submitRow">
                                 <Link to="/Histogram"><button className="generalButton monthOrdersButton">Go to Histogram</button></Link>
                             </div>
                          </div>
                        </div>
                     </div>
                     <div className='upComingOrderWaitingListContainer orderHistoryRouteWaitingListContainer'>
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
                             this.state.orders.map((curr,z) =>(
                                <>
                                <tr key={curr.id}>
                                     <td><div className='statusCircle' style={(!curr.isSupplied) ? {backgroundColor:'Orange'} :  {backgroundColor:'#3AB154'} } ></div></td>
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
        </div>);
    }
        
}

export default OrderHistoryComponent;