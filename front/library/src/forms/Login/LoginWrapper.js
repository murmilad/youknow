import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LogoBig  from '../../images/logo_big.png';

function LoginWrapper({ children }) {
  const { t, i18n } = useTranslation();

  const is_loading = useSelector(state => state.is_loading)

  return (
    <>
    <div className="logo_big text-center">
      <img src= {LogoBig}/>
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
export default LoginWrapper