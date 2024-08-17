import React, { useContext, useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import http from "../../../utils/http";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
});

function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await http.post("/user", values); // Send form values directly
      await login(values.email, values.password);
      navigate("/"); // Navigate to the feed page after successful registration and login
    } catch (err) {
      console.error("Registration failed", err);
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error);
      }
    } finally {
      setSubmitting(false); // Stop the submission state
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="name" />}
              error={!!ErrorMessage.name}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="email" />}
              error={!!ErrorMessage.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              helperText={<ErrorMessage name="password" />}
              error={!!ErrorMessage.password}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={isSubmitting}
            >
              Signup
            </Button>
            <div>
              <b>
                Already have an Account:
                <Button variant="text" component={Link} to="/login">
                  Login
                </Button>
              </b>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Signup;



