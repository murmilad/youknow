import { connect, useDispatch } from 'react-redux'
import { View } from 'react-native'

import { useTranslation } from 'react-i18next'
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widgets/AbstractText';
import AbstractButton from '../../components/widgets/AbstractButton';

const { t, i18n } = useTranslation();

function VerifyScreen({status}) {
    const dispatch = useDispatch();

    const handleVerify = () => {
        dispatch({
            type: 'VERIFY', payload: {
                reset: {
                    verifyHash: navigation.getParam("verifyHash"),
                }
            }
        })
    }

    return (
        <AuthScreen >
            <AbstractText>{t('header.verify')}</AbstractText>
            <AbstractButton header={t('action.verify')} onPress={handleVerify} />
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default VerifyScreen = connect(mapStateToProps)(Verify)

