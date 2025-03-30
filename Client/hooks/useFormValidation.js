// src/hooks/useFormValidation.js
import { useState } from 'react';

export const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(key => {
      const rules = validationRules[key];
      const value = values[key];

      if (rules.required && !value) {
        newErrors[key] = `${key} is required`;
      }

      if (rules.minLength && value.length < rules.minLength) {
        newErrors[key] = `${key} must be at least ${rules.minLength} characters`;
      }

      if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[key] = 'Invalid email format';
      }

      if (rules.passwordMatch && value !== values[rules.passwordMatch]) {
        newErrors[key] = 'Passwords do not match';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm
  };
};

export const passwordStrength = (password) => {
  let strength = 0;
  if (password.length > 7) strength++;
  if (password.match(/[a-z]+/)) strength++;
  if (password.match(/[A-Z]+/)) strength++;
  if (password.match(/[0-9]+/)) strength++;
  if (password.match(/[$@#&!]+/)) strength++;
  
  return strength;
};