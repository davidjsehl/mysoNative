import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class SingleEvent extends Component {
    render() {
        const { title, description, location, date, time, image } = this.props.event;
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <View style={styles.thumbnailContainer}>
                            <Image style={styles.thumbnailStyle}
                                source={{ uri: image }}
                                />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.eventTitle}>{title}</Text>
                            <Text>{location}</Text>
                            <Text>{date}</Text>
                        </View>
                    </CardSection>

                    <CardSection>
                        <Image style={styles.imageStyle}
                            source={{ uri: image }}
                            />
                    </CardSection>

                    <CardSection>
                        <Text>
                            {description}
                        </Text>
                    </CardSection>

                    <CardSection>
                        <Button>
                            Add To Memories
                        </Button>
                    </CardSection>

                    <CardSection>
                        <Button onPress={() => Actions.eventChatView({ event: this.props.event })}>
                            Chat
                        </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        )
    }
}

const styles = {
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: .75
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
    eventTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    imageStyle: {
        height: 275,
        flex: 1,
        width: null
    }
}

export default SingleEvent;