import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import http from "../../../../../utils/http";

// Validation schema using Yup
const validationSchema = Yup.object({
  from: Yup.string().required("From station is required"),
  to: Yup.string().required("To station is required"),
  date: Yup.date().required("Date is required").nullable(),
});

// Define station options
const stations = [
  { code: "HWH", name: "Howrah Junction (Kolkata)" },
  { code: "BPL", name: "Bhopal" },
  { code: "PNQ", name: "Pune" },
  { code: "JAB", name: "Jabalpur" },
  { code: "HYD", name: "Hyderabad" },
  { code: "KXH", name: "Kakinada" },
  { code: "BBS", name: "Bhubaneswar" },
  { code: "SBC", name: "Bangalore City" },
  { code: "GHT", name: "Ghatkopar" },
  { code: "CBE", name: "Coimbatore" },
  { code: "NDLS", name: "New Delhi" },
  { code: "BCT", name: "Mumbai (Bandra Terminus)" },
  { code: "MAS", name: "Chennai Egmore" },
];

const Train = () => {
  const { user } = useContext(AuthContext);
  const [train, setTrain] = React.useState([]);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { from, to, date } = values;
    setDate(date);
    const formattedDate = formatDate(date);

    const options = {
      method: "GET",
      url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
      params: {
        fromStationCode: from,
        toStationCode: to,
        dateOfJourney: formattedDate,
      },
      headers: {
        'x-rapidapi-key': '35d99a83fcmsh87c28c3b6e5653ep1e1500jsn71a795513488',
        'x-rapidapi-host': 'irctc1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTrain(response.data.data);
      setSuccess("Train search completed successfully!");
      setError("");
    } catch (error) {
      console.error("API Request Error:", error);
      setError(
        `Error searching for trains: ${
          error.response?.data?.message || error.message
        }`
      );
      setSuccess("");
    }
    setIsLoading(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`; // Adjust format as needed
  };
  const handlebook = async (train) => {
    
    const data = {
      from: train.from_station_name,
      to: train.to_station_name,
      date:date , // Convert to ISO format
      transportation: "Train",
    };
    await http
      .post(`/booking/${user._id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("booked successfully");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Train Booking
      </Typography>
      <Formik
        initialValues={{ from: "", to: "", date: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <FormControl fullWidth margin="normal">
              <InputLabel>From</InputLabel>
              <Field
                name="from"
                as={Select}
                label="From"
                value={values.from}
                onChange={(e) => setFieldValue("from", e.target.value)}
                error={touched.from && Boolean(errors.from)}
              >
                {stations.map((station) => (
                  <MenuItem key={station.code} value={station.code}>
                    {station.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>To</InputLabel>
              <Field
                name="to"
                as={Select}
                label="To"
                value={values.to}
                onChange={(e) => setFieldValue("to", e.target.value)}
                error={touched.to && Boolean(errors.to)}
              >
                {stations.map((station) => (
                  <MenuItem key={station.code} value={station.code}>
                    {station.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <Field
              name="date"
              as={TextField}
              type="date"
              label="Date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              helperText={touched.date ? errors.date : ""}
              error={touched.date && Boolean(errors.date)}
              onChange={(e) => setFieldValue("date", e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Search Trains
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/travelbooking")}
              fullWidth
              sx={{ mt: 2 }}
            >
              Go Back
            </Button>
            {isLoading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            <Grid container spacing={2} mt={2}>
              {train.length > 0 &&
                train.map((train, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardHeader
                        title={`Train Name: ${train.train_name}`}
                        subheader={`Train Number: ${train.train_number}`}
                      />
                      <CardContent>
                        <Typography variant="body2">
                          <strong>Date:</strong> {train.train_date}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Departure Time:</strong> {train.from_sta}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Arrival Time:</strong> {train.to_sta}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Duration:</strong> {train.duration}
                        </Typography>
                        <Typography variant="body2">
                          <strong>From Station:</strong>{" "}
                          {train.from_station_name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>To Station:</strong> {train.to_station_name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Distance:</strong> {train.distance}
                        </Typography>
                      </CardContent>
                      <Button onClick={()=>{handlebook(train)}}>Book Train</Button>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Train;
