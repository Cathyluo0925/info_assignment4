import React from 'react';

function Bars(props) {
    const {data, xScale, yScale, height,selectedStation, mouseEnter,mouseOut} = props;
    //const [selectedStation, setSelectedStation] = React.useState(null);

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    //const mouseEnter = (station) => {
        //setSelectedStation(station); // Set the selected station on hover
   // };
    //const mouseOut = () => {
       // setSelectedStation(null); // Reset when the mouse leaves
    //}
    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };
    if (data) {
        return (
            <g>
                {data.map((d, index) => {
                    const barHeight = height - yScale(d.start); // Adjust the height for the bar
                    const x = xScale(d.station); // Get the x position from the xScale
                    const width = xScale.bandwidth(); // Get the width of the bar
                    
                    return (
                        <rect
                            key={index} // Use a unique key for each bar
                            x={x} // Set the x position
                            y={yScale(d.start)} // Set the y position (inverse because SVG starts from the top)
                            width={width} // Set the width of the bar
                            height={barHeight} // Set the height of the bar
                            fill={getColor(selectedStation, d.station)} // Color of the bar
                            stroke={'black'}
                            onMouseEnter={() => mouseEnter(d.station)} // Update selected station on hover
                            //onMouseEnter={mouseEnter}
                            onMouseOut={mouseOut} 
                        />
                    );
                })}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Bars