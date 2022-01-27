import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { formatAmount, sum } from "../../../api/selector";
import AccordionData from "../../AccordionData";

export default function DefaultContent() {
  const { data = [] } = useQuery({
    queryKey: "reportData",
    enabled: false,
  });

  const { data: projects } = useQuery({
    queryKey: "projectData",
    enabled: false,
  });

  const totals = sum(data.map(({ total }) => total));
  return (
    <>
      <Card sx={{ marginBottom: "25px" }}>
        <CardHeader
          subheader="All project | All gateway"
          subheaderTypographyProps={{ variant: "subtitle1" }}
        />
        <CardContent>
          <AccordionData data={data} idName="projectId" nameData={projects} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Total: {formatAmount(totals)}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
