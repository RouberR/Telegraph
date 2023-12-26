import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';
import {Text, Touchable} from '.';
import {UsersData} from '../api/Chat/ChatType';

type IContactList = {
  contacts: Array<UsersData>;
  onPressItem: (item: UsersData) => void;
  showHeader?: boolean;
};

const ContactList: React.FC<IContactList> = ({
  contacts,
  onPressItem,
  showHeader = false,
}) => {
  const [selectedTab, setSelectedTab] = useState('Contact');
  const {colors, styles} = useStyles(createStyles(selectedTab));

  return (
    <FlatList
      data={selectedTab === 'Contact' ? contacts : []}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      ListHeaderComponent={
        showHeader ? (
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
        ) : (
          <></>
        )
      }
      renderItem={({item}) => (
        <Touchable
          onPress={() => onPressItem(item)}
          style={styles.containerContact}>
          <FastImage source={{uri: item.avatarUrl}} style={styles.avatar} />
          <View style={styles.itemContent}>
            <Text
              fontSize={12}
              color={colors.text}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text color={colors.text} fontSize={14}>
              {item.userName}
            </Text>
            {/* <Text color={colors.text} fontSize={12}>
              {item.lastMessage}
            </Text> */}
          </View>
        </Touchable>
      )}
    />
  );
};

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
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.white,
    },
    containerContact: {flexDirection: 'row', padding: 10},
    itemContent: {marginLeft: 10, gap: 4},
  });

export default ContactList;
