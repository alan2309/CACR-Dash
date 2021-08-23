const AdminProjects = ({ projects }) => {
    return (
      <>
        {projects.map((proj) => {
          return <h3>{proj.title}</h3>;
        })}
      </>
    );
  };
  
  export default AdminProjects;
  