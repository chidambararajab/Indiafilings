import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors, deviceWidth} from '../utils';
import FImage from './FImage';

const ContactList = ({
  data,
  showDelete,
  clickHandler,
  isLoading,
  loadMoreItem,
}) => {
  const selectHandler = item => {
    if (item?.isDeleted) {
      alert('Item already Deleted');
    } else {
      clickHandler({
        ...item,
        isSelected:
          item?.isSelected === true || item?.isSelected === false
            ? !item?.isSelected
            : true,
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => selectHandler(item)}
        style={[
          styles.item,
          {borderLeftWidth: item?.isSelected === true ? 10 : 0},
        ]}>
        <View style={styles.userDetails}>
          <FImage
            source={{uri: item?.avatar}}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>{`${item?.first_name || ''} ${
              item?.last_name || ''
            }`}</Text>
            <Text style={styles.itemEmail}>{item?.email || ''}</Text>
          </View>
        </View>
        {item?.isSelected === true && showDelete && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.delete}
            onPress={() =>
              clickHandler({...item, isDeleted: true, isSelected: false})
            }>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    ) : null;
  };

  const keyExtractor = (item, index) => `${index}-${item.id}`;

  return (
    <FlatList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0.1}
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
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: '400',
    color: colors.black,
  },
  itemEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  delete: {
    backgroundColor: colors.red,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  userDetails: {flexDirection: 'row'},
});

export default ContactList;
