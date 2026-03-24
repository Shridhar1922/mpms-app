import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { HolidaysList } from '../../../components/dashboardComponents';
import { setHolidays } from '../../../redux/slices/dashboardSlice';
import { RootState } from '../../../redux/store';
import { useGetHolidaysQuery } from '../../../redux/api/dashboard.api';

export const HolidayScreen = () => {
  const dispatch = useDispatch();
  const { holidays } = useSelector((state: RootState) => state.dashboard);

  // Fetch holidays from API
  const { data: holidaysData } = useGetHolidaysQuery(undefined);

  // Load holidays from API
  useEffect(() => {
    if (holidaysData?.data?.items.length > 0) {
      // Transform API data to match Holiday interface
      const transformedHolidays = holidaysData?.data?.items.map((holiday: any) => {
        // Normalize date to YYYY-MM-DD format
        let normalizedDate = holiday.date || '';
        if (normalizedDate) {
          const dateObj = new Date(normalizedDate);
          if (!isNaN(dateObj.getTime())) {
            normalizedDate = dateObj.toISOString().split('T')[0];
          }
        }

        return {
          id: holiday.id || Math.random().toString(),
          name: holiday.name || '',
          date: normalizedDate,
          description: holiday.description || '',
        };
      });

      console.log('Transformed holidays:', transformedHolidays);
      dispatch(setHolidays(transformedHolidays));
    }
  }, [holidaysData, dispatch]);

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Holidays" showBackBtn={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HolidaysList holidays={holidays} />
      </ScrollView>
    </View>
  );
};
