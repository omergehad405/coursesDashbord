import "./Header.css";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext";

function Header() {
  const { searchQuery, setSearchQuery } = useContext(CoursesContext);

  return (
    <header>
      <div className="left">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">
            <FaSearch />
          </label>
          <input
            type="text"
            placeholder="Search Anything Here"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="right">
        <h1>
          hello <span>OMAR</span>
        </h1>
        <div className="user_img">
          <FaUserCircle />
        </div>
      </div>
    </header>
  );
}

export default Header;
