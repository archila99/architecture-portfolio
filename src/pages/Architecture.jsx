import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Architecture.css";

export default function Architecture() {
  const [projects, setProjects] = useState([]);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/projects.json`);
        const localProjects = await res.json();
        setProjects(localProjects);
      } catch (err) {
        console.error(err);
      }
    }
    loadProjects();
  }, []);

  // Effect to handle deep linking from search
  useEffect(() => {
    const projectIdFromUrl = searchParams.get("project");
    if (projectIdFromUrl && projects.length > 0) {
      // Find if project exists and set expanded (ensure type match)
      const idToExpand = parseInt(projectIdFromUrl, 10);
      const projectExists = projects.find(p => p.id === idToExpand);

      if (projectExists) {
        setExpandedProjectId(idToExpand);

        // Optional: Scroll into view
        setTimeout(() => {
          const element = document.getElementById(`project-${idToExpand}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300); // slight delay to ensure rendering
      }
    }
  }, [searchParams, projects]);

  const toggleExpand = (projectId) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <div className="architecture-page container">
      <h1 className="page-title">Architecture</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} id={`project-${project.id}`} className="project-card">
            <div className={`project-card-inner ${expandedProjectId === project.id ? 'expanded-mode' : ''}`}>

              {/* Left Side: Image or Gallery Strip */}
              <div
                className={`visualization-container ${expandedProjectId === project.id ? 'expanded' : ''}`}
                onClick={() => expandedProjectId !== project.id && toggleExpand(project.id)}
              >
                {expandedProjectId !== project.id ? (
                  /* Default View: Single Main Image */
                  <div className="single-image-wrapper">
                    <img
                      src={`${import.meta.env.BASE_URL}${project.mainImage}`}
                      alt={project.title}
                      className="project-main-image"
                    />
                    <div className="overlay-hint">Click to View Gallery</div>
                  </div>
                ) : (
                  /* Expanded View: Horizontal Scrollable Gallery */
                  <div className="inline-gallery-scroll">
                    {/* Main image first */}
                    <div className="gallery-item" onClick={(e) => { e.stopPropagation(); toggleExpand(project.id); }}>
                      <img src={`${import.meta.env.BASE_URL}${project.mainImage}`} alt={project.title} />
                    </div>
                    {/* Then gallery images */}
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="gallery-item">
                        <img src={`${import.meta.env.BASE_URL}${img}`} alt={`${project.title} ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: Text Info */}
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {expandedProjectId === project.id && (
                  <button className="close-gallery-btn" onClick={() => toggleExpand(project.id)}>
                    Close Gallery
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
