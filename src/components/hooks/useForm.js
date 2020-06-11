import { useState } from "react";

export const useForm = (fieldsData) => {
  const fieldsInitialState = () => {
    const fieldsObj = {};

    Object.keys(fieldsData).forEach((name) => {
      const { defaultValue, validator, ...rest } = fieldsData[name];
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

    Object.keys(fieldsData).forEach((key) => {
      const error = fieldsData[key].validator(formFields[key].value);

      newFieldsObj[key] = {
        ...formFields[key],
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

  return { formFields, validateForm, handleFieldChange };
};
