import React, { useContext } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState("");
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setServerError("User credentials are wrong");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
            {serverError && (
              <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
                {serverError}
              </Typography>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={isSubmitting}
            >
              Login
            </Button>
            <div>
              <b>
                Don't have an Account:
                <Button variant="text" component={Link} to="/signup">
                  Signup
                </Button>
              </b>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
