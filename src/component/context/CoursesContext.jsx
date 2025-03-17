import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
    instractor: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  // get courses
  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // edit course
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      duration: course.duration,
      description: course.description,
      instractor: course.instractor,
    });
    navigate("/edit-course");
  };

  // delete course
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/courses/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCourses((prevCourses) => prevCourses.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Error:", err.message));
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
        editingCourse,
        setEditingCourse,
        handleEdit,
        handleDelete,
        formData,
        setFormData,
        searchQuery,
        setSearchQuery, 
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
