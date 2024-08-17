import * as React from "react";
import dashboard from "../dashboard.json";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {AssignmentIndIcon} from "@mui/icons-material/AssignmentInd";
import {TravelExploreIcon} from "@mui/icons-material/TravelExplore";
import {PlaylistAddCheckIcon} from "@mui/icons-material/PlaylistAddCheck";
import {AddIcon} from "@mui/icons-material/Add";
import {ModeOfTravelIcon} from "@mui/icons-material/ModeOfTravel";
import {HotelIcon} from "@mui/icons-material/Hotel";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import  Profile from "./Profile";

const icon_mapping={
  AssignmentIndIcon:AssignmentIndIcon,
  TravelExploreIcon:TravelExploreIcon,
  PlaylistAddCheckIcon: PlaylistAddCheckIcon,
  AddIcon: AddIcon,
  ModeOfTravelIcon: ModeOfTravelIcon,
  HotelIcon: HotelIcon,
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const { user, logout } = useContext(AuthContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Explore & Go
            </Button>
          </Typography>
          {user ? (
            <>
              

              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
              <div
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  // onClick={Navigate("/user")}
                  edge="end"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        

        <List>
          {user ? (
            <>
              <Button
                variant="text"
                component={Link}
                to={"/"}
                style={{ alignText: "center" }}
              >
                Destinations
              </Button>
              <Divider />
              {dashboard.map((ele, index) => {
                const IconComponent = icon_mapping[ele.icon];
                console.log(IconComponent);
                return(
                  <Button
                  component={Link}
                  to={`/${ele.name.toLowerCase().replace(/\s/g, "")}`}
                  key={index}
                >
                  <ListItem key={ele.name} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {/* <IconComponent/>// */}
                      </ListItemIcon>
                      <ListItemText primary={ele.name} />
                    </ListItemButton>
                  </ListItem>
                </Button>
                )
              })}
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to={"/"}>
                Destinations
              </Button>
            </>
          )}
        </List>
      </Drawer>
      <Main open={open}>
        
      </Main>
    </Box>
  );
}
