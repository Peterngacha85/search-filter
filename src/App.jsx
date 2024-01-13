import { useState } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    e.preventDefault;
    setSearchTerm(e.target.value);
  };
  // Function to highlight the search term in a string
  const highlightSearchTerm = (text) => {
    if (searchTerm.toLowerCase() === "") {
      return text;
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return (
      <span style={{ backgroundColor: "yellow" }}>
        {text
          .split(regex)
          .map((part, index) =>
            regex.test(part) ? <mark key={index}>{part}</mark> : part
          )}
      </span>
    );
  };
  return (
    <>
      <h1 style={{ color: "green" }}>Search App</h1>
      <input
        className="input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return searchTerm.toLowerCase() === ""
                  ? item
                  : item.first_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      item.last_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
              })
              .map((person) => (
                <tr key={person.id}>
                  <td>{highlightSearchTerm(person.first_name)}</td>
                  <td>{highlightSearchTerm(person.last_name)}</td>
                  <td>{highlightSearchTerm(person.email)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
