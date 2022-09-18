import React from "react";
import {Link} from "react-router-dom";

function OrderHistoryButton(){
    return(
        <div className="orderHistoryFirstContainer">
            <div className="orderHistorySecondContainer">
                 <div className="formRow submitRow">
                    <Link to="/Orders"><button className="generalButton monthOrdersButton">Go to Order History</button></Link>
                 </div>
                 <div className="formRow submitRow">
                    <Link to="/Histogram"><button className="generalButton monthOrdersButton">Go to Histogram</button></Link>
                 </div>
            </div>
        </div>
    )
}
export default OrderHistoryButton;