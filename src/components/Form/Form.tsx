import React, { useReducer, useMemo, ReactNode } from "react";
import { isObjectEmpty } from "../../util";

type Props = {
  children: ReactNode;
  initValues: { [name: string]: any };
  validation?: { [name: string]: FieldValidation[] };
  onSubmit: (values: { [name: string]: any }) => void;
};

const Form = ({ children, initValues, validation = {}, onSubmit }: Props) => {
  const [form, dispatch] = useReducer<FormReducer>(formReducer, {
    values: initValues,
    errors: {}
  });

  const _onSubmit = () => {
    // validate fields
    const errors = {};

    Object.keys(validation).forEach(name => {
      for (let rule of validation[name]) {
        const value = form.values[name];

        if (rule.type === "required") {
          if (value.length === 0) {
            errors[name] = rule.errorText;
            break;
          }
        } else if (rule.type === "custom") {
          if (!rule.fn(form.values[name])) {
            errors[name] = rule.errorText;
            break;
          }
        }
      }
    });

    if (isObjectEmpty(errors)) {
      dispatch({ type: "UPDATE_ERRORS", payload: {} });
      onSubmit(form.values);
    } else {
      dispatch({ type: "UPDATE_ERRORS", payload: errors });
    }
  };

  const contextValue = useMemo(
    () => ({ form, dispatch, onSubmit: _onSubmit }),
    [form, dispatch, _onSubmit]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default Form;

export const FormContext = React.createContext<FormContextValue>(null);

type FormContextValue = {
  form: FormState;
  dispatch: React.Dispatch<any>;
};

type FormState = {
  values: { [name: string]: any };
  errors: {};
};

type FormReducer = (form: FormState, action: any) => FormState;

const formReducer = (form, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...form,
        values: { ...form.values, [action.payload.name]: action.payload.value }
      };
    }
    case "UPDATE_ERRORS": {
      return {
        ...form,
        errors: action.payload
      };
    }
  }

  return form;
};

type Validator = (value: any) => boolean;
type FieldValidation = { type: string; fn?: Validator; errorText: string };
