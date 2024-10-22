import React from 'react';

function Points(props) {
    const { data, xScale, yScale,mouseEnter,mouseOut,selectedStation,showRectangle} = props;

    // State to track the currently hovered station and rectangle visibility
    //const [selectedStation, setSelectedStation] = React.useState(null);
    //const [showRectangle, setShowRectangle] = React.useState(false);

    // Mouse event handlers
    //const mouseEnter = (station) => {
        //setSelectedStation(station); // Set the selected station on hover
        //setShowRectangle(true); // Show the rectangle when hovering over a station
    //};

    //const mouseOut = () => {
        //setSelectedStation(null); // Reset when the mouse leaves
        //setShowRectangle(false); // Hide the rectangle when the mouse leaves
    //};

    // Function to get color based on hovered station
    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    // Function to get radius based on hovered station
    const getRadius = (selectedStation, station) => {
        return station === selectedStation ? 10 : 5;
    };

    // Check if data is present
    if (data) {
        return (
            <g>
                {data.map((d, index) => (
                    <circle
                        key={index} // Use index or a unique value from data as key
                        cx={xScale(d.tripdurationS)} // X-coordinate
                        cy={yScale(d.tripdurationE)} // Y-coordinate
                        r={getRadius(selectedStation, d.station)} // Dynamic radius based on selected station
                        fill={getColor(selectedStation, d.station)} // Dynamic color based on selected station
                        stroke={'black'}
                        //onMouseEnter={() => mouseEnter(d.station,event)} // Update selected station on hover
                        onMouseEnter={(event) => {
                            mouseEnter(d.station, event); // Call mouseEnter with station and event
                            console.log(event); // Log the event
                        }}
                        
                        //onMouseEnter={mouseEnter}
                        onMouseOut={mouseOut} // Reset station on mouse out
                    />
                ))}
                
                {/* Show rectangle only if selectedStation is not null */}
                {showRectangle && (
                    <rect
                        x={0}
                        y={0}
                        width={545}
                        height={360}
                        fill={'yellow'}
                        opacity={0.6}
                    />
                )}

                {/* Render the selected station again to bring it to the front */}
                {data.filter(d => d.station === selectedStation).map((d, index) => (
                    <circle
                        key={index} // Use index or a unique value from data as key
                        cx={xScale(d.tripdurationS)} // X-coordinate
                        cy={yScale(d.tripdurationE)} // Y-coordinate
                        r={getRadius(selectedStation, d.station)} // Dynamic radius based on selected station
                        fill={getColor(selectedStation, d.station)} // Dynamic color based on selected station
                        stroke={'black'}
                        onMouseEnter={(event) => {
                            mouseEnter(d.station, event); // Call mouseEnter with station and event
                            console.log(event); // Log the event
                        }}
                        
                        //onMouseEnter={(event)=>{
                            //console.log(event)
                        //}}
                        //onMouseEnter={mouseEnter}
                        onMouseOut={mouseOut}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>; // Return an empty group if there's no data
    }
}

export default Points;