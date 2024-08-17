import React from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button, TextField, Card } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from "yup";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddDestination = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.mixed().required("images is required"),
    location: Yup.string().required("Location is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    reference: Yup.string()
      .required("Reference is required")
      .url("Invalid URL format"),
  });

  // Formik hook for form state and handlers
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      images: "",
      location: "",
      rating: "",
      reference: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        images: formik.values.images.name,
        user: user._id,
      };
      console.log(data);
      http.post("/destinations", data).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    },
  });

  return (
    <Card>
      <h1>Add Destination</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload images
          <VisuallyHiddenInput 
            type="file" 
            name="images"
            onChange={(event) => {
              formik.setFieldValue("images", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
        </Button>
        {formik.touched.images && formik.errors.images ? (
          <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.images}</div>
        ) : null}

        <TextField
          label="Rating"
          variant="outlined"
          fullWidth
          margin="normal"
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
          helperText={formik.touched.rating && formik.errors.rating}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
          label="Reference"
          variant="outlined"
          fullWidth
          margin="normal"
          name="reference"
          placeholder="Please add Google Maps link"
          value={formik.values.reference}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reference && Boolean(formik.errors.reference)}
          helperText={formik.touched.reference && formik.errors.reference}
        />
        <Button variant="contained" type="submit">
          Add Destination
        </Button>
      </form>
    </Card>
  );
};

export default AddDestination;





// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import http from "../../utils/http";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import { Button } from "@mui/material";
// import { TextField } from "@mui/material";
// import { Card } from "@mui/material";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';


// function AddDestination() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setimages] = useState("");
//   const [location, setLocation] = useState("");
//   const [rating, setRating] = useState("");
//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });
//   const handleSubmit = () => {
//     const data = {
//       title,
//       description,
//       images,
//       user: user._id,
//       location,
//       rating,
//     };
//     console.log(data);
//     http.post("/destination", data).then((res) => {
//       console.log(res.data);
//     });
//     navigate("/destination");
//   };

//   return (
//     <Card>
//       <h1>Add Destination</h1>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="destination"
//           required
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <TextField
//           label="Description"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="description"
//           required
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <Button
//         component="label"
//         role={undefined}
//         variant="contained"
//         tabIndex={-1}
//         startIcon={<CloudUploadIcon />}>Upload images 
//         <VisuallyHiddenInput type="file" />
//         </Button>

//         {/* <TextField
//                     label="images"
//                     variant='outlined'
//                     fullWidth
//                     margin='normal'
//                     name='images'
//                     required
//                 /> */}
//         <TextField
//           label="Rating"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="rating"
//           required
//           onChange={(e) => setRating(e.target.value)}   
//         />
//         <TextField
//           label="Location"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="location"
//           required
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <TextField
//           label="Reference"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="reference"
//           required
//           placeholder="please add google maps link"
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <Button variant="contained" type="submit">
//           Add Destination
//         </Button>
//       </form>
//     </Card>
//   );
// }

// export default AddDestination;