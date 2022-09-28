import React, { useContext, useEffect, useState } from "react";
import Navi from "./Navbar";
import CardsSection from "./CardsSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loading.css";
import AuthContext from "../Context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [Jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  const FetchJokes = async () => {
    setLoading(true);

    await axios
      .get(
        "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
      )
      .then((result) => {
        setJokes(result.data.jokes);
        setLoading(false);
      });
  };

  const Logout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <Navi user={user} FetchJokes={FetchJokes} Logout={Logout} />
      {loading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "90vh",
            overflow: "hidden",
          }}
        >
          <div className="spinner-box">
            <div className="circle-border">
              <div className="circle-core"></div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {Jokes.length && loading === false ? (
          <CardsSection Jokes={Jokes} />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
