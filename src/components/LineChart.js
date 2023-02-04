import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'

export default function LineChart({ firstSemGPA, secondSemGPA, thirdSemGPA }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const chartData = {
        labels: ["1/2022", "2/2022", "3/2022"],
        datasets: [
            {
                label: "GPA",
                data: [firstSemGPA, secondSemGPA, thirdSemGPA],
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }

    return (
        <div style={{width:"100%", position:"relative", marginBottom:"1%", padding:"1%",}}>
            <Line data={chartData} />
        </div>
    )
}