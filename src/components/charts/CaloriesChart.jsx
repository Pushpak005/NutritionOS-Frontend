import {

    LineChart,

    Line,

    XAxis,

    YAxis,

    Tooltip,

    ResponsiveContainer

} from "recharts";

const data=[

{day:"Mon",calories:1800},

{day:"Tue",calories:2100},

{day:"Wed",calories:1900},

{day:"Thu",calories:2200},

{day:"Fri",calories:1700},

{day:"Sat",calories:2000},

{day:"Sun",calories:1850}

];

export default function CaloriesChart(){

return(

<div

style={{

marginTop:"30px",

background:"#1d1d1d",

padding:"20px",

borderRadius:"15px"

}}

>

<h2>

📈 Weekly Calories

</h2>

<ResponsiveContainer

width="100%"

height={300}

>

<LineChart data={data}>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="calories"

/>

</LineChart>

</ResponsiveContainer>

</div>

);

}