import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useStyles} from '../../../utils/hooks';
import {TColors} from '../../../utils/theme/colors';
import {Text, Touchable} from '../../../components';
import FastImage, {Source} from 'react-native-fast-image';

type ITabList = {
  contacts: Array<{id: string; avatar: Source}>;
  onPressItem: (item: any) => void;
};

const TabList: React.FC<ITabList> = ({contacts, onPressItem}) => {
  const [selectedTab, setSelectedTab] = useState('Contact');
  const {colors, styles} = useStyles(createStyles(selectedTab));

  return (
    <FlatList
      data={selectedTab === 'Contact' ? contacts : []}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      ListHeaderComponent={
        <View style={styles.containerTab}>
          <Touchable
            onPress={() => setSelectedTab('Contact')}
            style={styles.tabContact}>
            <Text color={colors.text}>Contact</Text>
          </Touchable>
          <Touchable
            disabled={true}
            onPress={() => setSelectedTab('Group')}
            style={styles.tabGroup}>
            <Text color={colors.grey}>Group</Text>
          </Touchable>
        </View>
      }
      renderItem={({item}) => (
        <Touchable
          onPress={() => onPressItem(item)}
          style={styles.containerContact}>
          <FastImage source={item.avatar} style={styles.avatar} />
          <View style={styles.itemContent}>
            <Text color={colors.text}>{item.name}</Text>
            <Text color={colors.text} fontSize={12}>
              {item.lastMessage}
            </Text>
          </View>
        </Touchable>
      )}
    />
  );
};

export default TabList;

const createStyles = (selectedTab: string) => (colors: TColors) =>
  StyleSheet.create({
    containerTab: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    tabContact: {
      borderBottomWidth: selectedTab === 'Contact' ? 2 : 0,
      borderBottomColor: selectedTab === 'Contact' ? 'white' : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
    tabGroup: {
      borderBottomWidth: selectedTab === 'Group' ? 2 : 0,
      borderBottomColor: selectedTab === 'Group' ? 'white' : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
    avatar: {width: 40, height: 40, borderRadius: 20},
    containerContact: {flexDirection: 'row', padding: 10},
    itemContent: {marginLeft: 10, gap: 2},
  });
