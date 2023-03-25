import React, {Children, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';

import {colors} from '../utils';
import ContactList from './ContactList';
import Message from './Message';
import {useDispatch, useSelector} from 'react-redux';
import {initial} from '../redux/actions/initialActions';
import {TabView} from 'react-native-tab-view';

const Tab = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'List'},
    {key: 'second', title: 'Selected'},
    {key: 'third', title: 'Deleted'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Tab1 />;
      case 'second':
        return <Tab2 />;
      case 'third':
        return <Tab3 />;
      default:
        return null;
    }
  };

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

  const Tab1 = () => {
    const item = data.filter(_ => _?.isDeleted === false);
    if (item.length === 0) {
      const message = 'Delete a record to see record in tab 3';
      return <Message message={message} />;
    }
    return (
      <ContactList
        data={item}
        showDelete={index === 1}
        clickHandler={clickHandler}
        loadMoreItem={loadMoreItem}
        isLoading={isLoading}
      />
    );
  };

  const Tab2 = () => {
    const item = data.filter(
      _ => _?.isSelected === true && _?.isDeleted === false,
    );
    if (item.length === 0) {
      const message = 'Select a record to see record in tab 2';
      return <Message message={message} />;
    }
    return (
      <ContactList
        data={item}
        showDelete={index === 1}
        clickHandler={clickHandler}
        loadMoreItem={loadMoreItem}
        isLoading={isLoading}
      />
    );
  };

  const Tab3 = () => {
    const item = data.filter(_ => _?.isDeleted === true);
    if (item.length === 0) {
      const message = 'No Record Found';
      return <Message message={message} />;
    }
    return (
      <ContactList
        data={item}
        showDelete={index === 1}
        clickHandler={clickHandler}
        loadMoreItem={loadMoreItem}
        isLoading={isLoading}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
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
