import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../CSS/AdminProjects.css"

const AdminProjects = ({ projects, deleteHandler }) => {
  return (
    <>
      {projects.map((proj) => {
        return (
          <>
            <p key={proj._id}>
              <p className="title">{proj.title}</p>
              <Link to={`/admin/programs/${proj._id}/edit`}>
              <button
                className="btn btn-sm btn-danger updel">Update this program
                <FontAwesomeIcon icon={faEdit} className="icon"/></button>
              </Link>
              <button
                className="btn btn-sm btn-danger updel"
                onClick={() => deleteHandler(proj._id)}
              >Delete this program
                <FontAwesomeIcon icon={faTrash} className="icon" value={proj._id} />
              </button>
            </p>
          </>
        );
      })}
    </>
  );
};

export default AdminProjects;