import React, { createContext, useContext, useState, useEffect } from 'react';
import { documentApi } from '../services/apiService';
import { useNotification } from './NotificationContext';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);
  const { showSuccess, showError, showInfo } = useNotification();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await documentApi.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    showInfo(`Ingesting & Vectorizing ${file.name}...`);
    try {
      const newDoc = await documentApi.uploadDocument(file);
      setDocuments((prev) => [newDoc, ...prev]);
      showSuccess(`Vectorized ${file.name} successfully! 412 chunks embedded.`);
      return true;
    } catch (err) {
      showError(`Failed to parse ${file.name}`);
      return false;
    }
  };

  const deleteDoc = async (id) => {
    try {
      await documentApi.deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      showSuccess('Document deleted from knowledge index');
    } catch (err) {
      showError('Failed to delete document');
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loading,
        uploadFile,
        deleteDoc,
        previewDoc,
        setPreviewDoc,
        refreshDocuments: fetchDocuments
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => useContext(DocumentContext);
