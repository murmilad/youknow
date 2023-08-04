import { Field } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import FormError from "../FormError";
import { useFormikContext } from 'formik'
import FormInput from "../FormInput";
import tw from '../../../../../tailwind'

export default FormTextInput = ({ name, header, secureTextEntry }) => {
  const {touched, errors, getFieldProps} = useFormikContext();

  return (
    <FormInput name={name} > 
          <TextInput secureTextEntry={secureTextEntry} style={touched[name] && errors[name]
            ? tw`ml-5 mr-5 mt-2 mb-2 bg-red-50 border border-red-500 p-2 text-red-900 placeholder-red-700 text-lg rounded-lg block p-2.5`
            : tw`ml-5 mr-5 mt-2 mb-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg  `}
                placeholder={header}
                placeholderTextColor={tw.color('text-gray-300')}
                {...getFieldProps(name)} />
    </FormInput>
  )
}