import {useState} from "react";
import { TwitterPicker } from 'react-color';
import {useFormikContext} from "formik"

function PickerField(props) {

  const formikProps = useFormikContext()

  const [background, setBackground] = useState(props.value)
  const [showPicker, setShowPicker] = useState(false)


  var handleChangeColor = (color) => {
    formikProps.setFieldValue("style", color.hex)
    setBackground(color.hex)
  };

  var handleClick = () => {
    setShowPicker(!showPicker)
  };
  var handleClick = () => {
    setShowPicker(!showPicker)
  };
  return (
      <>
        <div  className="picker_label">{props.header}</div>

        <div className="picker_swatch" style={{background}}  onClick={ handleClick }>
          <div className="picker_color" />
          { showPicker ? <div class="picker_popover">
            <div className="picker_cover" onClick={ handleClick }/>
              <TwitterPicker color={ background } onChange={ handleChangeColor } />
            </div> : null }
        </div>

      </>
  );
}

export default PickerField
