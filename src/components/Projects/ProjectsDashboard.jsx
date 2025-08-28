const ProjectsDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">Project Card 1</div>
        <div className="bg-white p-4 rounded-xl shadow">Project Card 2</div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
