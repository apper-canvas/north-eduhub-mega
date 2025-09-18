import { toast } from "react-toastify";
import React from "react";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const attendanceService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ]
      };

      const response = await apperClient.fetchRecords("attendance_c", params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error?.response?.data?.message || error);
      toast.error("Failed to load attendance records");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ]
      };

      const response = await apperClient.getRecordById("attendance_c", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance record ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load attendance record");
      return null;
    }
  },

  async getByStudentId(studentId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}]
      };

      const response = await apperClient.fetchRecords("attendance_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching attendance for student ${studentId}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async getByClassId(classId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ],
        where: [{"FieldName": "class_id_c", "Operator": "EqualTo", "Values": [parseInt(classId)]}]
      };

      const response = await apperClient.fetchRecords("attendance_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching attendance for class ${classId}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async getByDateRange(startDate, endDate) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ],
        where: [
          {"FieldName": "date_c", "Operator": "GreaterThanOrEqualTo", "Values": [startDate]},
          {"FieldName": "date_c", "Operator": "LessThanOrEqualTo", "Values": [endDate]}
        ]
      };

      const response = await apperClient.fetchRecords("attendance_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching attendance for date range ${startDate} to ${endDate}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async create(attendanceData) {
    try {
      const params = {
        records: [{
          Name: attendanceData.Name || "",
          Tags: attendanceData.Tags || "",
          date_c: attendanceData.date_c || new Date().toISOString().split("T")[0],
          status_c: attendanceData.status_c,
          notes_c: attendanceData.notes_c || "",
          student_id_c: parseInt(attendanceData.student_id_c),
          class_id_c: parseInt(attendanceData.class_id_c)
        }]
      };

      const response = await apperClient.createRecord("attendance_c", params);
      
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
      console.error("Error creating attendance record:", error?.response?.data?.message || error);
      toast.error("Failed to create attendance record");
      return null;
    }
  },

  async update(id, attendanceData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: attendanceData.Name || "",
          Tags: attendanceData.Tags || "",
          date_c: attendanceData.date_c,
          status_c: attendanceData.status_c,
          notes_c: attendanceData.notes_c || "",
          student_id_c: parseInt(attendanceData.student_id_c),
          class_id_c: parseInt(attendanceData.class_id_c)
        }]
      };

      const response = await apperClient.updateRecord("attendance_c", params);
      
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
      console.error("Error updating attendance record:", error?.response?.data?.message || error);
      toast.error("Failed to update attendance record");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("attendance_c", params);
      
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
      console.error("Error deleting attendance record:", error?.response?.data?.message || error);
      toast.error("Failed to delete attendance record");
      return false;
    }
return false;
    }
  }
};