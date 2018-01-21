import React, { Component } from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';

class EventListItem extends Component {

    onRowPress() {
        Actions.singleEvent({ event: this.props.event });
    }

    render() {

        const { title, description, image, date } = this.props.event;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <Card>
                        <CardSection>
                            <View style={styles.thumbnailContainer}>
                                <Image style={styles.thumbnailStyle}
                                    source={{ uri: image }}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.eventName}>{title}</Text>
                                <Text>{description.slice(0, 55) + '...'}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon name="info" />
                            </View>
                        </CardSection>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: .9
    },
    thumbnailStyle: {
        height: 50,
        width: 75
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    eventName: {
        fontSize: 17,
        fontWeight: 'bold',

    },
    iconContainer: {
        justifyContent: 'center'
    }
}

export default EventListItem;