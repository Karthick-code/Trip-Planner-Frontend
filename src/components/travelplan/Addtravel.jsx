import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import http from "../../../utils/http";
import {useContext} from 'react'
import AuthContext from "../../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Addtravel(props) {
  const navigate=useNavigate();
  // const [travelplans,setTravelplans]=useState([]);
  const [open, setOpen] = useState(true);
  const { user } = useContext(AuthContext);
  //handling submit
  console.log(user._id)
  const handleClose = () => {
    setOpen(false);
    navigate("/travelplan");
  };
  const handleSubmit = (values) => {
    // event.preventDefault();
    const formdata = {
      user: user._id,
      title: values.title,
      description: values.description,
      startDate:values.startDate ,
      endDate:values.endDate ,
      destination: values.destination,
      budget:values.budget ,
      activities: values.activities,
      accommodation: values.accommodation,
      transportation: values.transportation,
      notes:values.notes ,
    };
    http.post("/travelplan", formdata)
    .then((res)=>{navigate("/travelplan");})
  }
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
    destination: Yup.string().required("Destination is required"),
    budget: Yup.number().required("Budget is required").positive("Budget must be positive"),
    activities: Yup.string().required("Activities are required"),
    accommodation: Yup.string().required("Accommodation is required"),
    transportation: Yup.string().required("Transportation is required"),
    notes: Yup.string(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      destination: "",
      budget: "",
      activities: "",
      accommodation: "",
      transportation: "",
      notes: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
      setOpen(false);
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Add New Travel Plan</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
            {(props.destination)?//props.destination is the destination of the user
            <TextField
            label="Destination"
            name="destination"
            fullWidth
            margin="normal"
            value={props.destination}
            // value={formik.values.destination}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.destination && Boolean(formik.errors.destination)}
            helperText={formik.touched.destination && formik.errors.destination}
          />:
            <TextField
              label="Destination"
              name="destination"
              fullWidth
              margin="normal"
              
              value={formik.values.destination}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.destination && Boolean(formik.errors.destination)}
              helperText={formik.touched.destination && formik.errors.destination}
            />}
            <TextField
              label="Budget"
              name="budget"
              fullWidth
              margin="normal"
              value={formik.values.budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.budget && Boolean(formik.errors.budget)}
              helperText={formik.touched.budget && formik.errors.budget}
            />
            <TextField
              label="Activities"
              name="activities"
              fullWidth
              margin="normal"
              value={formik.values.activities}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.activities && Boolean(formik.errors.activities)}
              helperText={formik.touched.activities && formik.errors.activities}
            />
            <TextField
              label="Accommodation"
              name="accommodation"
              fullWidth
              margin="normal"
              value={formik.values.accommodation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.accommodation && Boolean(formik.errors.accommodation)}
              helperText={formik.touched.accommodation && formik.errors.accommodation}
            />
            <TextField
              label="Transportation"
              name="transportation"
              fullWidth
              margin="normal"
              value={formik.values.transportation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.transportation && Boolean(formik.errors.transportation)}
              helperText={formik.touched.transportation && formik.errors.transportation}
            />
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              margin="normal"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button type="button" variant="outlined" color="secondary" fullWidth onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Travel Plan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Addtravel;

