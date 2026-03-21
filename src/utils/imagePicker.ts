import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

export const pickImage = async (): Promise<Asset | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  };
  return new Promise((resolve, reject) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage || 'ImagePicker Error'));
      } else if (response.assets && response.assets.length > 0) {
        resolve(response.assets[0]);
      } else {
        resolve(null);
      }
    });
  });
};
