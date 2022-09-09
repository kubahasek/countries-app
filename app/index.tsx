import type { LoaderFunction } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { useState, Suspense } from "react";
import { Theme, useTheme } from "utils/theme-provider";
import CountryCard from "~/components/CountryCard";
import Navbar from "~/components/Navbar";
import { defer } from "@remix-run/node";

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

export const loader = async () => {
  const data: Promise<Country[]> = fetch(
    "https://restcountries.com/v3.1/all"
  ).then((res) => res.json());

  return defer({ countries: data });
};

export default function Index() {
  const [theme, setTheme] = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const data = useLoaderData<typeof loader>();
  // const countries = useLoaderData<typeof loader>().filter(
  //   (country: Country) =>
  //     country.name.common.toLowerCase().includes(search.toLowerCase()) &&
  //     country.region.toLowerCase().includes(filter.toLowerCase())
  // );

  const toggleTheme = () => {
    setTheme((prevTheme: Theme | null) =>
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
          <Suspense fallback={<h1>Loading....</h1>}>
            <Await resolve={data.countries}>
              {(countries) =>
                countries.map((country) => (
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
                ))
              }
            </Await>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
