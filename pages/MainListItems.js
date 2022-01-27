import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import DonutSmallSharpIcon from "@mui/icons-material/DonutSmallSharp";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useRouter } from "next/router";
import Link from "next/link";

const menu = [
  {
    path: "/item1",
    Icon: AssessmentRoundedIcon,
    text: "Item 1",
  },
  {
    path: "/item2",
    Icon: GridViewRoundedIcon,
    text: "Item 2",
  },
  {
    path: "/item3",
    Icon: PeopleIcon,
    text: "Item 3",
  },
  {
    path: "/",
    Icon: DonutSmallSharpIcon,
    text: "Reports",
  },
  {
    path: "/logout",
    Icon: PowerSettingsNewIcon,
    text: "Logout",
  },
];

export const MainListItems = () => {
  const router = useRouter();
  return menu.map(({path, Icon, text}) => (
    <Link href={path}>
      <ListItem button selected={router.asPath === path}>
        <ListItemIcon>
          <Icon color={router.asPath === path ? "primary" : "inherit"}/>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  ));
};
