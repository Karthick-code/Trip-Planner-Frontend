import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthContext from "../../../context/AuthContext";
import http from '../../../../utils/http'; // Adjust the import based on your setup
import {
  Container,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const AccommodationForm = () => {
  const { user } = React.useContext(AuthContext);
  const [accommodations, setAccommodations] = useState({});
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const destinations = [
    "Udaipur, Rajasthan", "Kerala Backwaters", "Rishikesh, Uttarakhand", "Goa", "Agra, Uttar Pradesh",
    "Mysore, Karnataka", "Varanasi, Uttar Pradesh", "Darjeeling, West Bengal", "Andaman and Nicobar Islands",
    "Amritsar, Punjab", "Pondicherry", "Nainital, Uttarakhand", "Munnar, Kerala", "Shillong, Meghalaya",
    "Hampi, Karnataka", "Mahabalipuram, Tamil Nadu", "Gokarna, Karnataka"
  ];

  const initialValues = {
    destination: '',
    accommodationType: '',
  };

  const bookingInitialValues = {
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '',
  };

  const validationSchema = Yup.object({
    destination: Yup.string().required('Destination is required'),
    accommodationType: Yup.string().required('Accommodation type is required'),
  });

  const bookingValidationSchema = Yup.object({
    checkInDate: Yup.date().required('Check-in date is required').min(new Date(), 'Check-in date must be today or later'),
    checkOutDate: Yup.date().required('Check-out date is required').min(Yup.ref('checkInDate'), 'Check-out date must be after check-in date'),
    numberOfGuests: Yup.number().required('Number of guests is required').positive('Must be a positive number').integer('Must be an integer'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Submitted with values:', values);

    const { destination, accommodationType } = values;

    // Check if the destination and type exist in the data
    if (!accommodations[destination]) {
      console.warn('Destination not found:', destination);
      setFilteredAccommodations([]);
      setSubmitting(false);
      return;
    }

    const filtered = accommodations[destination][accommodationType] || [];

    console.log('Filtered Accommodations:', filtered);
    setFilteredAccommodations(filtered);
    setSelectedPlace(null); // Reset selected place
    setSubmitting(false);
  };

  const handleBookingSubmit = (values, { setSubmitting }) => {
    setBookingDetails(values);
    setSubmitting(false);

    const booking_data = {
      user: user._id,
      ...values
    }

    console.log('Booking Details:', booking_data);

    http.post("/book-accomodations", booking_data)
      .then((res) => {
        console.log(res.data);
        if (res) {
          alert('Booking successful');
        } else {
          alert(`Error: ${res.message}`);
        }
      })
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await http.get('/accomodation'); // Adjust the endpoint as needed
        console.log('Fetched Accommodations:', res.data);

        // Transform the array into the required format
        const data = {};
        res.data.forEach(item => {
          Object.keys(item).forEach(destination => {
            data[destination] = item[destination];
          });
        });

        setAccommodations(data);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleAccommodationSelect = (accommodation) => {
    setSelectedPlace(accommodation);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Accommodation Booking
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="destination-label">Destination</InputLabel>
                  <Select
                    labelId="destination-label"
                    id="destination"
                    name="destination"
                    value={values.destination}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Destination"
                  >
                    <MenuItem value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {destinations.map((destination, index) => (
                      <MenuItem key={index} value={destination}>{destination}</MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="destination" component="div" className="error" />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="accommodationType-label">Accommodation Type</InputLabel>
                  <Select
                    labelId="accommodationType-label"
                    id="accommodationType"
                    name="accommodationType"
                    value={values.accommodationType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Accommodation Type"
                  >
                    <MenuItem value="">
                      <em>Select an option</em>
                    </MenuItem>
                    <MenuItem value="hotels">Hotel</MenuItem>
                    <MenuItem value="vacation_rentals">Vacation Rental</MenuItem>
                    <MenuItem value="hostels">Hostel</MenuItem>
                  </Select>
                  <ErrorMessage name="accommodationType" component="div" className="error" />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {filteredAccommodations.length > 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Available Accommodations
          </Typography>
          <Grid container spacing={2}>
            {filteredAccommodations.map((acc, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">{acc.name}</Typography>
                <Typography variant="body1">{acc.description}</Typography>
                <Button variant="outlined" onClick={() => handleAccommodationSelect(acc)}>
                  Select
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {selectedPlace && (
        <Formik
          initialValues={bookingInitialValues}
          validationSchema={bookingValidationSchema}
          onSubmit={handleBookingSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form>
              <Typography variant="h5" gutterBottom>
                Book {selectedPlace.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="checkInDate"
                    name="checkInDate"
                    label="Check-in Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.checkInDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="checkInDate" component="div" className="error" />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="checkOutDate"
                    name="checkOutDate"
                    label="Check-out Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.checkOutDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="checkOutDate" component="div" className="error" />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="numberOfGuests"
                    name="numberOfGuests"
                    label="Number of Guests"
                    type="number"
                    value={values.numberOfGuests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="numberOfGuests" component="div" className="error" />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}

      {bookingDetails && (
        <div>
          <Typography variant="h5" gutterBottom>
            Booking Confirmation
          </Typography>
          <Typography variant="body1">Booking for {selectedPlace.name}</Typography>
          <Typography variant="body1">Check-in: {bookingDetails.checkInDate}</Typography>
          <Typography variant="body1">Check-out: {bookingDetails.checkOutDate}</Typography>
          <Typography variant="body1">Number of Guests: {bookingDetails.numberOfGuests}</Typography>
          <Typography variant="body1">Thank you for your booking!</Typography>
        </div>
      )}
    </Container>
  );
};

export default AccommodationForm;

