import React from 'react';
import {FlatList} from 'react-native';
import ListItem from '../components/ListItem';

const SearchResults = props => {
    const keyExtractor = (item, index) => index.toString();

    const onPressItem = index => {
        console.log("Pressed now: " + index);
    }
    const renderItem = ({item, index}) => {
        return (
           <ListItem item={item} index={index} onPressItem={onPressItem} /> 
        );
    };
    const {params} = props.navigation.state;
    return (
        <FlatList 
            data={params.listings}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    )
};

SearchResults.navigationOptions = {
    title: 'Results',
}

export default SearchResults;