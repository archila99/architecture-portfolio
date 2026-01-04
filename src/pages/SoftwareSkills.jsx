// Reuse existing content styles if available or just generic

export default function SoftwareSkills() {
  const skills = {
    "Programming Languages": ["JavaScript (ES6+)", "Python", "HTML5", "CSS3/SCSS", "SQL"],
    "Frameworks & Libraries": ["React", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
    "Tools & Platforms": ["Git", "GitHub", "Vite", "Figma", "VS Code"],
    "Design Software": ["AutoCAD", "Revit", "SketchUp", "Rhino 3D", "Adobe Creative Suite"]
  };

  return (
    <div className="page-container" style={{ padding: "100px 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "300" }}>Software Skills</h1>

      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-category" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>{category}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map(item => (
                <li key={item} style={{ marginBottom: "0.5rem", color: "#666" }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
