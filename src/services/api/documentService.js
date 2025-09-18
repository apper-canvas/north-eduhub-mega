import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const documentService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}}
        ]
      };

      const response = await apperClient.fetchRecords("document_c", params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching documents:", error?.response?.data?.message || error);
      toast.error("Failed to load documents");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}}
        ]
      };

      const response = await apperClient.getRecordById("document_c", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load document");
      return null;
    }
  },

  async getByStudentId(studentId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}]
      };

      const response = await apperClient.fetchRecords("document_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching documents for student ${studentId}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async create(documentData) {
    try {
      const params = {
        records: [{
          Name: documentData.Name,
          Tags: documentData.Tags || "",
          student_id_c: parseInt(documentData.student_id_c),
          title_c: documentData.title_c,
          type_c: documentData.type_c,
          upload_date_c: documentData.upload_date_c || new Date().toISOString().split("T")[0],
          file_url_c: documentData.file_url_c
        }]
      };

      const response = await apperClient.createRecord("document_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating document:", error?.response?.data?.message || error);
      toast.error("Failed to create document");
      return null;
    }
  },

  async update(id, documentData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: documentData.Name,
          Tags: documentData.Tags || "",
          student_id_c: parseInt(documentData.student_id_c),
          title_c: documentData.title_c,
          type_c: documentData.type_c,
          upload_date_c: documentData.upload_date_c,
          file_url_c: documentData.file_url_c
        }]
      };

      const response = await apperClient.updateRecord("document_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating document:", error?.response?.data?.message || error);
      toast.error("Failed to update document");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("document_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
    } catch (error) {
      console.error("Error deleting document:", error?.response?.data?.message || error);
      toast.error("Failed to delete document");
      return false;
    }
}
};