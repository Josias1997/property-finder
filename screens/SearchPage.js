import React, {useState} from 'react';
import {StyleSheet, 
    Text, TextInput, View, Button, 
ActivityIndicator, Image} from 'react-native';
import Colors from '../constants/Colors';
import { urlForQueryAndPage } from '../utilities/urlForQueryAndPage';
import { setState } from 'expect/build/jestMatchersObject';

const SearchPage = props => {
    const [searchString, setSearchString] = useState('London');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeTextHandler = searchText => {
        console.log('onSearchTextChanged');
        setSearchString(searchText);
        console.log('Current: ' + searchString + ', Next: ' + searchText);
    }

    const executeQuery = query => {
        console.log(query);
        setIsLoading(true);
        fetch(query)
        .then(response => response.json()
        .then(json => handleResponse(json.response)))
        .catch(error => {
            setIsLoading(false);
            setMessage('Something bad happened' + error);
        })
    };
    const onSearchPressed = () => {
        const query = urlForQueryAndPage('place_name', searchString, 1);
        executeQuery(query);
    };

    const handleResponse = response => {
        setIsLoading(false);
        setMessage('');
        if (response.application_response_code.substr(0, 1) === '1') {
            props.navigation.navigate('Results', {
                listings: response.listings,
            })
        }
        else {
            setMessage('Location not recognised; please try again');
        }
    }

    const spinner = isLoading ? <ActivityIndicator size='large' /> : null;

    return (
        <View style={styles.container}>
            <Text style={styles.description}>
                Search for houses to buy!
            </Text>
            <Text style={styles.description}>
                Search by place-name or postcode.
            </Text>
            <View style={styles.floatRight}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.searchInput}
                    value={searchString}
                    placeholder='Search via name or postcode'
                    onChangeText={onChangeTextHandler}
                />
                <Button 
                    onPress= {onSearchPressed}
                    color={Colors.primary}
                    title='Go'
                />
            </View>
            <Image source={require('./../ressources/house.png')}
                style={styles.image}
                />
            {spinner}
            <Text style={styles.description}>{message}</Text>
        </View>
    )
};
SearchPage.navigationOptions = {
    title: 'Property Finder'
};

const styles = StyleSheet.create({
    description: {
      fontSize: 18,
      textAlign: 'center',
      color: '#656565',
      marginBottom: 20,
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    floatRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        color: Colors.primary,
        textAlign: 'center',
    },
    image: {
        width: 217,
        height: 138,
    },
  });

export default SearchPage;