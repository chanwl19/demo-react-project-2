import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import ProjectSidebar from "./component/ProjectSidebar";
import { useState } from "react";
import SelectedProject from "./component/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId : undefined,
    projects:[],
    tasks: []
  });
  
  function handleStartProject(){
    setProjectsState(prevProjectsState => {
      return { 
        ...prevProjectsState,
        selectedProjectId : null
      }
    })
  }

  function handleAddTask(text){
    setProjectsState(prevProjectsState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId
      }
      return {...prevProjectsState,
              tasks: [...prevProjectsState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevProjectsState => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter(task => task.id !== id)
      }
    })
  }

  function handleAddProject(projectData){
    setProjectsState(prevProjectsState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {...prevProjectsState,
              selectedProjectId: undefined,
              projects:[...prevProjectsState.projects,newProject]      
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevProjectsState => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevProjectsState => {
      return {
        ...prevProjectsState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevProjectsState => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: prevProjectsState.projects.filter(project => project.id !== prevProjectsState.selectedProjectId)
      }
    })
  }
  
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} 
                                 onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}
                                 tasks={projectsState.tasks}/>;

  if (projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartProject} />
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
