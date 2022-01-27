import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { formatAmount } from "../../../api/selector";
import BasicTable from "../../Table";

export default function ProjectGatewayContent({ gatewayId, projectId }) {
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ marginBottom: "25px" }}>
            <CardContent>
              <CardHeader
                subheader={`${
                  projects.find((i) => i.projectId === projectId).name
                } | ${gateways.find((i) => i.gatewayId === gatewayId).name}`}
                subheaderTypographyProps={{ variant: "subtitle1" }}
              />
              <BasicTable data={data[0].transactions} hideGatewayColumn />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
            <Typography variant="subtitle1">
              Total:{formatAmount(data[0].total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
