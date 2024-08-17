import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../../../../../utils/http"
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import AuthContext from "../../../../context/AuthContext";

function Flight() {
  const {user}=useContext(AuthContext)
  const [flight, setFlight] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`; // Adjust format as needed
  };

  const options = {
    method: 'GET',
    // url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete',
    params: {
      originSkyId: from,
      destinationSkyId: to,
      originEntityId: '27544008',
      destinationEntityId: '27537542',
      cabinClass: 'economy',
      adults: passengers,
      sortBy: 'best',
      currency: 'INR',
      market: 'en-IN',
      countryCode: 'IN',
      date: formatDate(date) // Use formatted date
    },
    headers: {
      'x-rapidapi-key': '35d99a83fcmsh87c28c3b6e5653ep1e1500jsn71a795513488',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setFlight(response.data.data.itineraries); // Use itineraries from the response
      setSuccess("Flight search completed successfully!");
      setError("");
    } catch (error) {
      console.error("API Request Error:", error);
      setError(`Error searching for flights: ${error.response?.data?.message || error.message}`);
      setSuccess("");
    }
    setIsLoading(false);
  };

  const airportOptions = [
    { code: 'DEL', name: 'Delhi (DEL)' },
    { code: 'BOM', name: 'Mumbai (BOM)' },
    { code: 'BLR', name: 'Bengaluru (BLR)' },
    { code: 'MAA', name: 'Chennai (MAA)' },
    { code: 'CCU', name: 'Kolkata (CCU)' },
    { code: 'HYD', name: 'Hyderabad (HYD)' },
    { code: 'GOI', name: 'Goa (GOI)' },
    { code: 'JAI', name: 'Jaipur (JAI)' },
    { code: 'AMD', name: 'Ahmedabad (AMD)' },
    { code: 'COK', name: 'Kochi (COK)' },
  ];
  var source,destination
  const handlebook = async (flight) => {
    airportOptions.forEach( (airport) => {
      if (airport.code === from) {
        source=airport.name;
      }
      if (airport.code === to) {
        destination=airport.name;
          
      }
    })
    const data = {
      from: source,
      to: destination,
      date:date , 
      transportation: "Flight",
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
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Flight Booking
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="from-label">From</InputLabel>
          <Select
            labelId="from-label"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            label="From"
          >
            {airportOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="to-label">To</InputLabel>
          <Select
            labelId="to-label"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            label="To"
          >
            {airportOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          fullWidth
          label="Passengers"
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Search Flight"}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/travelbooking")}
          fullWidth
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </form>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Available Flights
      </Typography>
      {flight.length > 0 ? (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={3} justifyContent="center">
            {flight.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">Flight ID: {item.id}</Typography>
                    <Typography variant="body1">Price: {item.price.formatted}</Typography>
                  </CardContent>
                  <Button onClick={() => handlebook(item)}>Book Flight</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Typography>No flights found.</Typography>
      )}
    </Container>
  );
}

export default Flight;












// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Paper,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
// } from "@mui/material";

// function Flight() {
//   const [flight, setFlight] = useState([]);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [date, setDate] = useState("");
//   const [passengers, setPassengers] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split("-");
//     return `${year}-${month}-${day}`; // Adjust format as needed
//   };

//   const options = {
//     method: 'GET',
//     url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete',
//     params: {
//       originSkyId: from,
//       destinationSkyId: to,
//       originEntityId: '27544008',
//       destinationEntityId: '27537542',
//       cabinClass: 'economy',
//       adults: passengers,
//       sortBy: 'best',
//       currency: 'INR',
//       market: 'en-IN',
//       countryCode: 'IN',
//       date: formatDate(date) // Use formatted date
//     },
    // headers: {
    //   'x-rapidapi-key': 'abf69c4995mshcc3d252513a510dp1a1896jsnd84dcaad20b9',
    //   'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    // }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//       setFlight(response.data.data.itineraries); // Use itineraries from the response
//       setSuccess("Flight search completed successfully!");
//       setError("");
//     } catch (error) {
//       console.error("API Request Error:", error);
//       setError(`Error searching for flights: ${error.response?.data?.message || error.message}`);
//       setSuccess("");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Flight Booking
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="From"
//           value={from}
//           onChange={(e) => setFrom(e.target.value)}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="To"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Date"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Passengers"
//           type="number"
//           value={passengers}
//           onChange={(e) => setPassengers(e.target.value)}
//           margin="normal"
//           required
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           fullWidth
//           disabled={isLoading}
//           sx={{ mt: 2 }}
//         >
//           {isLoading ? <CircularProgress size={24} /> : "Book Flight"}
//         </Button>
//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//         {success && (
//           <Alert severity="success" sx={{ mt: 2 }}>
//             {success}
//           </Alert>
//         )}
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={() => navigate("/")}
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Go Back
//         </Button>
//       </form>
//       <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
//         Available Flights
//       </Typography>
//       {flight.length > 0 ? (
//         <Paper sx={{ p: 2 }}>
//           <Grid container spacing={3} justifyContent="center">
//             {flight.map((item, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="body1">Flight ID: {item.id}</Typography>
//                     <Typography variant="body1">Price: {item.price.formatted}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>
//       ) : (
//         <Typography>No flights found.</Typography>
//       )}
//     </Container>
//   );
// }

// export default Flight;







