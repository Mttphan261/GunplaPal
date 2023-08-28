import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const defaultProfilePics = [
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Amuro.png",
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Char.png",
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Haman.png",
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/RX78.png",
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Sayla.png",
    "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Suletta.png",
  ];

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    const randomIndex = Math.floor(Math.random() * defaultProfilePics.length);
    const profilePic = defaultProfilePics[randomIndex];

    const userData = {
      ...values,
      profile_pic: profilePic,
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Username or email is already in use");
        }
      })
      .then((data) => {
        setUser(data);
        navigate("/database");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Row>
        <Col md={4} className="signup-image-col">
          <img
            src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/b81929fca4087d492f6bd19531e83f5a1aefe30c/.github/images/general/SignIn.png"
            alt="Signup"
            className="signup-image"
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <h2 className="title">Signup</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form id="signup-form">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control form-field"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="form-control form-field"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="form-control form-field"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-field"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control form-field"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <button type="submit" className="btn btn-primary signup-button">
                    Submit
                  </button>
                </Form>
              </Formik>
              <p className="notification">Already a user?<span style={{"cursor": "pointer", "margin-left":"10px"}} onClick={() => navigate('/login')}>Sign In</span></p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
