import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../styles/colors';
import { FontFamily, FontSize } from '../../styles/typography';

interface UploadedFile {
  name: string;
  size?: number;
  type?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface UploadStatusProps {
  files: UploadedFile[];
  title?: string;
  showEmpty?: boolean;
  onRetry?: (fileName: string) => void;
  onRemove?: (fileName: string) => void;
}

export const UploadStatus: React.FC<UploadStatusProps> = ({
  files,
  title = 'Upload Status',
  showEmpty = true,
  onRetry,
  onRemove,
}) => {
  if (files.length === 0 && !showEmpty) {
    return null;
  }

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'success':
        return '✓';
      case 'uploading':
        return '↻';
      case 'error':
        return '✕';
      case 'pending':
      default:
        return '○';
    }
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'success':
        return '#27AE60';
      case 'uploading':
        return Colors.primary;
      case 'error':
        return '#E74C3C';
      case 'pending':
      default:
        return '#95A5A6';
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      {files.length === 0 ? (
        showEmpty && <Text style={styles.emptyText}>No files uploaded yet</Text>
      ) : (
        <ScrollView style={styles.filesList} scrollEnabled={false}>
          {files.map((file, index) => (
            <View key={`${file.name}-${index}`} style={styles.fileItem}>
              <View style={styles.fileInfo}>
                <Text style={[styles.statusIcon, { color: getStatusColor(file.status) }]}>
                  {file.status === 'uploading' ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    getStatusIcon(file.status)
                  )}
                </Text>

                <View style={styles.fileDetails}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text style={styles.fileMetadata}>
                    {formatFileSize(file.size)} • {file.type}
                  </Text>
                  {file.status === 'uploading' && file.progress !== undefined && (
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${file.progress}%` }]} />
                    </View>
                  )}
                  {file.status === 'error' && file.error && (
                    <Text style={styles.errorText}>{file.error}</Text>
                  )}
                </View>
              </View>

              <View style={styles.actions}>
                {file.status === 'error' && onRetry && (
                  <TouchableOpacity style={styles.actionButton} onPress={() => onRetry(file.name)}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                )}
                {onRemove && (
                  <TouchableOpacity style={styles.actionButton} onPress={() => onRemove(file.name)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
  },
  filesList: {
    maxHeight: 300,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 12,
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
    minWidth: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 2,
  },
  fileMetadata: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  errorText: {
    fontSize: 11,
    color: '#E74C3C',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  retryButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    borderColor: Colors.primary,
  },
  removeButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E74C3C',
    borderColor: '#E74C3C',
  },
  emptyText: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
    paddingVertical: 8,
  },
});
