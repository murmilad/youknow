import { Field } from "formik";
import { Pressable } from "react-native";
import {ReactComponent as GoogleIcon}  from '../../assets/google.svg';

export default FormButton = ({ handleSubmit }) => {
  return (
    <Pressable style={tw`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        onPress={handleSubmit}>
        <GoogleIcon style={tw`text-white`}/>
    </Pressable>
 )
}