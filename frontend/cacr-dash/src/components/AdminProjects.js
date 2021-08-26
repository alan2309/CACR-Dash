import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import "../CSS/AdminProjects.css";

const AdminProjects = ({ projects, deleteHandler }) => {
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, index) => {
            return (
              <tr key={proj._id}>
                <td>{index + 1}</td>
                <td>{proj.title}</td>
                <td>
                  <Link to={`/admin/programs/${proj._id}/edit`}>
                    <FontAwesomeIcon style={{ color: "blue" }} icon={faEdit} />
                  </Link>
                </td>
                <button
                  className="btn btn-sm btn-danger updel"
                  onClick={() => deleteHandler(proj._id)}
                >
                  <FontAwesomeIcon icon={faTrash} value={proj._id} />
                </button>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminProjects;
