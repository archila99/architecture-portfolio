import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Static pages definition
  const staticPages = [
    { title: "Home", path: "/" },
    { title: "Architecture", path: "/architecture" },
    { title: "Software Skills", path: "/software-skills" },
    { title: "Interior", path: "/interior" },
    { title: "All Projects", path: "/projects" },
    { title: "News", path: "/news" },
    { title: "People", path: "/people" },
    { title: "Contact", path: "/contact" },
  ];

  // Fetch project data for search index
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data/projects.json");
        const projects = await response.json();
        // Combine static pages and projects into one searchable array
        const combined = [
          ...staticPages.map(p => ({ ...p, type: 'page' })),
          ...projects.map(p => ({ ...p, type: 'project' }))
        ];
        setAllData(combined);
      } catch (error) {
        console.error("Failed to load search data:", error);
      }
    }
    fetchData();
  }, []);

  // Handle outside click for menu and search results
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false); // close the menu
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchTerm(""); // close search results
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = allData.filter(item =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleResultClick = (item) => {
    setSearchTerm(""); // clear search
    if (item.type === 'page') {
      navigate(item.path);
    } else if (item.type === 'project') {
      // Navigate to architecture page with project query param
      navigate(`/architecture?project=${item.id}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">MyPortfolio</Link>


        <div className="nav-links">

          <div className="search-container" ref={searchRef}>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>

            {searchTerm && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.title}
                    <span className="result-type">{result.type === 'page' ? 'Page' : 'Project'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/architecture" className="desktop-link">Architecture</Link>
          <Link to="/software-skills" className="desktop-link">Software Skills</Link>
          <Link to="/interior" className="desktop-link">Game</Link>

          <div
            className="menu" ref={menuRef}>
            <div className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {open && (
              <div className="dropdown" >
                <Link to="/architecture" className="mobile-link" onClick={() => setOpen(false)}>Architecture</Link>
                <Link to="/software-skills" className="mobile-link" onClick={() => setOpen(false)}>Software Skills</Link>
                <Link to="/interior" className="mobile-link" onClick={() => setOpen(false)}>Game</Link>
                <hr className="mobile-divider" />
                <Link to="/news" onClick={() => setOpen(false)}>News</Link>
                <Link to="/people" onClick={() => setOpen(false)}>People</Link>
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
