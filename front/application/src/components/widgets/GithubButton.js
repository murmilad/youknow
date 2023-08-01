import {ReactComponent as GithubIcon}  from '../../assets/github.svg';
import AbstractButton from "./AbstractButton";
import tw from '../../../tailwind'

export default GithubButton = ({ handleSubmit }) => {
  return (
    <AbstractButton onPress={handleSubmit}>
        <GithubIcon style={tw`text-white`}/>
    </AbstractButton>
 )
}