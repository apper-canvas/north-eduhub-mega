import { toast } from "react-toastify";

import { toast } from 'react-toastify';

export const studentService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "parent_contact_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "subscribe_newsletter_c"}},
          {"field": {"Name": "agree_terms_c"}},
          {"field": {"Name": "tuition_fee_c"}},
          {"field": {"Name": "scholarship_amount_c"}},
          {"field": {"Name": "study_mode_c"}},
          {"field": {"Name": "study_type_c"}},
          {"field": {"Name": "personal_website_c"}},
          {"field": {"Name": "social_media_profile_c"}},
          {"field": {"Name": "course_satisfaction_rating_c"}},
          {"field": {"Name": "instructor_rating_c"}},
          {"field": {"Name": "interests_c"}},
          {"field": {"Name": "skills_c"}}
        ]
      };

      const response = await apperClient.fetchRecords("student_c", params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error?.response?.data?.message || error);
      toast.error("Failed to load students");
      return [];
    }
  },

async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "parent_contact_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "subscribe_newsletter_c"}},
          {"field": {"Name": "agree_terms_c"}},
          {"field": {"Name": "tuition_fee_c"}},
          {"field": {"Name": "scholarship_amount_c"}},
          {"field": {"Name": "study_mode_c"}},
          {"field": {"Name": "study_type_c"}},
          {"field": {"Name": "personal_website_c"}},
          {"field": {"Name": "social_media_profile_c"}},
          {"field": {"Name": "course_satisfaction_rating_c"}},
          {"field": {"Name": "instructor_rating_c"}},
          {"field": {"Name": "interests_c"}},
          {"field": {"Name": "skills_c"}}
        ]
      };

      const response = await apperClient.getRecordById("student_c", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load student");
      return null;
    }
  },

async create(studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: studentData.Name,
          Tags: studentData.Tags || "",
          first_name_c: studentData.first_name_c,
          last_name_c: studentData.last_name_c,
          email_c: studentData.email_c,
          phone_c: studentData.phone_c || "",
          grade_c: studentData.grade_c,
          enrollment_date_c: studentData.enrollment_date_c || new Date().toISOString(),
          photo_c: studentData.photo_c || "",
          address_c: studentData.address_c || "",
          parent_contact_c: studentData.parent_contact_c || "",
          status_c: studentData.status_c || "Active",
          subscribe_newsletter_c: studentData.subscribe_newsletter_c || "",
          agree_terms_c: studentData.agree_terms_c || "",
          tuition_fee_c: parseFloat(studentData.tuition_fee_c) || 0,
          scholarship_amount_c: parseFloat(studentData.scholarship_amount_c) || 0,
          study_mode_c: studentData.study_mode_c || "",
          study_type_c: studentData.study_type_c || "",
          personal_website_c: studentData.personal_website_c || "",
          social_media_profile_c: studentData.social_media_profile_c || "",
          course_satisfaction_rating_c: parseInt(studentData.course_satisfaction_rating_c) || null,
          instructor_rating_c: parseInt(studentData.instructor_rating_c) || null,
          interests_c: studentData.interests_c || "",
          skills_c: studentData.skills_c || ""
        }]
      };

      const response = await apperClient.createRecord("student_c", params);
      
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
      console.error("Error creating student:", error?.response?.data?.message || error);
      toast.error("Failed to create student");
      return null;
    }
  },

async update(id, studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: studentData.Name,
          Tags: studentData.Tags || "",
          first_name_c: studentData.first_name_c,
          last_name_c: studentData.last_name_c,
          email_c: studentData.email_c,
          phone_c: studentData.phone_c || "",
          grade_c: studentData.grade_c,
          enrollment_date_c: studentData.enrollment_date_c,
          photo_c: studentData.photo_c || "",
          address_c: studentData.address_c || "",
          parent_contact_c: studentData.parent_contact_c || "",
          status_c: studentData.status_c || "Active",
          subscribe_newsletter_c: studentData.subscribe_newsletter_c || "",
          agree_terms_c: studentData.agree_terms_c || "",
          tuition_fee_c: parseFloat(studentData.tuition_fee_c) || 0,
          scholarship_amount_c: parseFloat(studentData.scholarship_amount_c) || 0,
          study_mode_c: studentData.study_mode_c || "",
          study_type_c: studentData.study_type_c || "",
          personal_website_c: studentData.personal_website_c || "",
          social_media_profile_c: studentData.social_media_profile_c || "",
          course_satisfaction_rating_c: parseInt(studentData.course_satisfaction_rating_c) || null,
          instructor_rating_c: parseInt(studentData.instructor_rating_c) || null,
          interests_c: studentData.interests_c || "",
          skills_c: studentData.skills_c || ""
        }]
      };

      const response = await apperClient.updateRecord("student_c", params);
      
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
      console.error("Error updating student:", error?.response?.data?.message || error);
      toast.error("Failed to update student");
      return null;
    }
  },

async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("student_c", params);
      
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
      console.error("Error deleting student:", error?.response?.data?.message || error);
      toast.error("Failed to delete student");
      return false;
    }
  }
};