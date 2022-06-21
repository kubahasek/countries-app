import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Theme, useTheme } from "utils/theme-provider";
import Navbar from "~/components/Navbar";

type Country = {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
    png: string;
  };
  tld: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: {
      name: string;
    };
  };
  population: number;
  capital: string;
  region: string;
  subregion: string;
  borders: string[];
};

async function getBorderCountries(borderCountries: string[]) {
  const countries = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borderCountries.join(",")}`
  );
  return await countries.json();
}

export const loader: LoaderFunction = async ({ params }) => {
  const fetchRequest = await fetch(
    `https://restcountries.com/v3.1/alpha/${params.id}`
  );
  const data = await fetchRequest.json();
  let borderCountriesData = undefined;
  if (data.borders) {
    borderCountriesData = await getBorderCountries(data[0].borders);
  }

  return {
    countryData: data[0],
    borderCountries: borderCountriesData ? borderCountriesData : [],
  };
};

export default function CountryDetail() {
  const countryData: Country = useLoaderData().countryData;
  const [theme, setTheme] = useTheme();
  const borderCountries = useLoaderData().borderCountries;

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="lg:w-[80%] lg:mx-auto">
        <Link to="/">
          <div className="mt-4 ml-4 p-3 shadow-xl text-center w-1/3 hover:scale-110 transition-all dark:bg-darkblue dark:text-white lg:w-1/6 lg:ml-0">
            <i className="fa-solid fa-arrow-left-long"></i>
            <span className="ml-4">Back</span>
          </div>
        </Link>
        <div className="w-[90%] m-auto flex flex-col mt-10 dark:text-white lg:w-full lg:flex-row lg:gap-16">
          <img src={countryData.flags.svg} alt="flag" className="lg:w-[60%]" />
          <div className="mt-5">
            <h1 className="text-2xl font-bold mt-4">
              {countryData.name.common}
            </h1>
            <div className="lg:flex lg:items-start lg:gap-16">
              <div>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Native name:</span>{" "}
                  {countryData.name.common}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Population:</span>{" "}
                  {countryData.population.toLocaleString("en-US")}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Region:</span>{" "}
                  {countryData.region}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Sub region:</span>{" "}
                  {countryData.subregion}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Capital: </span>{" "}
                  {countryData.capital}
                </p>
              </div>
              <div>
                <p className="text-xl mt-10 lg:mt-5">
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {countryData.tld}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Currencies: </span>{" "}
                  {Object.values(countryData.currencies).map(
                    (currency) => currency.name + ", "
                  )}
                </p>
                <p className="text-xl mt-5">
                  <span className="font-semibold">Languages: </span>{" "}
                  {Object.values(countryData.languages).map(
                    (language) => language + ", "
                  )}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-10">Border Countries:</h2>
              <div className="grid grid-cols-3 gap-3 mt-4 mb-10">
                {borderCountries.length > 0 ? (
                  borderCountries.map((borderCountry: Country) => (
                    <Link
                      key={borderCountry.name.common}
                      to={`/country/${borderCountry.cca2}`}
                    >
                      <div
                        key={borderCountry.name.common}
                        className="w-full text-sm p-3 shadow-xl text-center dark:bg-darkblue"
                      >
                        <p>{borderCountry.name.common}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xl mt-5">No border countries</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
