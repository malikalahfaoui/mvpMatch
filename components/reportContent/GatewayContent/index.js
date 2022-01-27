import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import CardHeader from "@mui/material/CardHeader";
import { formatAmount, sum } from "../../../api/selector";
import AccordionData from "../../AccordionData";
import ChartCmp from "../../chart";

export default function GatewayContent({ gatewayId }) {
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

  const totals = sum(data.map(({ total }) => total));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ marginBottom: "25px" }}>
          <CardContent>
            <CardHeader
              subheader={`All projects | ${
                gateways.find((i) => i.gatewayId === gatewayId).name
              }`}
              subheaderTypographyProps={{ variant: "subtitle1" }}
            />
            <AccordionData
              hideGatewayColumn
              data={data}
              idName="projectId"
              nameData={projects}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ChartCmp
          data={data.map(({ total }) => total)}
          labels={data.map(
            ({ projectId }) =>
              projects.find((i) => i.projectId === projectId).name
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
  );
}
