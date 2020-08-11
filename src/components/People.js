import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";
const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

function People() {
  const { data, status } = useQuery("people", fetchPeople, {
    staleTime: 5000,
    onSuccess: () => {
      console.log("data fetched");
    },
  });
  console.log(data, status);
  return (
    <div>
      <h2>People</h2>
      {/* <p>{status}</p> */}
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data ...</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person person={person} key={person.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default People;
