import React from 'react';
import {StyleSheet, Image, View, TouchableHighlight, Text} from 'react-native';
import Colors from '../constants/Colors';

const ListItem = props => {
    const { item } = props;
    const price = item.price_formatted.split(' ')[0];
    return (
        <TouchableHighlight 
            underlayColor="#dddddd"
            onPress={props.onPressItem.bind(this, props.index)}
        >
            <View>
                <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{ uri: item.img_url }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.price}>{price}</Text>
                        <Text styles={styles.title} numberOfLines={1}>{item.title}</Text>
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd',
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.primary
    },
    title: {
        fontSize: 20,
        color: '#656565',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
})

export default ListItem;