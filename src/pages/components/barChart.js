
import XAxis from '/Users/cathyluo/assignment4/src/pages/components/xAxis.js';
import Bars from '/Users/cathyluo/assignment4/src/pages/components/bars.js';
import YAxis from '/Users/cathyluo/assignment4/src/pages/components/yAxis.js';
import React from 'react';

function BarChart(props){
    const {offsetX, offsetY, data, xScale, yScale, height, width, selectedStation,showRectangle, mouseEnter, mouseOut} = props;
    
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars 
                data={data} 
                xScale={xScale} 
                yScale={yScale} 
                height={height}
                selectedStation={selectedStation} 
                showRectangle={showRectangle}
                mouseEnter={mouseEnter} 
                mouseOut={mouseOut} />
            <YAxis yScale={yScale} height={height} axisLable={"Bikers star from"}/>
            <XAxis xScale={xScale} height={height} width={width} /> 
        </g>
);

}

export default BarChart