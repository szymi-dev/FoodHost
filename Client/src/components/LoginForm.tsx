import React, { useState } from "react";
import * as Yup from "yup";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

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
    login: Yup.string().required("Login is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Validation passed. Submitted data:", formData);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login:</label>
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleInputChange}
        />
        {validationErrors.login && (
          <div className="error">{validationErrors.login}</div>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {validationErrors.password && (
          <div className="error">{validationErrors.password}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
