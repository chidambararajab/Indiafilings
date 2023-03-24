import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, deviceWidth} from '../utils';

const ContactList = ({data, showDelete, clickHandler}) => {
  const selectHandlr = item => {
    clickHandler({
      ...item,
      isSelected:
        item?.isSelected === true || item?.isSelected === false
          ? !item?.isSelected
          : true,
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => selectHandlr(item)}
        style={[
          styles.item,
          {borderLeftWidth: item?.isSelected === true ? 10 : 0},
        ]}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{`${item?.first_name || ''} ${
            item?.last_name || ''
          }`}</Text>
          <Text style={styles.itemEmail}>{item?.email || ''}</Text>
        </View>
        {item?.isSelected === true && showDelete && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.delete}
            onPress={() => clickHandler({...item, isDeleted: true})}>
            <Text style={styles.itemText}>Delete</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => `${index}-${item.id}`;

  return (
    <FlatList
      data={[...data, ...data, ...data] || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      bounces={false}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        alert('end');
      }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: deviceWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: colors.black10,
    borderBottomWidth: 2,
  },
  textContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  itemText: {
    paddingVertical: 3,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  itemEmail: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
  delete: {
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactList;
