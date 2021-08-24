import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminProjects = ({ projects, deleteHandler }) => {
  return (
    <>
      {projects.map((proj) => {
        return (
          <>
            <p key={proj._id}>
              {proj.title}
              <Link to={`/admin/programs/${proj._id}/edit`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteHandler(proj._id)}
              >
                <FontAwesomeIcon icon={faTrash} value={proj._id} />
              </button>
            </p>
          </>
        );
      })}
    </>
  );
};

export default AdminProjects;