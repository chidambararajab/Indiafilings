import React, {Children, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors, deviceWidth} from '../utils';
import ContactList from './ContactList';
import {Axios} from '../config';
import Message from './Message';
import {useDispatch, useSelector} from 'react-redux';
import {initial} from '../redux/actions/initialActions';

const Tab = () => {
  const dispatch = useDispatch();
  const _tabs = ['List', 'Selected', 'Deleted'];
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const initialData = useSelector(state => state.initialReducer);

  useEffect(() => {
    initialAPI();
    setIsLoading(true);
  }, [currentPage]);

  const initialAPI = useCallback(async () => {
    await dispatch(initial(currentPage));
    setIsLoading(true);
  }, [currentPage]);

  useEffect(() => {
    if (isLoading && !initialData?.isLoading && initialData?.isError === null) {
      if (initialData.data?.total_pages >= currentPage) {
        const temp = initialData.data.data.map(_ => {
          return {..._, isSelected: false, isDeleted: false};
        });
        setData(previousState => [...(previousState || []), ...(temp || [])]);
        setTotalPage(initialData.data?.total_pages);
      }
      setIsLoading(false);
    }
    if (isLoading && !initialData?.isLoading && initialData?.isError !== null) {
      setIsLoading(false);
    }
  }, [initialData]);

  const loadMoreItem = () => {
    if (totalPage >= currentPage + 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const clickHandler = item => {
    const temp = data.filter(_ => _?.id !== item?.id);
    setData([...temp, item].sort((a, b) => a.id - b.id));
  };

  const handlePress = index => {
    setActiveIndex(index);
  };

  const filteredData = () => {
    if (activeIndex === 0) {
      return data.filter(_ => _?.isDeleted === false);
    }
    if (activeIndex === 1) {
      return data.filter(_ => _?.isSelected === true && _?.isDeleted === false);
    }
    if (activeIndex === 2) {
      return data.filter(_ => _?.isDeleted === true);
    }
  };

  const renderTabContent = ({item, showDelete}) => {
    if (item.length === 0) {
      const message =
        activeIndex === 1
          ? 'Select a record to see record in tab 2'
          : activeIndex === 2
          ? 'Delete a record to see record in tab 3'
          : 'No Record Found';
      return <Message message={message} />;
    }
    return (
      <ContactList
        data={item}
        showDelete={showDelete}
        clickHandler={clickHandler}
        loadMoreItem={loadMoreItem}
        isLoading={isLoading}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {Children.toArray(
          _tabs.map((_, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePress(index)}
              style={[
                styles.tabButton,
                {
                  borderBottomColor:
                    index === activeIndex ? colors.black : colors.gray,
                },
              ]}>
              <Text style={styles.tabButtonText}>{_}</Text>
            </TouchableOpacity>
          )),
        )}
      </View>
      {renderTabContent({item: filteredData(), showDelete: activeIndex === 1})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  subContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Tab;
