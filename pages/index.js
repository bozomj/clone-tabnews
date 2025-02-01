import styles from "../styles/header.module.css";

function Home() {
  return (
    <>
      <Header />
    </>
  );
}

export default Home;

function Header() {
  return (
    <>
      <nav className={styles.header}>
        <div>
          <a>Bzmj</a>
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>
              <a href="/status">Status</a>
            </li>
            <li>About</li>
            <li>Skills</li>
            <li>Portfolio</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
