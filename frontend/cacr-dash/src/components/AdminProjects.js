import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import "../CSS/AdminProjects.css";

const AdminProjects = ({ projects, popupYes, setProjId }) => {
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
                    <button className="btn btn-sm btn-danger updel">
                      <FontAwesomeIcon
                        style={{ color: "blue" }}
                        icon={faEdit}
                      />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger updel"
                    onClick={() => {
                      popupYes();
                      setProjId(proj._id);
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ color: "red" }}
                      icon={faTrash}
                      value={proj._id}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminProjects;
