import React from 'react';
import { Link } from 'react-router-dom';



function Histogram(props){
    return(
        <div className='upComingOrderFirstContainer histogramFirstContainer'>
        <div className='upComingOrderSecondContainer OrderHistoryRouteSecondContainer'>
                 <div className="orderFormTitleContainer orderHistoryRouteTitleContainer">
                     <hr className="greenLine greenLineOrderHistoryRoute"></hr>
                     <div className="orderHistoryFirstContainer">
                     <div className="orderHistorySecondContainer">
                         <div className="formRow submitRow">
                             <Link to="/"><button className="generalButton monthOrdersButton">Back to Home page</button></Link>
                         </div>
                         <div className="formRow submitRow">
                             <Link to="/Orders"><button className="generalButton monthOrdersButton">Go to Order History</button></Link>
                         </div>
                      </div>
                    </div>
                 </div>
        </div>
    </div>
    )
}

export default Histogram;