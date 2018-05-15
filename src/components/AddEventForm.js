import React, { Component } from 'react';
import { View, Text, DatePickerIOS, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { InputField, Card, CardSection, Button } from './common';
import { eventUpdate, addEventThunk } from '../reducers/eventFormReducer';

class AddEventForm extends Component {

    onButtonPress() {
        const { title, description, location, date } = this.props;
        this.props.addEventThunk({ title, description, location, date })
    }

    _pickImage() {
        showImagePicker((response) => {
            if (!response.didCancel) {
                this.props.uploadEventThumbnail(response.uri, this.props.event.id)
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <ScrollView>
                <Card>
                    <CardSection>          
                        <InputField 
                            placeholder="Event Title"   
                            value={this.props.title}  
                            onChangeText={(text) => this.props.eventUpdate({ prop: 'title', value: text })}

                        />
                    </CardSection>
                        
                    <CardSection>          
                        <InputField style={{ paddingLeft: 5 }}
                            placeholder="Description" 
                            value={this.props.description} 
                            onChangeText={(text) => this.props.eventUpdate({ prop: 'description', value: text })}
   
                        />
                    </CardSection>

                    <CardSection>          
                        <InputField 
                            placeholder="Location"     
                            value={this.props.location}
                            onChangeText={(text) => this.props.eventUpdate({ prop: 'location', value: text })}
                        />
                    </CardSection>

                    <CardSection style={{ justifyContent: 'center' }}>
                        <Text style={styles.pickerLabelStyle}>Select Date and Time</Text>
                    </CardSection>

                    <DatePickerIOS 
                        date={this.props.date}
                        onDateChange={(newDate) => this.props.eventUpdate({ prop: 'date', value: newDate })}
                    />

                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Add Event
                        </Button>
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Choose Photo
                        </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        )
    }
}

const styles = {
    pickerLabelStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 18
    }
}


const mapStateToProps = (state) => {
    const { title, description, location, date } = state.eventForm;
    return {
        title,
        description,
        location,
        date
    }
}

const AddEventFormContainer = connect(mapStateToProps, { eventUpdate, addEventThunk })(AddEventForm);
export default AddEventFormContainer;