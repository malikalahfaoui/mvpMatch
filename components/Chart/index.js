import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Grid from "@mui/material/Grid";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartCmp({ labels = [], data = [] }) {
  const config = {
	backgroundColor:"#FF0000",
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Doughnut
          data={config}
          options={{
            responsive: true
          }}
        />
      </Grid>
    </Grid>
  );
}
