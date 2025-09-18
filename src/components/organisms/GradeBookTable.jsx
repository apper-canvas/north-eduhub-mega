import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";

const GradeBookTable = ({ grades, students, classes, onUpdateGrade }) => {
  const [editingGrade, setEditingGrade] = useState(null);
  const [editValue, setEditValue] = useState("");

const getStudentName = (studentId) => {
    const student = students.find(s => s.Id === parseInt(studentId));
    return student ? `${student.first_name_c} ${student.last_name_c}` : "Unknown Student";
  };

const getClassName = (classId) => {
    const classItem = classes.find(c => c.Id === parseInt(classId));
    return classItem ? classItem.name_c : "Unknown Class";
  };

  const getGradePercentage = (score, maxScore) => {
    if (!score || !maxScore) return 0;
    return Math.round((score / maxScore) * 100);
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  const getGradeVariant = (percentage) => {
    if (percentage >= 90) return "success";
    if (percentage >= 80) return "primary";
    if (percentage >= 70) return "warning";
    return "danger";
  };

const handleStartEdit = (grade) => {
    setEditingGrade(grade.Id);
    setEditValue(grade.score_c.toString());
  };

  const handleSaveEdit = async (grade) => {
    const newScore = parseFloat(editValue);
    
if (isNaN(newScore) || newScore < 0 || newScore > grade.max_score_c) {
      toast.error(`Score must be between 0 and ${grade.max_score_c}`);
      return;
    }

    try {
await onUpdateGrade(grade.Id, { ...grade, score_c: newScore });
      setEditingGrade(null);
      setEditValue("");
      toast.success("Grade updated successfully");
    } catch (error) {
      toast.error("Failed to update grade");
    }
  };

  const handleCancelEdit = () => {
    setEditingGrade(null);
    setEditValue("");
  };

const sortedGrades = [...grades].sort((a, b) => {
    const studentA = getStudentName(a.student_id_c?.Id || a.student_id_c);
    const studentB = getStudentName(b.student_id_c?.Id || b.student_id_c);
    return studentA.localeCompare(studentB);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ApperIcon name="GraduationCap" className="w-5 h-5 mr-2" />
          Grade Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Assignment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
{sortedGrades.map((grade) => {
                const percentage = getGradePercentage(grade.score_c, grade.max_score_c);
                const gradeLetter = getGradeLetter(percentage);
                const isEditing = editingGrade === grade.Id;

                return (
                  <tr key={grade.Id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <ApperIcon name="User" className="w-4 h-4 text-primary-600" />
                        </div>
<span className="font-medium text-gray-900">
                          {getStudentName(grade.student_id_c?.Id || grade.student_id_c)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
<span className="text-gray-700">{getClassName(grade.class_id_c?.Id || grade.class_id_c)}</span>
                    </td>
                    <td className="py-4 px-4">
<span className="text-gray-700">{grade.assignment_name_c}</span>
                    </td>
                    <td className="py-4 px-4">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20"
min="0"
                            max={grade.max_score_c}
                            step="0.1"
                          />
<span className="text-gray-500">/ {grade.max_score_c}</span>
                        </div>
                      ) : (
<span className="font-medium text-gray-900">
                          {grade.score_c} / {grade.max_score_c}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getGradeVariant(percentage)}>
                        {gradeLetter} ({percentage}%)
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
<span className="text-gray-600">
                        {new Date(grade.date_c).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleSaveEdit(grade)}
                          >
                            <ApperIcon name="Check" className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleCancelEdit}
                          >
                            <ApperIcon name="X" className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStartEdit(grade)}
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {sortedGrades.length === 0 && (
            <div className="text-center py-8">
              <ApperIcon name="BookOpen" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No grades recorded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeBookTable;