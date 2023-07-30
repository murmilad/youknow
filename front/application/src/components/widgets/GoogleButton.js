import {ReactComponent as GoogleIcon}  from '../../assets/google.svg';
import AbstractButton from "./AbstractButton";
export default FormButton = ({ handleSubmit }) => {
  return (
    <AbstractButton onPress={handleSubmit}>
        <GoogleIcon style={tw`text-white`}/>
    </AbstractButton>
 )
}