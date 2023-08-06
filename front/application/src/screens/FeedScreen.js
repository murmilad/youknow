import { connect, useDispatch } from 'react-redux'
import { View } from 'react-native'

import { useTranslation } from 'react-i18next'
import AbstractText from '../components/widget/AbstractText';
import Screen from '../components/Screen';

function Feed({status}) {
    const { t, i18n } = useTranslation();
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

