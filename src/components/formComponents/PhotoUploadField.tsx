import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { pickImage } from '../../utils/imagePicker';
import { Colors } from '../../styles/colors';
import { FontFamily, FontSize } from '../../styles/typography';

interface PhotoUploadFieldProps {
  label: string;
  onPhotoSelected: (
    photo: {
      uri: string;
      type?: string;
      name?: string;
    } | null
  ) => void;
  selectedPhoto: any;
  required?: boolean;
  placeholder?: string;
}

export const PhotoUploadField: React.FC<PhotoUploadFieldProps> = ({
  label,
  onPhotoSelected,
  selectedPhoto,
  required = false,
  placeholder = 'Tap to upload photo',
}) => {
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async () => {
    try {
      setLoading(true);
      const asset = await pickImage();

      if (asset) {
        const photoData = {
          uri: asset.uri || '',
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `photo_${Date.now()}.jpg`,
        };
        onPhotoSelected(photoData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      console.error('Image picker error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Remove',
        onPress: () => onPhotoSelected(null),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      {selectedPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: selectedPhoto.uri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewOverlay}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemovePhoto}
              disabled={loading}
            >
              <Text style={styles.removeButtonText}>✕ Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.changeButton}
              onPress={handlePhotoUpload}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.changeButtonText}>📷 Change</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePhotoUpload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.primary} size="large" />
          ) : (
            <>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>{placeholder}</Text>
              <Text style={styles.uploadSubtext}>or tap to select</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {selectedPhoto && (
        <Text style={styles.fileNameText}>✓ {selectedPhoto.name || 'Photo selected'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
  },
  required: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    minHeight: 150,
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center',
  },
  previewContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    minHeight: 150,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  changeButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#E74C3C',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  fileNameText: {
    fontSize: 12,
    color: '#27AE60',
    marginTop: 8,
    fontWeight: '500',
  },
});
