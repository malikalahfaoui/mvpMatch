import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useQuery } from "react-query";
import { getData, getGateways, getProjects } from "../api";
import DefaultContent from "../components/reportContent/DefaultContent";
import GatewayContent from "../components/reportContent/GatewayContent";
import ProjectContent from "../components/reportContent/ProjectContent";
import ProjectGatewayContent from "../components/reportContent/ProjectGatewayContent";
import { CircularProgress } from "@mui/material";
import NoData from "../components/nodata";

const INITIAL_FILTER = {
  projectId: "all",
  gatewayId: "all",
  to: null,
  from: null,
};

export default function Home() {
  const [form, setForm] = useState(INITIAL_FILTER);
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const { isLoading: isProjectLoading, data: projects } = useQuery(
    "projectData",
    () => getProjects(),
    {
      staleTime: Infinity,
    }
  );

  const { isLoading: isGatewayLoading, data: gateways } = useQuery(
    "gatewaysData",
    () => getGateways(),
    {
      staleTime: Infinity,
    }
  );

  const {
    isFetching: isReportLoading,
    data = [],
    refetch,
  } = useQuery("reportData", () => getData(form), {
    staleTime: Infinity,
  });

  const handleChange = (name, value) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFilter = () => {
    setFilter(form);
    refetch();
  };

  const getContent = () => {
    if (isReportLoading) {
      return (
        <Typography align="center">
          <CircularProgress />
        </Typography>
      );
    }
    if (data.length === 0) {
      return <NoData />;
    }
    if (filter.projectId === "all") {
      if (filter.gatewayId === "all") return <DefaultContent />;
      return <GatewayContent gatewayId={filter.gatewayId} />;
    }

    if (filter.gatewayId === "all")
      return <ProjectContent projectId={filter.projectId} />;

    return (
      <ProjectGatewayContent
        gatewayId={filter.gatewayId}
        projectId={filter.projectId}
      />
    );
  };

  if (isProjectLoading || isGatewayLoading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">Reports</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Easily generate a report of your transactions
          </Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} sm={9} justifyContent="end">
          <Grid item>
            <FormControl sx={{ s: 1, minWidth: 150 }}>
              <InputLabel id="project-select-label" size="small"></InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={form.projectId}
                onChange={(e) => {
                  handleChange("projectId", e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All projects</MenuItem>
                {projects.map(({ name, projectId }) => (
                  <MenuItem key={projectId} value={projectId}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ s: 1, minWidth: 150 }}>
              <InputLabel id="gateways-select-label" size="small"></InputLabel>
              <Select
                labelId="gateways-select-label"
                id="gateways-select"
                value={form.gatewayId}
                onChange={(e) => {
                  handleChange("gatewayId", e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All gateways</MenuItem>
                {gateways.map(({ name, gatewayId }) => (
                  <MenuItem key={gatewayId} value={gatewayId}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={form.from}
                label="From date"
                onChange={(value) => {
                  handleChange("from", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ s: 1, maxWidth: 150 }}
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                type="date"
                showTodayButton
                value={form.to}
                onChange={(value) => {
                  handleChange("to", value);
                }}
                label="To date"
                renderInput={(params) => (
                  <TextField
                    sx={{ s: 1, maxWidth: 150 }}
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onFilter}>
              Generate report
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {getContent()}
    </Container>
  );
}
