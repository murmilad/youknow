import { connect, useDispatch } from 'react-redux'
import { View } from 'react-native'

import { useTranslation } from 'react-i18next'
import AuthScreen from '../components/AuthScreen';
import AbstractText from '../components/widgets/AbstractText';
import Screen from '../components/Screen';
const { t, i18n } = useTranslation();

function Feed({status}) {
    const dispatch = useDispatch();


    return (
        <Screen >
            <AbstractText>{t('header.application')}</AbstractText>
        </Screen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default FeedScreen = connect(mapStateToProps)(Feed)

