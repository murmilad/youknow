import React from 'react';
import tw from '../../../tailwind'

import { Text } from 'react-native';


export default FormError = ({ error, visible }) => {
    if (!visible || !error) return null;

    return (
        <Text style={tw`mt-2 text-sm text-red-600 dark:text-red-500 font-medium`} >{error}</Text>
    )
}

