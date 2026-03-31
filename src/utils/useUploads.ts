import { useState, useCallback } from 'react';

export interface UploadFile {
  name: string;
  size?: number;
  type?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

export interface UseUploadsReturn {
  files: UploadFile[];
  addFile: (name: string, size?: number, type?: string) => void;
  updateFileStatus: (name: string, status: UploadFile['status']) => void;
  updateFileProgress: (name: string, progress: number) => void;
  setFileError: (name: string, error: string) => void;
  removeFile: (name: string) => void;
  clearFiles: () => void;
  markUploadComplete: () => void;
}

/**
 * Hook to manage file upload state
 */
export const useUploads = (): UseUploadsReturn => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const addFile = useCallback((name: string, size?: number, type?: string) => {
    setFiles((prev) => [
      ...prev,
      {
        name,
        size,
        type,
        status: 'pending',
        progress: 0,
      },
    ]);
  }, []);

  const updateFileStatus = useCallback((name: string, status: UploadFile['status']) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.name === name
          ? {
              ...file,
              status,
              progress: status === 'success' ? 100 : file.progress,
            }
          : file
      )
    );
  }, []);

  const updateFileProgress = useCallback((name: string, progress: number) => {
    setFiles((prev) => prev.map((file) => (file.name === name ? { ...file, progress } : file)));
  }, []);

  const setFileError = useCallback((name: string, error: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.name === name
          ? {
              ...file,
              status: 'error',
              error,
            }
          : file
      )
    );
  }, []);

  const removeFile = useCallback((name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const markUploadComplete = useCallback(() => {
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'uploading' ? { ...file, status: 'success', progress: 100 } : file
      )
    );
  }, []);

  return {
    files,
    addFile,
    updateFileStatus,
    updateFileProgress,
    setFileError,
    removeFile,
    clearFiles,
    markUploadComplete,
  };
};
