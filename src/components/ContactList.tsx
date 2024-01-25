import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useAppSelector, useStyles } from '../utils/hooks';
import { TColors } from '../utils/theme/colors';
import { Text, Touchable } from '.';
import { ParticipantType, UsersData } from '../api/Chat/ChatType';
import { UserProfile } from '../api/Profile/ProfileType';
import { composeUserDisplayName } from '../utils/stringsValidation';

type IContactList = {
  data: ParticipantType[];
  onPressItem: (item: ParticipantType) => void;
};

const ContactList: React.FC<IContactList> = ({ data, onPressItem }) => {
  const [selectedTab, setSelectedTab] = useState('Contact');
  const { colors, styles } = useStyles(createStyles(selectedTab));
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <Touchable onPress={() => onPressItem(item)} style={styles.containerContact}>
            <FastImage
              source={{
                uri: item?.avatarUrl,
              }}
              style={styles.avatar}
            />
            <View style={styles.itemContent}>
              <Text fontSize={12} color={colors.text}>
                {composeUserDisplayName(item?.firstName, item?.lastName, item?.userName)}
              </Text>

              <Text color={colors.text} fontSize={14}>
                {item?.userName}
              </Text>
            </View>
          </Touchable>
        );
      }}
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
      borderBottomColor: selectedTab === 'Contact' ? colors.default : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
    tabGroup: {
      borderBottomWidth: selectedTab === 'Group' ? 2 : 0,
      borderBottomColor: selectedTab === 'Group' ? colors.default : 'transparent',
      padding: 10,
      flex: 1,
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.default,
    },
    containerContact: { flexDirection: 'row', padding: 10 },
    itemContent: { marginLeft: 10, gap: 4 },
  });

export default ContactList;
