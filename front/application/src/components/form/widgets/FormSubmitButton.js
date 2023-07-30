import { useFormikContext } from 'formik'
import AbstractButton from '../../widgets/AbstractButton';

export default FormSubmitButton = ({ header }) => {
  const {handleSubmit} = useFormikContext();
  return (
    <AbstractButton onPress={handleSubmit}/>
 )
}