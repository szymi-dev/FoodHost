import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MoonLoader } from "react-spinners";
import { loginUser } from "../store/actions/authAction";
import styles from "./LoginForm.module.scss";

const LoginForm: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const theme = useTheme();
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      dispatch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loginUser({ email: formData.email, password: formData.password }) as any // to jest do poprawy na przyszłość
      );

      setValidationErrors({});
    } catch (errors) {
      if (errors instanceof Yup.ValidationError) {
        const formattedErrors: { [key: string]: string } = {};
        errors.inner.forEach(currentError => {
          if (currentError.path) {
            formattedErrors[currentError.path] = currentError.message;
          }
        });
        setValidationErrors(formattedErrors);
      }
    }
  };

  return (
    <div className={styles.section}>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Card
          sx={{
            width: "400px",
            height: "500px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",

            backgroundColor: theme.palette.background.default,
          }}
        >
          <CardContent>
            {" "}
            <Typography
              sx={{ letterSpacing: "1px", fontWeight: "bold" }}
              variant="h4"
            >
              LOGIN PAGE
            </Typography>
          </CardContent>
          <CardContent>
            <FormControl sx={{ width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type="text"
                name="email"
                onChange={handleInputChange}
              />
              <FormHelperText></FormHelperText>
              {validationErrors.email && (
                <FormHelperText>{validationErrors.email}</FormHelperText>
              )}
            </FormControl>
          </CardContent>
          <CardContent>
            <FormControl sx={{ width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {validationErrors.password && (
                <FormHelperText>{validationErrors.password}</FormHelperText>
              )}
            </FormControl>
          </CardContent>
          <CardContent>
            <p>You don't have account?</p>
            <Link underline="none" sx={{ cursor: "pointer" }}>
              Create account
            </Link>
          </CardContent>
          <CardContent>
            <Button
              sx={{ fontWeight: "bold", letterSpacing: "1px" }}
              type="submit"
              variant="contained"
            >
              {loading ? (
                <MoonLoader size={20} color="#ffffff" />
              ) : (
                <> Submit</>
              )}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default LoginForm;
