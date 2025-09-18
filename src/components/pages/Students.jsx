import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import StudentCard from "@/components/organisms/StudentCard";
import StudentModal from "@/components/organisms/StudentModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { studentService } from "@/services/api/studentService";
import { toast } from "react-toastify";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
    } else {
const filtered = students.filter(student =>
        student.first_name_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.last_name_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.grade_c?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
const mappedData = {
          Name: `${studentData.first_name_c} ${studentData.last_name_c}`,
          first_name_c: studentData.first_name_c,
          last_name_c: studentData.last_name_c,
          email_c: studentData.email_c,
          phone_c: studentData.phone_c,
          grade_c: studentData.grade_c,
          enrollment_date_c: studentData.enrollment_date_c,
          photo_c: studentData.photo_c,
          address_c: studentData.address_c,
          parent_contact_c: studentData.parent_contact_c,
          status_c: studentData.status_c,
          subscribe_newsletter_c: studentData.subscribe_newsletter_c,
          agree_terms_c: studentData.agree_terms_c,
          tuition_fee_c: studentData.tuition_fee_c,
          scholarship_amount_c: studentData.scholarship_amount_c,
          study_mode_c: studentData.study_mode_c,
          study_type_c: studentData.study_type_c,
          personal_website_c: studentData.personal_website_c,
          social_media_profile_c: studentData.social_media_profile_c,
          course_satisfaction_rating_c: studentData.course_satisfaction_rating_c,
          instructor_rating_c: studentData.instructor_rating_c,
          interests_c: studentData.interests_c,
          skills_c: studentData.skills_c
        };
        
        const updatedStudent = editingStudent 
          ? await studentService.update(editingStudent.Id, mappedData)
          : await studentService.create(mappedData);
          
        if (updatedStudent) {
          if (editingStudent) {
            setStudents(prev => prev.map(s => s.Id === editingStudent.Id ? updatedStudent : s));
          } else {
            setStudents(prev => [...prev, updatedStudent]);
          }
        }
        toast.success("Student updated successfully");
      } else {
        const newStudent = await studentService.create(studentData);
        setStudents(prev => [...prev, newStudent]);
        toast.success("Student added successfully");
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to save student");
      throw error;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await studentService.delete(studentId);
      setStudents(prev => prev.filter(s => s.Id !== studentId));
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete student");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  if (loading) return <Loading variant="cards" />;
  if (error) return <Error message={error} onRetry={loadStudents} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Students
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your student roster and information
          </p>
        </div>
        <Button onClick={handleAddStudent} variant="primary" className="shrink-0">
          <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search students by name, email, or grade..."
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
            />
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: <strong>{students.length}</strong> students</span>
<span>Active: <strong>{students.filter(s => s.status_c === "Active").length}</strong></span>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.Id}
              student={student}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      ) : (
        <Empty
          title={searchQuery ? "No students found" : "No students yet"}
          description={
            searchQuery 
              ? "Try adjusting your search terms or filters."
              : "Start by adding your first student to the system."
          }
          action={searchQuery ? undefined : handleAddStudent}
          actionLabel="Add First Student"
          icon="Users"
        />
      )}

      {/* Student Modal */}
      <StudentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveStudent}
        student={editingStudent}
      />
    </div>
  );
};

export default Students;