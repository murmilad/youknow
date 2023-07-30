import {ReactComponent as GithubIcon}  from '../../assets/github.svg';
import AbstractButton from "./AbstractButton";

export default FormButton = ({ handleSubmit }) => {
  return (
    <AbstractButton onPress={handleSubmit}>
        <GithubIcon style={tw`text-white`}/>
    </AbstractButton>
 )
}