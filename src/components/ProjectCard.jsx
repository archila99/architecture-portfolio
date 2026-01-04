// src/components/ProjectCard.jsx
import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <img src={project.mainImage} alt={project.title} className="project-main" />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
