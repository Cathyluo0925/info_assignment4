
//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate




function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    const isLinearScale = typeof xScale.domain()[0] === 'number';
    const ticks = isLinearScale ? xScale.ticks() : xScale.domain();  // Use .ticks() for linear, .domain() for discrete
    


    if(xScale) {
        return <g>
            <line x1={0} y1={height} x2={width} y2={height} stroke={'black'} />
            {ticks.map( tickValue => {
                return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                        <line 
                            //y2={5} 
                            y2={typeof xScale.domain()[0] === 'number' ? 5 : 0}
                            stroke={'black'} 
                        />
                        <text 
                            style={{ fontSize:'10px'}} 
                            y={20}
                            transform={typeof xScale.domain()[0] === 'number' ? 'translate(-5, -5)' : 'translate(20, 0) rotate(70)'}

                        >
                        {tickValue}
                        </text>
                </g> })}
        {/* //the if(xScale){...} means when xScale is not null, the component will return the x-axis; otherwise, it returns <g></g>
        //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
        //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */}
        {/* X-axis label */}
        <text
                x={width/2 + 110}
                y={height -10}
                //textAnchor="middle"
                style={{ fontSize: '16px' }}
                //transform={typeof xScale.domain()[0] === 'number' ? '' : 'translate(50, 0) rotate(-80)'}

            >
                {axisLable}
            </text>
        </g>
    }else {
    return <g></g>
}
}

export default XAxis