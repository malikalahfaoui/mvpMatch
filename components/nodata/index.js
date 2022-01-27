import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import logo from "./nodata.png";

export default function NoData() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{mt: 6}}>No Reports</Typography>
        <Typography variant="subtitle1" align="center" sx={{maxWidth: 500, mt: 2}} color="text.secondary">
          Currently you have no data for the reports to be generated. Once you
          start generating traffic through the Balance application the reports
          will be shown.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Image src={logo} alt="me" width="350" height="250" />
      </Grid>
    </Grid>
  );
}
