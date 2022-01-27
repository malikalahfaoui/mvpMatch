import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatAmount } from "../../api/selector";
import { useQuery } from "react-query";

export default function BasicTable({ data = [], hideGatewayColumn }) {
  const { data: gateways } = useQuery({
    queryKey: "gatewaysData",
    enabled: false,
  });

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            {!hideGatewayColumn && <TableCell align="right">Getway</TableCell>}
            <TableCell align="right">Transaction ID</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ created, gatewayId, paymentId, amount }) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{created}</TableCell>
              {!hideGatewayColumn && (
                <TableCell align="right">
                  {gateways.find((i) => i.gatewayId === gatewayId).name}
                </TableCell>
              )}
              <TableCell align="right">{paymentId}</TableCell>
              <TableCell align="right">{formatAmount(amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
