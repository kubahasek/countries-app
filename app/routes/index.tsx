import { Theme, useTheme } from "utils/theme-provider";

export default function Index() {
  const [theme, setTheme] = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div>
      <nav className="flex shadow-lg p-7 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-darktext dark:text-white">
            Where in the world?
          </h1>
        </div>
        <div>
          {theme === Theme.DARK ? (
            <i className="fa-solid fa-moon text-darktext dark:text-white"></i>
          ) : (
            <i className="fa-solid fa-sun text-darktext dark:text-white"></i>
          )}
          <button className="ml-2" onClick={toggleTheme}>
            <h3 className="text-darktext dark:text-white">Dark mode</h3>
          </button>
        </div>
      </nav>
    </div>
  );
}
