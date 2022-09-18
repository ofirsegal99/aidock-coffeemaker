import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const axios = require('axios');

const API_HOSTNAME = process.env.API_HOSTNAME || 'localhost';
const API_PORT = parseInt(process.env.API_PORT) || 5000;
const API_URL = `http://${API_HOSTNAME}:${API_PORT}`;

function OrderForm() {
    const handleSubmit = (event) => {
        const { name, drink, position } = event.target
        const time = new Date(event.target.time.value);
        const payload = {
            name: name.value,
            drink: drink.value,
            position: position.value,
            time: time.toISOString(),
        }

        axios.post(`${API_URL}/new_rabbit_order`, payload);
    }
    const [value, setValue] = useState();
    return (
      <div className="orderFormFirstContainer">
            <div className="orderFormFirstHalf">
                 <div>
                     <div className="orderFormTitleContainer">
                         <span className="orderFormTitleText">Order Your Coffee</span>
                         <hr className="greenLine"></hr>
                     </div>
                 </div>
                 <div className="orderForm_FormContainer">
                         <form className="formContainer" onSubmit={handleSubmit}>
                             <div className="formRow">
                                <div className="labelContainer">
                                    <p className="generalLabel">Name</p>
                                    <input required name="name" className="generalInput" type="text" placeholder="First Name"/>
                                </div>
                                <div className="labelContainer">
                                    <p className="generalLabel">Type of Coffee</p>
                                    <select name="drink" className="generalInput">
                                         <option value="Cappucino">Cappucino</option>
                                         <option value="Americano">Americano</option>
                                         <option value="Expresso">Expresso</option>
                                         <option value="Latte">Latte</option>
                                         <option value="Iced Coffee">Iced Coffee</option>
                                         <option value="Mocha">Mocha</option>
                                    </select>
                                </div>
                             </div>
                             <div className="formRow">
                                 <div className="labelContainer">
                                    <p className="generalLabel">Position</p>
                                    <select name="position" className="generalInput">
                                         <option value="Staff">Staff</option>
                                         <option value="Boss">Boss</option> 
                                    </select>
                                 </div>
                                 <div className="labelContainer">
                                    <p className="generalLabel">Time</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                         <DateTimePicker
                                             renderInput={(props) => <TextField name="time" {...props} />}
                                             value={value}
                                             inputFormat="YYYY-MM-DD HH:mm"
                                             minDateTime={dayjs().add(1, 'minute')}
                                             onChange={(newValue) => {
                                               setValue(newValue);
                                             }}
                                         />
                                    </LocalizationProvider>
                                 </div>
                             </div>
                             <div className="formRow submitRow">
                                 <input className="generalButton" type="submit" value="Create Order" />
                             </div>
                         </form>
                 </div>
            </div>
      </div>
    );
  }
  
  export default OrderForm;
  