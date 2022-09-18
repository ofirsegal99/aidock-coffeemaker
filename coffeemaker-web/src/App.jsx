import React, { Component } from 'react';
import './index.css';
import Header from './Header';
import OrderForm from './OrderForm';
import UpcomingOrdersComponent from './UpComingOrder';
import OrderHistoryButton from './OrderHistoryButton';
import {Route,Routes} from 'react-router-dom';
import OrderHistoryComponent from './OrderHistoryRoute';
import Histogram from './Histogram';
import { render } from 'react-dom';
import { AgChartsReact } from 'ag-charts-react';
const axios = require('axios');

const API_HOSTNAME = process.env.API_HOSTNAME || 'localhost';
const API_PORT = parseInt(process.env.API_PORT) || 5000;
const API_URL = `http://${API_HOSTNAME}:${API_PORT}`;

class ChartExample extends Component {
  componentDidMount() {
    axios.get(`${API_URL}/histogram`)
    .then((response) => {
      let data = response.data.map(element => {
        element.count = parseInt(element.count);
        return element;
      })
      this.setState({
        options: {
          data: data
        }
      });
    })
  }
  

  constructor(props) {
    super(props);

    this.state = {
      options: {
        theme: myTheme,
        background: {
          fill: '#F6F6F6',
        },
        data: [],
        title: { text: 'Coffee Histogram' },
        subtitle: { text: 'per person' },
        padding: {
          top: 40,
          right: 40,
          bottom: 40,
          left:40,
        },
        series: [
          { type: 'column', xKey: 'name', yKey: 'count', stacked: true },
        ],
        legend: { spacing: 40 },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        maintainAspectRatio: false,
        height:500,
      },
    };
  }

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}
var myTheme = {
  baseTheme: 'ag-material-dark',
  palette: {
    fills: ['#3AB154'],
    strokes: ['#3AB154'],
  },
  overrides: {
    cartesian: {
      title: {
        fontSize: 54,
        color:'#636d65',
        fontFamily:"'Stint Ultra Condensed', cursive",
      },
      subtitle :{
        fontSize: 34,
        color:'#636d65',
        fontFamily:"'Stint Ultra Condensed', cursive",
      },
      series: {
        column: {
          label: {
            enabled: true,
            color: 'white',
          },
        },
      },
    },
  },
};
render(<ChartExample/>, document.querySelector('#root'));
function App(){

let allWorkers = [
    {
        name: "ofir",
        State : true,
        Order : "Latte",
        Time : "November 17th 16:57:32",
        Status : "Boss"
    },
    {
        name: "Ziv",
        State : true,
        Order : "Latte",
        Time : "November 17th 16:57:32",
        Status : "Boss"
    },
    {
        name: "Amitai",
        State : false,
        Order : "Latte",
        Time : "November 17th 16:57:32",
        Status : "Staff"
    }
];
    return (
        <div className='App'>
                 <Routes>
                      <Route path="/Histogram"element={<><Header title="Histogram"/><Histogram/><div className='outerChartContainer' width="100%"><ChartExample/></div></>}/>
                      <Route path="/Orders"element={<><Header title="Coffee Monthly History"/><OrderHistoryComponent/></>}/>
                      <Route path="/"element={<><Header title="Smart coffee machine"/><OrderForm/><UpcomingOrdersComponent everybody={allWorkers}/><OrderHistoryButton/></>}/>
                 </Routes>
        </div>
    );
}

export default App;