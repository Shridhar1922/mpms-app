import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useGetUsersQuery } from '../redux/api/auth.api';
import { CommonStyles, Spacing } from '../styles/commonStyles';
import { FontFamily, FontSize } from '../styles/typography';

export const UserList = () => {
  const { data, isLoading, error } = useGetUsersQuery(undefined);

  if (isLoading) return <ActivityIndicator size="large" />;

  // This will catch the HTML Parsing Error you just received
  if (error) {
    return (
      <View>
        <Text>
          {'status' in error && error.status === 'PARSING_ERROR'
            ? 'Server blocked request (Cloudflare/HTML Response)'
            : 'An error occurred'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[Spacing.mV(50)]}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: { item: any }) => (
          <View style={[CommonStyles.container]}>
            <Text
              style={{
                fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
                fontSize: FontSize.S_10,
              }}
            >
              Title: {item.title}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.FONT_FAMILY_PRIMARY_LIGHT,
                fontSize: FontSize.XS_8,
              }}
            >
              {item.body}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
