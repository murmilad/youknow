import { Field } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import FormError from "./FormError";
import { useFormikContext } from 'formik'


export default FormTextInput = ({name, children }) => {
  const {handleSubmit} = useFormikContext();

  return (
    <Field name={name} > 
            {children}
          <FormError error={errors[name]} visible={touched[name]} />
     </Field>
  )
}