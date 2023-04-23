import { useFormikContext } from 'formik'
import { useEffect } from 'react'

const ErrorInterceptor = (props) => {
    const { isValid, isValidating } = useFormikContext()

    useEffect(() => {
        if (!isValidating) {
            props.intercept(isValid)
        }
    }, [isValid, isValidating])

    return null
}

export default ErrorInterceptor