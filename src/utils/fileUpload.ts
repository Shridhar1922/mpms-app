import { Asset } from 'react-native-image-picker';

interface FileUploadData {
  uri: string;
  type?: string;
  name?: string;
}

/**
 * Convert a file URI to base64 string
 */
export const fileToBase64 = async (fileUri: string): Promise<string> => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting file to base64:', error);
    throw error;
  }
};

/**
 * Create FormData from file for multipart upload
 */
export const createFormData = (file: FileUploadData, fieldName: string): FormData => {
  const formData = new FormData();

  // Create the blob from the file URI for React Native
  const uriParts = file.uri.split('.');
  const fileExtension = uriParts[uriParts.length - 1];

  formData.append(fieldName, {
    uri: file.uri,
    type: file.type || `image/${fileExtension}`,
    name: file.name || `${fieldName}_${Date.now()}.${fileExtension}`,
  } as any);

  return formData;
};

/**
 * Create FormData from multiple files
 */
export const createMultipleFilesFormData = (
  files: Record<string, FileUploadData>,
  additionalData?: Record<string, any>
): FormData => {
  const formData = new FormData();

  // Add files
  Object.entries(files).forEach(([key, file]) => {
    if (file && file.uri) {
      const uriParts = file.uri.split('.');
      const fileExtension = uriParts[uriParts.length - 1];

      formData.append(key, {
        uri: file.uri,
        type: file.type || `image/${fileExtension}`,
        name: file.name || `${key}_${Date.now()}.${fileExtension}`,
      } as any);
    }
  });

  // Add additional data
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return formData;
};

/**
 * Get file size in KB
 */
export const getFileSizeInKB = async (fileUri: string): Promise<number> => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    return blob.size / 1024;
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

/**
 * Validate file size
 */
export const validateFileSize = (
  fileSizeKB: number,
  maxSizeKB: number = 5120 // 5MB default
): boolean => {
  return fileSizeKB <= maxSizeKB;
};

/**
 * Validate file type
 */
export const validateFileType = (
  mimeType: string,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']
): boolean => {
  return allowedTypes.includes(mimeType);
};

/**
 * Format file size for display
 */
export const formatFileSize = (sizeInKB: number): string => {
  if (sizeInKB < 1024) {
    return `${Math.round(sizeInKB)} KB`;
  }
  return `${(sizeInKB / 1024).toFixed(2)} MB`;
};
