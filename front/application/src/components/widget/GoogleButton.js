import {ReactComponent as GoogleIcon}  from '../../assets/google.svg';
import AbstractButton from "./AbstractButton";
import tw from '../../../tailwind'

export default GoogleButton = ({ handleSubmit }) => {
  return (
    <AbstractButton onPress={handleSubmit}>
        <GoogleIcon style={tw`text-white`}/>
    </AbstractButton>
 )
}