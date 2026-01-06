import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <div className="image-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}Portfolio/Personal/1.jpg`}
            alt="Personal Portrait"
            className="profile-photo"
          />
        </div>
        <div className="text-content">
          <p className="description">
            I am an architect dedicated to designing spaces that inspire, connect, and endure.
            My work focuses on creating functional yet aesthetically pleasing environments that
            enhance the human experience.
          </p>
        </div>
      </div>
    </div>
  );
}
