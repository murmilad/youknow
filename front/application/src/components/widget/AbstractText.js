import { Text } from 'react-native';
import tw from '../../../tailwind'

export default AbstractText = ({ children }) => {
  return (
    <Text style={tw`text-gray-500 dark:text-gray-400`}>{children}</Text>
  )
}