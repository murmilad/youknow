import {useState} from "react";
import {createKnowtype} from "../../actions/knowtype-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"

function CreateKnowtypeForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [style, setStyle] = useState("")

  return (
    <Formik
      initialValues = {{
        name: '',
        style: '',
      }}
      onSubmit ={ values => {
        dispatch({type: 'CREATE_KNOWTYPE', knowtype: {
          title: values.name,
          author: values.style
        }})
        setName("")
        setStyle("")
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          style: yup.string().required(),
        })
      }
    >
      <Form className="create_form row" >
      <div className="create_form_wrapper">
      <Field name="name">
      {({
      field,
      form: { touched, errors },
      meta,
      }) => (
          <div className="create_input col-md-6" >
          <label htmlFor="name" className="form-label">Name</label>
          <input className="form-control" {...field} />
          {meta.touched && meta.error && ( <span className="form_error">This field is required</span>)}
        </div>
      )}
      </Field>
      <Field name="style">
      {({
      field,
      form: { touched, errors },
      meta,
      }) => (
          <div className="create_input col-md-6">
          <label htmlFor="style" className="form-label">Style</label>
          <input className="form-control" {...field} />
          {meta.touched && meta.error && ( <span className="form_error">This field is required</span>)}
        </div>
      )}
      </Field>
      <div className="create_form_add_btn_wrapper">
            <button type="submit" className="btn btn-primary">Create Know Type</button>
        </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateKnowtypeForm