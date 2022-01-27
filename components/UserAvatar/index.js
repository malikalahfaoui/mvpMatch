import * as React from "react";
import { yellow } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getUsers } from "../../api";

export default function UserAvatar() {
  const { data = [], isLoading } = useQuery("userData", () => getUsers(), {
    staleTime: Infinity,
  });

  return isLoading ? (
    <></>
  ) : (
    <ButtonBase color="inherit">
      <Avatar sx={{ bgcolor: yellow[700], mr: 2 }} variant="rounded">
        {data[0].firstName.charAt(0)}
        {data[0].lastName.charAt(0)}
      </Avatar>
      <Typography color="primary" variant="subtitle1">
        {" "}
        {data[0].firstName} {data[0].lastName}
      </Typography>
    </ButtonBase>
  );
}
