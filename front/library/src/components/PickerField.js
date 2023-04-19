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

        <div className="picker_swatch" style={{background}}  onClick={ handleClick }>
          <span className="picker_placeholder" >{props.header}</span>
          { showPicker ? <div class="picker_popover">
            <div className="picker_cover" onClick={ handleClick }/>
              <TwitterPicker colors={['#F3F8FF', '#DEECFF', '#C6CFFF', '#E8D3FF', '#CDF0EA', '#F9F9F9', '#F6C6EA', '#FFF6BD', '#CEEDC7', '#B2C8DF']} color={ background } onChange={ handleChangeColor } />
            </div> : null }
        </div>

      </>
  );
}

export default PickerField
