import FormTextInput from "./FormTextInput";

export default FormTextInputPassword = ({ name, header }) => {
  return (
    <FormTextInput name={name} header={header} secureTextEntry={true}/>
  )
}