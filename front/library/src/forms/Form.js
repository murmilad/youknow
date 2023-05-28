import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

function FormPage({ children }) {
  const { t, i18n } = useTranslation();

  const is_loading = useSelector(state => state.is_loading)

  return (
    <>
    <div className="text-center">
      <img
        src="/images/logo_big.png"
        className="esc-logo slide-top center-block" alt="logo"
      />
    </div>
      {is_loading &&
        <div className="loading wrapper">
          <div className="loading progress" >
            <div className="progress-bar progressbar indeterminate">
            </div>
          </div>
        </div>
      }
      <div className="wrapper _wrapper">
        {is_loading && <div className="loading_fade"></div>}
        {children}
      </div>
    </>
  )
}
export default FormPage