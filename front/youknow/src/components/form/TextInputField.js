export default TextInputField = ({name}) => {
    return (
        <Field name={name} > 
        {({
          field,
          meta,
        }) => (
            <>
                <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-300 text-stone-200 text-base rounded-2 overflow-hidden`}
                placeholder={t('field.server')}
                placeholderTextColor={tw.color('stone-500')}
                {...field} />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </>
        )}
      </Field>
    )
}