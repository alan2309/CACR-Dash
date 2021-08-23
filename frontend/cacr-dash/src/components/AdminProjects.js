import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminProjects = ({ projects}) => {
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
              <FontAwesomeIcon icon={faTrash} value={proj._id} />
            </p>
          </>
        );
      })}
    </>
  );
};

export default AdminProjects;
