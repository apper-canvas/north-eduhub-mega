import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const StudentModal = ({ isOpen, onClose, onSave, student = null }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    grade_c: "",
    address_c: "",
    parent_contact_c: "",
    status_c: "Active",
    subscribe_newsletter_c: "",
    agree_terms_c: "",
    tuition_fee_c: "",
    scholarship_amount_c: "",
    study_mode_c: "",
    study_type_c: "",
    personal_website_c: "",
    social_media_profile_c: "",
    course_satisfaction_rating_c: "",
    instructor_rating_c: "",
    interests_c: "",
    skills_c: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
setFormData({
        first_name_c: student.first_name_c || "",
        last_name_c: student.last_name_c || "",
        email_c: student.email_c || "",
        phone_c: student.phone_c || "",
        grade_c: student.grade_c || "",
        address_c: student.address_c || "",
        parent_contact_c: student.parent_contact_c || "",
        status_c: student.status_c || "Active",
        subscribe_newsletter_c: student.subscribe_newsletter_c || "",
        agree_terms_c: student.agree_terms_c || "",
        tuition_fee_c: student.tuition_fee_c || "",
        scholarship_amount_c: student.scholarship_amount_c || "",
        study_mode_c: student.study_mode_c || "",
        study_type_c: student.study_type_c || "",
        personal_website_c: student.personal_website_c || "",
        social_media_profile_c: student.social_media_profile_c || "",
        course_satisfaction_rating_c: student.course_satisfaction_rating_c || "",
        instructor_rating_c: student.instructor_rating_c || "",
        interests_c: student.interests_c || "",
        skills_c: student.skills_c || ""
      });
    } else {
      setFormData({
first_name_c: "",
        last_name_c: "",
        email_c: "",
        phone_c: "",
        grade_c: "",
        address_c: "",
        parent_contact_c: "",
        status_c: "Active",
        subscribe_newsletter_c: "",
        agree_terms_c: "",
        tuition_fee_c: "",
        scholarship_amount_c: "",
        study_mode_c: "",
        study_type_c: "",
        personal_website_c: "",
        social_media_profile_c: "",
        course_satisfaction_rating_c: "",
        instructor_rating_c: "",
        interests_c: "",
        skills_c: ""
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
if (!formData.first_name_c.trim()) newErrors.first_name_c = "First name is required";
    if (!formData.last_name_c.trim()) newErrors.last_name_c = "Last name is required";
    if (!formData.email_c.trim()) newErrors.email_c = "Email is required";
    if (!formData.grade_c.trim()) newErrors.grade_c = "Grade is required";
    
if (formData.email_c && !/\S+@\S+\.\S+/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
    }
    
if (formData.personal_website_c && !/^https?:\/\/.+/.test(formData.personal_website_c)) {
      newErrors.personal_website_c = "Please enter a valid URL starting with http:// or https://";
    }
    
if (formData.social_media_profile_c && !/^https?:\/\/.+/.test(formData.social_media_profile_c)) {
      newErrors.social_media_profile_c = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
const studentData = {
        ...formData,
        enrollment_date_c: student ? student.enrollment_date_c : new Date().toISOString()
      };
      
      await onSave(studentData);
      onClose();
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const gradeOptions = [
    { value: "K", label: "Kindergarten" },
    { value: "1", label: "1st Grade" },
    { value: "2", label: "2nd Grade" },
    { value: "3", label: "3rd Grade" },
    { value: "4", label: "4th Grade" },
    { value: "5", label: "5th Grade" },
    { value: "6", label: "6th Grade" },
    { value: "7", label: "7th Grade" },
    { value: "8", label: "8th Grade" },
    { value: "9", label: "9th Grade" },
    { value: "10", label: "10th Grade" },
    { value: "11", label: "11th Grade" },
    { value: "12", label: "12th Grade" }
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {student ? "Edit Student" : "Add New Student"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
              label="First Name"
              name="first_name_c"
              value={formData.first_name_c}
              onChange={handleInputChange}
              error={errors.first_name_c}
              required
              placeholder="Enter first name"
            />

<FormField
              label="Last Name"
              name="last_name_c"
              value={formData.last_name_c}
              onChange={handleInputChange}
              error={errors.last_name_c}
              required
              placeholder="Enter last name"
            />

<FormField
              label="Email"
              name="email_c"
              type="email"
              value={formData.email_c}
              onChange={handleInputChange}
              error={errors.email_c}
              required
              placeholder="Enter email address"
            />

<FormField
              label="Phone"
              name="phone_c"
              value={formData.phone_c}
              onChange={handleInputChange}
              error={errors.phone_c}
              placeholder="Enter phone number"
            />

<FormField
              label="Grade"
              name="grade_c"
              type="select"
              value={formData.grade_c}
              onChange={handleInputChange}
              error={errors.grade_c}
              required
              options={gradeOptions}
            />

<FormField
              label="Status"
              name="status_c"
              type="select"
              value={formData.status_c}
              onChange={handleInputChange}
              options={statusOptions}
/>

            <div className="md:col-span-2">
<FormField
                label="Address"
                name="address_c"
                value={formData.address_c}
                onChange={handleInputChange}
                error={errors.address_c}
                placeholder="Enter home address"
              />
            </div>

            <div className="md:col-span-2">
<FormField
                label="Parent/Guardian Contact"
                name="parent_contact_c"
                value={formData.parent_contact_c}
                onChange={handleInputChange}
                error={errors.parent_contact_c}
                placeholder="Enter parent/guardian contact information"
              />
            </div>

<FormField
              label="Subscribe to Newsletter"
              name="subscribe_newsletter_c"
              type="checkbox"
              value={formData.subscribe_newsletter_c}
              onChange={handleInputChange}
              values={["Yes", "No"]}
            />

<FormField
              label="Agree to Terms and Conditions"
              name="agree_terms_c"
              type="checkbox"
              value={formData.agree_terms_c}
              onChange={handleInputChange}
              values={["Agree", "Disagree"]}
            />

<FormField
              label="Tuition Fee"
              name="tuition_fee_c"
              type="currency"
              value={formData.tuition_fee_c}
              onChange={handleInputChange}
              error={errors.tuition_fee_c}
              placeholder="Enter amount"
            />

<FormField
              label="Scholarship Amount"
              name="scholarship_amount_c"
              type="currency"
              value={formData.scholarship_amount_c}
              onChange={handleInputChange}
              error={errors.scholarship_amount_c}
              placeholder="Enter amount"
            />

<FormField
              label="Preferred Study Mode"
              name="study_mode_c"
              type="radio"
              value={formData.study_mode_c}
              onChange={handleInputChange}
              values={["Online", "Offline"]}
            />

<FormField
              label="Study Type"
              name="study_type_c"
              type="radio"
              value={formData.study_type_c}
              onChange={handleInputChange}
              values={["Full-time", "Part-time"]}
            />

<FormField
              label="Personal Website"
              name="personal_website_c"
              type="website"
              value={formData.personal_website_c}
              onChange={handleInputChange}
              error={errors.personal_website_c}
              placeholder="Enter URL"
            />

<FormField
              label="Social Media Profile"
              name="social_media_profile_c"
              type="website"
              value={formData.social_media_profile_c}
              onChange={handleInputChange}
              error={errors.social_media_profile_c}
              placeholder="Enter URL"
            />

<FormField
              label="Course Satisfaction Rating"
              name="course_satisfaction_rating_c"
              type="rating"
              value={formData.course_satisfaction_rating_c}
              onChange={handleInputChange}
              values={["1", "2", "3", "4", "5"]}
            />

<FormField
              label="Instructor Rating"
              name="instructor_rating_c"
              type="rating"
              value={formData.instructor_rating_c}
              onChange={handleInputChange}
              values={["1", "2", "3", "4", "5"]}
            />

            <div className="md:col-span-2">
<FormField
                label="Interests"
                name="interests_c"
                type="tag"
                value={formData.interests_c}
                onChange={handleInputChange}
                placeholder="Academic, Extracurricular"
              />
            </div>

<div className="md:col-span-2">
              <FormField
                label="Skills"
                name="skills_c"
                type="tag"
                value={formData.skills_c}
                onChange={handleInputChange}
                placeholder="Programming, Public Speaking, Graphic Design, etc."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                  {student ? "Update Student" : "Add Student"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;