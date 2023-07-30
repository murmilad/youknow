import { connect, useDispatch } from 'react-redux'
import { View } from 'react-native'

import { useTranslation } from 'react-i18next'
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widgets/AbstractText';

const { t, i18n } = useTranslation();

function SignedUp(props) {
    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <AbstractText>{t('header.reseted')}</AbstractText>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default SignedUpScreen = connect(mapStateToProps)(SignedUp)

