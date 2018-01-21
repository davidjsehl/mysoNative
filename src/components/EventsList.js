import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { Card, CardSection } from './common';
// import { SearchBar } from 'react-native-elements';
import EventListItem from './EventListItem';
import { getEventsThunk } from '../reducers/eventReducer';
import firebase from 'firebase';

export class EventList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.getEventsThunk();
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    createDataSource({ events }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(events)
    }

    renderRow(event) {
        return <EventListItem event={event} />
    }

    handleSearchChange(value) {
        this.setState({ searchTerm: value })
    }


    render() {
        return (
            <View>
                {/* <SearchBar
                    placeholder='Type Here...'  
                    placeholderTextColor="white"
                    inputStyle={{ color: "white" }}
                    value={this.state.searchTerm}
                    onChangeText={this.handleSearchChange}
                /> */}
                <ListView 
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}


const EventListContainer = connect(mapStateToProps, { getEventsThunk })(EventList);
export default EventListContainer;

