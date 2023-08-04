import { Text, Pressable } from "react-native";
import tw from '../../../tailwind'

export default AbstractButton = ({ children, header, onPress }) => {
  return (
    <Pressable style={tw`ml-5 mr-5 mt-2 mb-2 bg-blue-700 rounded-lg w-full w-auto px-5 py-2.5 `}
      onPress={onPress}>
      {header &&
        <Text style={tw`text-white text-lg font-medium text-center`}>{header}</Text>
      }
      {children}
    </Pressable>
  )
}