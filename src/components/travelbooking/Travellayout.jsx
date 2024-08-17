import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import {Card, CardContent} from "@mui/material";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import AuthContext from "../../context/AuthContext";
import http from "../../../utils/http";
import { useEffect,useState } from "react";

const drawerWidth = 240;
const navItems = ["Flight", "Train", "Bus"];

function DrawerAppBar(props) {
  const { user } = React.useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  useEffect(() => {
    http.get(`/booking/${user._id}`).then((res) => setBookings(res.data));
    console.log(bookings);
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav" style={{ marginTop: "80px" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Travel booking
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={`/travel/${item.toLowerCase().replace(/\s/g, "")}`}
                  sx={{ color: "#fff" }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1, overflow: "hidden" }} style={{ marginTop: "120px" }}>
        {/* <Box component="main" sx={{ p: 3 }} style={{ marginTop: "120px" }}>
          <h4>Welcome to travel booking page!</h4>
        </Box> */}
        <h1>Booking History</h1>
        {bookings?(bookings.map((booking) => (
          <Paper sx={{ p: 2, margin: 2, flexGrow: 1, overflow: "hidden" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  <b>ID: </b>{booking._id}<br />
                  <b>Transport: </b>{booking.transportation}<br />
                  <b>User: </b>{booking.user}<br/>
                  <b>From: </b>{booking.from}<br/>
                  <b>To: </b>{booking.to}<br/>
                  <b>Date: </b>{booking.date}<br />
                  </Typography>
                  </CardContent>
            </Card>
            </Paper>
        ))):(
          <div>
            <h4>No bookings found.</h4>
          </div>
        )}

      </Paper>
    </Box>
  );
}

export default DrawerAppBar;
