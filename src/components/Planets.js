import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";
const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  return res.json();
};

function Planets() {
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 5000,
  });
  console.log(data, status);
  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data ...</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
