import { useContext, useMemo, useCallback } from "react";
import { FormContext } from "./Form";

const useField = name => {
  const { form, dispatch } = useContext(FormContext);
  const value = form.values[name];
  const error = form.errors[name];
  const setValue = useCallback(
    (value: any) =>
      dispatch({ type: "UPDATE_VALUE", payload: { name, value } }),
    [name, dispatch]
  );

  const field = useMemo(
    () => ({
      value,
      error,
      setValue
    }),
    [value, error, setValue]
  );

  return field;
};

export default useField;
