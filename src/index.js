import "./styles.css";

import {Formik, Form, useField} from 'formik';
import React from "react";
import ReactDOM from "react-dom";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: "checkbox"});
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const MySelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className={props.className} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const SignupForm = () => {
  return (
    <>
      <h1>Subscribe</h1>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          acceptedTerms: false,
          jobType: ""
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions"),
          jobType: Yup.string()
            .oneOf(["designer", "development", "product", "other"], "Invalid type")
            .required("Required")
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400)
        }}
      >
        <Form>
          <MyTextInput
            name="firstName"
            label="First name:"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            name="lastName"
            label="Last name:"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            name="email"
            label="Email:"
            type="email"
            placeholder="example@mail.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Seletc a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
