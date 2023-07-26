import { Field } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import FormError from "../FormError";
import { useFormikContext } from 'formik'
import FormInput from "../FormInput";

export default FormTextInput = ({ name, header }) => {
  const {touched, errors, getFieldProps} = useFormikContext();

  return (
    <FormInput name={name} > 
          <TextInput style={touched[name] && errors[name]
            ? tw`bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500`
            : tw`block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={header}
                placeholderTextColor={tw.color('text-gray-300')}
                {...getFieldProps(name)} />
    </FormInput>
  )
}