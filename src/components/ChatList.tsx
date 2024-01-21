import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useAppSelector, useStyles } from '../utils/hooks';
import { TColors } from '../utils/theme/colors';
import { Text, Touchable } from '.';
import { ChatResponse } from '../api/Chat/ChatType';
import { composeUserDisplayName } from '../utils/stringsValidation';

type IContactList = {
  data: ChatResponse[];
  onPressItem: (item: ChatResponse) => void;
  showUsername?: boolean;
};

const ChatList: React.FC<IContactList> = ({ data = [], onPressItem }) => {
  const { colors, styles } = useStyles(createStyles);
  const { id: userId } = useAppSelector((state) => state.user);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const participant = item?.participants?.users?.find((i) => i.id !== userId);
        return (
          <Touchable onPress={() => onPressItem(item)} style={styles.containerContact}>
            <FastImage
              source={{
                uri: participant?.avatarUrl,
              }}
              style={styles.avatar}
            />
            <View style={styles.itemContent}>
              <Text fontSize={12} color={colors.text}>
                {composeUserDisplayName(
                  participant?.firstName,
                  participant?.lastName,
                  participant?.userName
                )}
              </Text>

              <Text color={colors.text} fontSize={12}>
                {item?.lastMessage?.content}
              </Text>
            </View>
          </Touchable>
        );
      }}
    />
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
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

export default ChatList;
