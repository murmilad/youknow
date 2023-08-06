import { Field } from "formik";
import FormError from "./FormError";


export default FormField = ({ name, children }) => {

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