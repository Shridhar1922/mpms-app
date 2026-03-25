import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { styles } from './MyEmployees.styles.ts';
import { ChevronDownIcon, ChevronUpIcon } from './ExpandIcon';
import type { RootState } from '../../../redux/store';
import type { Employee } from '../../../redux/slices/employeesSlice';

export const MyEmployeesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Get employee list from Redux store
  const employees = useSelector((state: RootState) => state.employees.list);
  const loading = useSelector((state: RootState) => state.employees.loading);
  const error = useSelector((state: RootState) => state.employees.error);

  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeePhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (employee.designation?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
        (employee.department?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
        (employee.state?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
        (employee.employeeCode?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, employees]);

  const toggleExpanded = (id: string) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  const isExpanded = (id: string) => expandedIds.has(id);

  const renderEmployeeCard = ({ item }: { item: Employee }) => {
    const expanded = isExpanded(item.id);

    return (
      <View style={styles.employeeCard}>
        <TouchableOpacity
          style={[styles.cardHeaderButton, !expanded && { borderBottomWidth: 0 }]}
          onPress={() => toggleExpanded(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={styles.employeeInfo}>
              <Text style={styles.employeeName}>{item.user.name}</Text>
              <Text style={styles.detailValue}>{item.employeeEmail}</Text>
              {item.status && (
                <View style={styles.statusBadgeContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'active' ? styles.activeStatus : styles.inactiveStatus,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.expandIconContainer}>
              {expanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* Expanded View */}
        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.detailsGrid}>
              {item.designation && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Designation</Text>
                  <Text style={styles.detailValue}>{item.designation}</Text>
                </View>
              )}
              {item.department && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Department</Text>
                  <Text style={styles.detailValue}>{item.department}</Text>
                </View>
              )}
              {item.joiningDate && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Joining Date</Text>
                  <Text style={styles.detailValue}>
                    {new Date(item.joiningDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {item.employeePhone && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Phone</Text>
                  <Text style={styles.detailValue}>{item.employeePhone}</Text>
                </View>
              )}

              {item.country && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Country</Text>
                  <Text style={styles.detailValue}>{item.country}</Text>
                </View>
              )}
              {item.state && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>State</Text>
                  <Text style={styles.detailValue}>{item.state}</Text>
                </View>
              )}

              {item.salary && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Salary</Text>
                  <Text style={styles.detailValue}>
                    ₹{Number(item.salary).toLocaleString('en-IN')}
                  </Text>
                </View>
              )}
              {item.employeeCode && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Employee Code</Text>
                  <Text style={styles.detailValue}>{item.employeeCode}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No employees found</Text>
      <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
    </View>
  );

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="My Employees" showBackBtn={true} />

      <View style={styles.container}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, email, phone, or state..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Loading and Error States */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Employee Count */}
        <Text style={styles.employeeCount}>
          {filteredEmployees.length} {filteredEmployees.length === 1 ? 'Employee' : 'Employees'}
        </Text>

        {/* Employee List with Scroll */}
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployeeCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};
