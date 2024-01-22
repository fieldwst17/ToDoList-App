import "./Header.css";
import { GiSun } from "react-icons/gi";
import { GiEvilMoon } from "react-icons/gi";
export default function Header(props) {
  const { theme, setTheme } = props;
  function ToggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <header>
      <div className="logo">
        <span>Task Management</span>
      </div>
      <div className="theme-container">
        <span>{theme === "light" ? "Light" : "Dark"}</span>
        <span className="icon" onClick={ToggleTheme}>
          {theme === "light" ? <GiSun /> : <GiEvilMoon />}
        </span>
      </div>
    </header>
  );
}
