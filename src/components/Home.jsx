
import http from "../../utils/http";
import React, { useState, useEffect } from "react";
import Destinationdisplay from "./Destinationdisplay";
import Loading from "./Loading";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await http.get("/destinations");
        setDestinations(response.data);
        setLoading(false); // Data fetched, set loading to false
      } catch (err) {
        console.log(err);
        setLoading(false); // Error occurred, stop loading
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {loading ? ( // Show loading indicator while loading is true
          <div>
            <Loading /> Loading...
          </div>
        ) : (
          destinations.map((data, index) => (
            <div
              className="card col-lg-3 col-sm-5"
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "10px",
              }}
              key={index}
            >
              <Destinationdisplay data={data} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;




