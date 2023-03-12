import React, { useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DetailsPage() {
  const [details, setDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState({});
  const params = useParams();
  React.useEffect(() => {
    fetch(`/pokemons/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
        setName(data.name);
        setType(data.type);
        setBase(data.base);
      });
  }, [params.id, editMode]);

  const onEditClick = () => {
    setEditMode(true);
  };

  const onCancelEdit = () => {
    setEditMode(false);
  };

  const onSaveEdit = async () => {
    const body = JSON.stringify({
      updated: {
        id: params.id,
        name,
        type,
        base: {
          HP: base.HP,
          Attack: base.Attack,
          Defense: base.Defense,
          "Sp. Attack": base["Sp. Attack"],
          "Sp. Defense": base["Sp. Defense"],
          Speed: base.Speed,
        },
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
          {!editMode && (
            <button className="button-details" onClick={onEditClick}>
              Edit
            </button>
          )}
          <div className="flex">
            {editMode && (
              <button
                className="button-details margin-right"
                onClick={onSaveEdit}
              >
                Save
              </button>
            )}
            {editMode && (
              <button className="button-details" onClick={onCancelEdit}>
                Cancel
              </button>
            )}
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
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></input>
            ) : (
              details?.type
            )}
          </h2>
          <h2>{`Base: `}</h2>
          <h3>
            {`HP: `}
            {editMode ? (
              <input
                value={base.HP}
                onChange={(e) => setBase({ ...base, HP: e.target.value })}
              ></input>
            ) : (
              details?.base?.HP
            )}
          </h3>
          <h3>
            {`Attack: `}
            {editMode ? (
              <input
                value={base.Attack}
                onChange={(e) => setBase({ ...base, Attack: e.target.value })}
              ></input>
            ) : (
              details?.base?.Attack
            )}
          </h3>
          <h3>
            {`Defense: `}
            {editMode ? (
              <input
                value={base.Defense}
                onChange={(e) => setBase({ ...base, Defense: e.target.value })}
              ></input>
            ) : (
              details?.base?.Defense
            )}
          </h3>
          <h3>
            {`Sp. Attack: `}
            {editMode ? (
              <input
                value={base["Sp. Attack"]}
                onChange={(e) =>
                  setBase({ ...base, "Sp. Attack": e.target.value })
                }
              ></input>
            ) : details?.base ? (
              details?.base["Sp. Attack"]
            ) : (
              ""
            )}
          </h3>
          <h3>
            {`Sp. Defense: `}
            {editMode ? (
              <input
                value={base["Sp. Defense"]}
                onChange={(e) =>
                  setBase({ ...base, "Sp. Defense": e.target.value })
                }
              ></input>
            ) : details?.base ? (
              details?.base["Sp. Defense"]
            ) : (
              ""
            )}
          </h3>
          <h3>
            {`Speed: `}
            {editMode ? (
              <input
                value={base.Speed}
                onChange={(e) => setBase({ ...base, Speed: e.target.value })}
              ></input>
            ) : (
              details?.base?.Speed
            )}
          </h3>
        </div>
      </div>

      <Link to="/">
        <button className="button-details">Back</button>
      </Link>
    </div>
  );
}

export default DetailsPage;
