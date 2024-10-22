import Points from '/Users/cathyluo/assignment4/src/pages/components/points.js';
import XAxis from '/Users/cathyluo/assignment4/src/pages/components/xAxis.js';
import YAxis from '/Users/cathyluo/assignment4/src/pages/components/yAxis.js';
import React from 'react';

function ScatterPlot(props){
    const { offsetX, offsetY, data, xScale, yScale, height, width, selectedStation, mouseEnter, mouseOut,showRectangle } = props;
    
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Task 2: Render Points, XAxis, and YAxis components */}
            <Points 
                data={data} 
                xScale={xScale} 
                yScale={yScale} 
                selectedStation={selectedStation} 
                showRectangle={showRectangle}
                mouseEnter={mouseEnter} 
                mouseOut={mouseOut} />
            <YAxis yScale={yScale} height={height} axisLable={"Trip duration end in"} />
            <XAxis xScale={xScale} height={height} width={width} axisLable={"Trip duration start from"} />
        </g>
);
   
}

export default ScatterPlot