import { Field } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import FormError from "./FormError";
import { useFormikContext } from 'formik'


export default FormTextInput = ({ name, children }) => {

  return (
    <Field name={name} >
      {({
        field,
        meta,
      }) => (<>
        {children}
        <FormError error={meta.error} visible={meta.touched} />
        </>
      )}
    </Field>
  )
}