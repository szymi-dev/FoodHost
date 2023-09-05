import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import styles from "./RegisterForm.module.scss";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/authAction";
interface RegisterFormProps {
  changeFormHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  username: yup
    .string()
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required")
    .max(20, "Too long username"),
  confirm: yup
    .string()
    .required("Confirm password is required")
    .test("passwords-match", "Passwords must be the same!", function (value) {
      return this.parent.password === value;
    }),
});

const RegisterForm: React.FC<RegisterFormProps> = props => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("Form Values:", values);
      dispatch(
        registerUser({
          username: formik.values.username,
          email: formik.values.email,
          password: formik.values.password,
          confirmPassword: formik.values.confirm,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
      );

      // You can also display a message in the console
      console.log("Form submitted successfully!");
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.banner}>
            <h1>Signup</h1>
          </div>

          <TextField
            fullWidth
            autoComplete="off"
            variant="standard"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            sx={{ mt: 8 }}
            fullWidth
            autoComplete="off"
            variant="standard"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            variant="standard"
            sx={{ my: 8 }}
            autoComplete="off"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            autoComplete="off"
            variant="standard"
            name="confirm"
            label="Confirm Password"
            type="password"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            helperText={formik.touched.confirm && formik.errors.confirm}
          />
          <div className={styles.text_container}>
            <p>
              Already have an account?{" "}
              <button onClick={props.changeFormHandler} className={styles.link}>
                Login
              </button>
            </p>
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
