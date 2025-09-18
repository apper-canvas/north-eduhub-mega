import { toast } from "react-toastify";
import React from "react";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const classService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "subject_c"}},
          {"field": {"Name": "teacher_c"}},
          {"field": {"Name": "schedule_c"}},
          {"field": {"Name": "room_c"}},
          {"field": {"Name": "max_capacity_c"}}
        ]
      };

      const response = await apperClient.fetchRecords("class_c", params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data.map(cls => ({
        ...cls,
        students: cls.students || []
      }));
    } catch (error) {
      console.error("Error fetching classes:", error?.response?.data?.message || error);
      toast.error("Failed to load classes");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "subject_c"}},
          {"field": {"Name": "teacher_c"}},
          {"field": {"Name": "schedule_c"}},
          {"field": {"Name": "room_c"}},
          {"field": {"Name": "max_capacity_c"}}
        ]
      };

      const response = await apperClient.getRecordById("class_c", id, params);
      return {
        ...response.data,
        students: response.data.students || []
      };
    } catch (error) {
      console.error(`Error fetching class ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load class");
      return null;
    }
  },

  async create(classData) {
    try {
      const params = {
        records: [{
          Name: classData.Name,
          Tags: classData.Tags || "",
          name_c: classData.name_c,
          subject_c: classData.subject_c,
          teacher_c: classData.teacher_c,
          schedule_c: classData.schedule_c || "",
          room_c: classData.room_c,
          max_capacity_c: parseInt(classData.max_capacity_c) || 0
        }]
      };

      const response = await apperClient.createRecord("class_c", params);
      
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
      console.error("Error creating class:", error?.response?.data?.message || error);
      toast.error("Failed to create class");
      return null;
    }
  },

  async update(id, classData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: classData.Name,
          Tags: classData.Tags || "",
          name_c: classData.name_c,
          subject_c: classData.subject_c,
          teacher_c: classData.teacher_c,
          schedule_c: classData.schedule_c || "",
          room_c: classData.room_c,
          max_capacity_c: parseInt(classData.max_capacity_c) || 0
        }]
      };

      const response = await apperClient.updateRecord("class_c", params);
      
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
      console.error("Error updating class:", error?.response?.data?.message || error);
      toast.error("Failed to update class");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("class_c", params);
      
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
      console.error("Error deleting class:", error?.response?.data?.message || error);
      toast.error("Failed to delete class");
return false;
    }
  }
};