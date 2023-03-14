import React, { useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DetailsPage() {
  const [details, setDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [base, setBase] = useState({});
  const params = useParams();
  React.useEffect(() => {
    fetch(`/pokemons/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setName(data.name);
        setType(data.type);
        setBase(data.base);
      });
  }, [params.id, editMode]);

  const onSaveEdit = async () => {
    const body = JSON.stringify({
      updated: {
        id: params.id,
        name,
        type,
        base,
      },
    });
    const response = await fetch(`/pokemons/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.status === 200) {
      setEditMode(false);
    }
  };

  return (
    <div className="details">
      <div className="flex">
        <div className="imageContainer">
          <img
            src={`/images/${String(details.id).padStart(3, "0")}.png`}
            alt={`${details?.name?.english}`}
          />
        </div>
        <div>
          <div className="flex">
            {editMode && (
              <button
                className="button-details margin-right"
                onClick={onSaveEdit}
              >
                Save
              </button>
            )}
            <button
              className="button-details"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
          <h2>
            {`Name: `}
            {editMode ? (
              <input
                value={name.english}
                onChange={(e) => setName({ ...name, english: e.target.value })}
              ></input>
            ) : (
              details?.name?.english
            )}
          </h2>
          <h2>
            {`Type: `}
            {editMode ? (
              <input
                value={type.join(", ")}
                onChange={(e) => setType(e.target.value.split(", "))}
              ></input>
            ) : (
              details?.type && type.join(", ")
            )}
          </h2>
          <h2>{`Base: `}</h2>
          {Object.keys(base).map((key) => {
            return (
              <h3 key={key}>
                {`${key}: `}
                {editMode ? (
                  <input
                    value={base[key]}
                    onChange={(e) =>
                      setBase({ ...base, [key]: e.target.value })
                    }
                  ></input>
                ) : details?.base ? (
                  details?.base[key]
                ) : (
                  ""
                )}
              </h3>
            );
          })}
        </div>
      </div>

      <Link to="/">
        <button className="button-details">Back</button>
      </Link>
    </div>
  );
}

export default DetailsPage;
