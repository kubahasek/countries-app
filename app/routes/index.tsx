import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Theme, useTheme } from "utils/theme-provider";
import CountryCard from "~/components/CountryCard";
import Navbar from "~/components/Navbar";

type LoaderData = {
  data: string[];
};

type Country = {
  cca2: string;
  name: {
    common: string;
  };
  region: string;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = await fetch(
    "https://restcountries.com/v3.1/all"
  ).then((res) => res.json());

  return data;
};

export default function Index() {
  const [theme, setTheme] = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const countries = useLoaderData().filter(
    (country: Country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      country.region.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <div className="lg:flex lg:justify-between lg:w-[80%] lg:mx-auto">
          <div className="w-[90%] m-auto mt-4 relative flex items-center lg:w-[50%]">
            <div className="absolute flex items-center ml-3">
              <i className="fa-solid fa-magnifying-glass text-darkgray dark:text-white"></i>
            </div>
            <input
              className="w-full rounded-sm pl-10 pt-3 pb-3 pr- shadow-lg dark:bg-darkblue dark:text-white"
              type="text"
              name="search"
              id=""
              placeholder="Search for a country..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[90%] m-auto mt-4 lg:flex lg:justify-end">
            <select
              name="region"
              id=""
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-sm pr-5 pl-3 pb-3 pt-3 bg-white border-none shadow-lg lg:w-1/3 dark:bg-darkblue dark:text-white"
            >
              <option hidden value="">
                Filter by region
              </option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 w-[80%] m-auto items-center mt-4 lg:grid-cols-4 lg:gap-4">
          {countries &&
            countries.map((country: Country) => (
              <Link
                prefetch="intent"
                to={`/country/${country.cca2}`}
                key={country.cca2}
              >
                <CountryCard
                  key={country.cca2}
                  country={country}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
}
