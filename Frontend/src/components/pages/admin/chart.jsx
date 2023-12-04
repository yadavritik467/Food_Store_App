// import React from "react";
// import SideNav from "./side-nav";
// import { ArcElement,CategoryScale, LinearScale} from 'chart.js'
// import Chart from 'chart.js/auto';
// import { Bar, Doughnut } from 'react-chartjs-2';


// Chart.register(ArcElement,CategoryScale,LinearScale);

// const AdminChart = () => {

//   const sale_data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       { 
//           label: "sales in 2023",
//           data: [12, 19, 3, 5, 2, 3, 4],
//           backgroundColor: "orange",
//       },
//       { 
//           label: "sales in 2022",
//           data: [12, 19, 3, 5, 2, 3, 4],
//           backgroundColor: "gray",
//       },
//     ]
//   }

//   const Food_data ={
//     labels: ["Chicken", "Egg", "Mutton", "Sea Food", "Fish"],
//     datasets: [
//       { 
//           label: "sales in 2023",
//           data: [12, 19, 3, 5, 2,],
//           backgroundColor: "orange",
//       },
//       { 
//           label: "sales in 2022",
//           data: [12, 19, 3, 5, 2,],
//           backgroundColor: "gray",
//       },
//     ]
//   }

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//           ticks: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//           ticks: {
//             display: false,
//           },
//         },
//       ],
//     },
//   };
//   return (
//     // <div style={{ display: "flex" }}>
//     //   <SideNav />
//       <div id="chart" style={{ display: "flex",borderTop:"1px solid black",  flexDirection:"column",overflowY:"scroll", height: "100%",width:"100%", scrollbarGutter:"stable",padding:"30px" }}>
//       <Bar style={{height:"80vh",width:"100%", margin:"auto"}}  data={sale_data} options={options} /> <br />
//       <Doughnut style={{height:"80vh",width:"100%", margin:"auto"}}  data={Food_data}  options={options} />
//       </div>
//     // </div>
//   );
// };

// export default AdminChart;
