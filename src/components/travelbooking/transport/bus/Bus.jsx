import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import http from "../../../../../utils/http";
import AuthContext from "../../../../context/AuthContext";

// Validation Schema using Yup
const validationSchema = Yup.object({
  startLocation: Yup.string().required("Start Location is required"),
  endLocation: Yup.string().required("End Location is required"),
  date: Yup.date().required("Date is required").nullable(),
});

function Bus() {
  const { user } = useContext(AuthContext);
  const [busData, setBusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [noData, setNoData] = useState(false);
  const [date, setDate] = useState("");
  const [startLocations, setStartLocations] = useState([]);
  const [endLocations, setEndLocations] = useState([]);

  // Fetch data from busses.json and extract unique locations
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await http.get("/bus/details"); // Update with the correct path
        const buses = response.data;

        const uniqueStartLocations = [...new Set(buses.map(bus => bus.StartLocation))];
        const uniqueEndLocations = [...new Set(buses.map(bus => bus.EndLocation))];

        setStartLocations(uniqueStartLocations);
        setEndLocations(uniqueEndLocations);
      } catch (err) {
        setError("Failed to fetch bus data");
      }
    };

    fetchBusData();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setDate(values.date);
    setIsLoading(true);
    setError("");
    setSuccess("");
    setNoData(false); // Reset noData state

    try {
      const response = await http.get("/bus", {
        params: {
          StartLocation: values.startLocation,
          EndLocation: values.endLocation,
        },
      });

      if (response.data.length === 0) {
        setNoData(true); // Set noData to true if no data is found
        setBusData([]); // Clear busData if no data
      } else {
        setBusData(response.data);
        setSuccess("Data loaded successfully");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
      setSubmitting(false); // Set submitting to false after request is complete
    }
  };

  const handleBook = async (bus) => {
    const data = {
      from: bus.StartLocation,
      to: bus.EndLocation,
      date: date, // Convert to ISO format
      transportation: "Bus",
    };
    await http
      .post(`/booking/${user._id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Booked successfully");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bus
      </Typography>
      <Formik
        initialValues={{ startLocation: "", endLocation: "", date: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Start Location</InputLabel>
                  <Field
                    as={Select}
                    name="startLocation"
                    label="Start Location"
                  >
                    {startLocations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <ErrorMessage name="startLocation">
                  {(msg) => <Typography color="error">{msg}</Typography>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>End Location</InputLabel>
                  <Field
                    as={Select}
                    name="endLocation"
                    label="End Location"
                  >
                    {endLocations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <ErrorMessage name="endLocation">
                  {(msg) => <Typography color="error">{msg}</Typography>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="date"
                  as={TextField}
                  type="date"
                  label="Date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  helperText={<ErrorMessage name="date" />}
                  error={Boolean(<ErrorMessage name="date" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <div>
        {isLoading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        {noData && <Typography>No data found</Typography>}
        {!noData && busData.length === 0 && (
          <Typography>Buses are available</Typography>
        )}
        {busData.length > 0 &&
          !noData &&
          busData.map((bus) => (
            <Paper key={bus.RouteID} style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="h6">{bus.RouteName}</Typography>
              <Typography>Start Location: {bus.StartLocation}</Typography>
              <Typography>End Location: {bus.EndLocation}</Typography>
              <Typography>
                Stop Locations: {bus.StopLocations.join(", ")}
              </Typography>
              <Typography>Schedule: {bus.Schedule}</Typography>
              <Button
                onClick={() => {
                  handleBook(bus);
                }}
              >
                Book Now
              </Button>
            </Paper>
          ))}
      </div>
    </Container>
  );
}

export default Bus;





