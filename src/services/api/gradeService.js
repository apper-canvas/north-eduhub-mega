import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const gradeService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ]
      };

      const response = await apperClient.fetchRecords("grade_c", params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching grades:", error?.response?.data?.message || error);
      toast.error("Failed to load grades");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ]
      };

      const response = await apperClient.getRecordById("grade_c", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching grade ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load grade");
      return null;
    }
  },

  async getByStudentId(studentId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}]
      };

      const response = await apperClient.fetchRecords("grade_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching grades for student ${studentId}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async getByClassId(classId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}}
        ],
        where: [{"FieldName": "class_id_c", "Operator": "EqualTo", "Values": [parseInt(classId)]}]
      };

      const response = await apperClient.fetchRecords("grade_c", params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching grades for class ${classId}:`, error?.response?.data?.message || error);
      return [];
    }
  },

  async create(gradeData) {
    try {
      const params = {
        records: [{
          Name: gradeData.Name,
          Tags: gradeData.Tags || "",
          assignment_name_c: gradeData.assignment_name_c,
          score_c: parseFloat(gradeData.score_c),
          max_score_c: parseFloat(gradeData.max_score_c),
          date_c: gradeData.date_c || new Date().toISOString().split("T")[0],
          category_c: gradeData.category_c || "",
          student_id_c: parseInt(gradeData.student_id_c),
          class_id_c: parseInt(gradeData.class_id_c)
        }]
      };

      const response = await apperClient.createRecord("grade_c", params);
      
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
      console.error("Error creating grade:", error?.response?.data?.message || error);
      toast.error("Failed to create grade");
      return null;
    }
  },

  async update(id, gradeData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: gradeData.Name,
          Tags: gradeData.Tags || "",
          assignment_name_c: gradeData.assignment_name_c,
          score_c: parseFloat(gradeData.score_c),
          max_score_c: parseFloat(gradeData.max_score_c),
          date_c: gradeData.date_c,
          category_c: gradeData.category_c || "",
          student_id_c: parseInt(gradeData.student_id_c),
          class_id_c: parseInt(gradeData.class_id_c)
        }]
      };

      const response = await apperClient.updateRecord("grade_c", params);
      
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
      console.error("Error updating grade:", error?.response?.data?.message || error);
      toast.error("Failed to update grade");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("grade_c", params);
      
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
      console.error("Error deleting grade:", error?.response?.data?.message || error);
      toast.error("Failed to delete grade");
      return false;
    }
  }
};