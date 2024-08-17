import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
function Travelcard({ plan }) {
  console.log(plan);
  return (
    <>
      <div className="col-sm-12 ">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <h5>
              <b>Title:</b>
              {plan.title}
            </h5>
            <p>
              <b>Description:</b>
              {plan.description}
            </p>
            <p>
              <b>StartDate:</b>
              {plan.startDate}
            </p>
            <p>
              <b>EndDate:</b>
              {plan.endDate}
            </p>
            <p>
              <b>Destination:</b>
              {plan.destination}
            </p>
            <p>
              <b>Budget:</b>
              {plan.budget}
            </p>
            <p>
              <b>Activities:</b>
              {plan.activities.join(",")}
            </p>
            <p>
              <b>Accomodation:</b>
              {plan.accommodation}
            </p>
            <p>
              <b>Transportation:</b>
              {plan.transportation}
            </p>
            <p>{plan.notes}</p>
          </CardContent>
        </Card>{" "}
      </div>
    </>
  );
}
export default Travelcard;
