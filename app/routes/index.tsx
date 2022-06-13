import { Theme, useTheme } from "utils/theme-provider";

export default function Index() {
  const [, setTheme] = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div>
      <nav className="flex shadow-lg p-7 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Where in the world?</h1>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleTheme}
          />
          <h3>Dark mode</h3>
        </div>
      </nav>
    </div>
  );
}
