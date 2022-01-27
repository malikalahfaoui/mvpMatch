import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "react-query";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { formatAmount, sum, filterGatewayData } from "../../../api/selector";
import AccordionData from "../../AccordionData";
import Chart from "../../chart";
import ChartCmp from "../../chart";

export default function ProjectContent({ projectId }) {
  const { data = [] } = useQuery({
    queryKey: "reportData",
    enabled: false,
  });

  const { data: projects } = useQuery({
    queryKey: "projectData",
    enabled: false,
  });

  const { data: gateways } = useQuery({
    queryKey: "gatewaysData",
    enabled: false,
  });

  const transactions = filterGatewayData(data[0].transactions);
  const totals = sum(data.map(({ total }) => total));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ marginBottom: "25px" }}>
            <CardHeader
              subheader={`${
                projects.find((i) => i.projectId === projectId).name
              } | All gateways`}
              subheaderTypographyProps={{ variant: "subtitle1" }}
            />
            <CardContent>
              <AccordionData
                hideGatewayColumn
                data={transactions}
                idName="gatewayId"
                nameData={gateways}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ChartCmp
            data={transactions.map(({ total }) => total)}
            labels={transactions.map(
              ({ gatewayId }) =>
                gateways.find((i) => i.gatewayId === gatewayId).name
            )}
          />
          <Card sx={{mt: 8}}>
            <CardContent>
            <Typography variant="subtitle1">
              Total:{formatAmount(totals)}
            </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
