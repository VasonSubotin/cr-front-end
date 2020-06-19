import { useState } from "react";

export const useForm = (fieldsData) => {
  const fieldsInitialState = () => {
    const fieldsObj = {};

    Object.keys(fieldsData).forEach((name) => {
      const { defaultValue, validator, validatorArgFields, ...rest } = fieldsData[name];
      fieldsObj[name] = {
        value: defaultValue || "",
        error: false,
        helperText: "",
        name: name,
        ...rest,
      };
    });

    return fieldsObj;
  };

  const [formFields, setFormFields] = useState(fieldsInitialState);

  const validateForm = () => {
    let isErrorFound = false;
    const newFieldsObj = {};

    Object.keys(fieldsData).forEach((name) => {
      let validatorArgs = [];
      if (fieldsData[name].validatorArgFields) {
        validatorArgs = fieldsData[name].validatorArgFields.map((arg) => formFields[arg].value);
      } else {
        validatorArgs = [formFields[name].value];
      }

      const error = fieldsData[name].validator(...validatorArgs);

      newFieldsObj[name] = {
        ...formFields[name],
        error: !!error,
        helperText: error,
      };

      if (error) {
        isErrorFound = true;
      }
    });

    setFormFields(newFieldsObj);

    return isErrorFound;
  };

  const handleFieldChange = ({ target: { value, name } }) => {
    setFormFields({
      ...formFields,
      [name]: {
        ...formFields[name],
        error: false,
        helperText: "",
        value,
      },
    });
  };

  const getFormFieldsValues = () => {
    let valuesObj = {};

    Object.keys(formFields).forEach((key) => {
      valuesObj[key] = formFields[key].value;
    });

    return valuesObj;
  };

  return { formFields, validateForm, handleFieldChange, getFormFieldsValues };
};
