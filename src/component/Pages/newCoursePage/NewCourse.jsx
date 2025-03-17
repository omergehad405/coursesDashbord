import { useContext } from "react";
import "./newCourse.css";
import Header from "../../Header/Header";
import { CoursesContext } from "../../context/CoursesContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NewCourse() {
  const {
    editingCourse,
    setCourses,
    courses,
    setEditingCourse,
    formData,
    setFormData,
  } = useContext(CoursesContext);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.duration.trim() ||
      !formData.description.trim() ||
      !formData.instractor.trim()
    ) {
      return Swal.fire({
        title: "Error!",
        text: "Please fill all the fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    try {
      if (editingCourse) {
        await fetch(`http://localhost:3000/courses/${editingCourse.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === editingCourse.id ? { ...course, ...formData } : course
          )
        );
        setEditingCourse(null);

        await Swal.fire({
          title: "Course Updated!",
          text: "The course has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          title: "",
          duration: "",
          description: "",
          instractor: "",
        });

        navigate("/");
      } else {
        const response = await fetch("http://localhost:3000/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        setCourses([...courses, data]);

        await Swal.fire({
          title: "Course Added!",
          text: "The course has been successfully added.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          title: "",
          duration: "",
          description: "",
          instractor: "",
        });

        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="products-page">
      <Header />
      <h1 className="title">
        {editingCourse ? "Edit Course" : "Add New Course"}
      </h1>

      <div className="container">
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              type="text"
              id="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <label htmlFor="title">Course Title</label>
          </div>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              type="text"
              id="instractor"
              onChange={(e) =>
                setFormData({ ...formData, instractor: e.target.value })
              }
              value={formData.instractor}
            />
            <label htmlFor="instractor">Instractor Name</label>
          </div>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              type="number"
              id="duration"
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              value={formData.duration}
            />
            <label htmlFor="duration">Course Duration</label>
          </div>
          <div className="input-field">
            <textarea
              required
              autoComplete="off"
              id="description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
            <label htmlFor="description">Course Description</label>
          </div>

          <button className="btn" type="submit">
            {editingCourse ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCourse;
