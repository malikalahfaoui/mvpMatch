import React from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Grid } from "@mui/material";
import BasicTable from "../Table";
import { formatAmount } from "../../api/selector";

export default function AccordionData({
  hideGatewayColumn,
  data = [],
  idName,
  nameData = []
}) {
  return data.map((item) => (
    <Accordion key={item[idName]}>
      <AccordionSummary aria-controls="accordion-data">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1">{nameData.find(i=> i[idName] === item[idName]).name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">TOTAL: {formatAmount(item.total)}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <BasicTable data={item.transactions} hideGatewayColumn={hideGatewayColumn} />
      </AccordionDetails>
    </Accordion>
  ));
}
