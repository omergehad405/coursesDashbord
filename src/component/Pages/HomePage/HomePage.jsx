import Header from "../../Header/Header";
import "./homePage.css";
import { CoursesContext } from "../../context/CoursesContext";
import { useContext } from "react";
import Swal from "sweetalert2";

function HomePage() {
  const { courses, handleDelete, handleEdit, searchQuery } =
    useContext(CoursesContext);

  const handleDeleteConfirmation = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      handleDelete(id);
      Swal.fire({
        title: "Deleted!",
        text: "The course has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  // filter courses
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="courses-page">
      <Header />
      <h1 className="title">Courses page</h1>

      <table className="courses_container">
        <thead>
          <th>Course Title</th>
          <th>Course Instractor</th>
          <th>Course description</th>
          <th>Course durtion</th>
          <th>Action</th>
        </thead>

        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr className="card" key={course.id}>
                <td>{course.title}</td>
                <td>{course.instractor}</td>
                <td>{course.description}</td>
                <td>{course.duration} hours</td>
                <td>
                  <button onClick={() => handleEdit(course)} className="edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(course.id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
