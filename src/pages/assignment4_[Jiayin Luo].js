import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from './components/scatterPlot'
import BarChart from './components/barChart'
import Tooltip from './components/tooltips'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState('4');
    //Q1.5 define hooks to link the points and bars
    //Notes: you should define the hooks at the beginning of the component; a hook cannot be defined after the if ... else... statement;
    
    const dataAll = useData(csvUrl);

    const [showRectangle, setShowRectangle] = React.useState(false);

    const [selectedStation, setSelectedStation] = React.useState(null);

    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);
    const [tooltipData, setTooltipData] = React.useState(null);
    
    const mouseEnter = (station) => {
        setSelectedStation(station);
        setShowRectangle(true); 
        const stationData = dataAll.find(d => d.station === station);
        if (stationData) {
            setTooltipData(stationData); // Set the data for the tooltip
            setTooltipX(event.pageX); // Set the X position for the tooltip
            setTooltipY(event.pageY); // Set the Y position for the tooltip
        }
    };

    const mouseOut = () => {
        setSelectedStation(null); // Reset when the mouse leaves
        setShowRectangle(false);
        setTooltipData(null); // Clear the tooltip data
        setTooltipX(null); // Reset the X position
        setTooltipY(null);
         
    };


    if (!dataAll) {
        return <pre>Loading...</pre>;
    };
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35};
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom-120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter( d => { 
        return d.month === MONTH[month] 
    });

    //console.log(data); // After setting data in useEffect

   
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();
    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

//Q1.2: Complete the xScaleBar and yScaleBar
//Hint: use d3.scaleBand for xScaleBar
    const xScaleBar = d3.scaleBand()
        .domain(data.map(d => d.station).reverse()) // Assuming your data has a 'month' field
        .range([0,innerWidth]) // Set the range to the width of the chart
        .padding(0.1); // Add padding between the bars
    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.start)]) // Assuming you have a 'count' field for the y-axis
        .range([innerHeightBar, 0]) // Set the range to the height of the chart
        .nice(); // Nice the scale to make it more user-friendly

    const changeHandler = (event) => {
        setMonth(event.target.value);
    };
    return (
        <Container >
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
                    <input key="monthText" type="text" value={MONTH[month]} readOnly/>
                </Col>
                
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot 
                            offsetX={margin.left} 
                            offsetY={margin.top} 
                            data={data} 
                            xScale={xScaleScatter} 
                            yScale={yScaleScatter} 
                            height={innerHeightScatter} 
                            width={innerWidth}
                            selectedStation={selectedStation} 
                            showRectangle={showRectangle}
                            //onMouseEnter={() => mouseEnter(d.station)}
                            mouseEnter={mouseEnter}
                            mouseOut={mouseOut}/>
                    </svg>
                </Col>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart 
                            offsetX={margin.left} 
                            offsetY={margin.top} 
                            data={data} 
                            xScale={xScaleBar} 
                            yScale={yScaleBar} 
                            height={innerHeightBar} 
                            width={innerWidth}
                            selectedStation={selectedStation} 
                            //onMouseEnter={() => mouseEnter(d.start)}
                            mouseEnter={mouseEnter}
                            mouseOut={mouseOut}/>
                    </svg>
                </Col>
            </Row>
            {/* Render the Tooltip */}
            {tooltipData && (
                <Tooltip 
                    d={tooltipData} 
                    x={tooltipX} 
                    y={tooltipY} 
                />
            )}
        </Container>
    )   
}


export default Charts