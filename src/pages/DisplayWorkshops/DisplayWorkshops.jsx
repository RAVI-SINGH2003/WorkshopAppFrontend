import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkShopCard from "../../components/WorkShopCard/WorkShopCard";
import "./DisplayWorkshops.css";
import axios from "axios";
import { server_url } from "../../index.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const DisplayWorkshops = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [workshops, setWorkshops] = useState([]);

  const navigate = useNavigate();

  const getWorkshops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server_url}/workshop/all`, {
        withCredentials: true,
      });
      setLoading(false);
      setWorkshops(data.workshops);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }

  };

  useEffect(() => {
    getWorkshops();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [error, message]);

  const editButtonHandler = (id) => {
    navigate(`/update/workshop/${id}`);
  };
  const deleteButtonHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${server_url}/workshop/${id}`, {
        withCredentials: true,
      });
      setLoading(false);
      setMessage(data.message);
      getWorkshops();
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="workshops_container">
      {workshops.length > 0 ? (
        workshops.map((w) => (
          <WorkShopCard
            key={w._id}
            id={w._id}
            name={w.name}
            date={w.date}
            type={w.type}
            venue={w?.venue}
            url={w?.url}
            coverimage={w?.coverimage.url}
            editButtonHandler={editButtonHandler}
            deleteButtonHandler={deleteButtonHandler}
          />
        ))
      ) : (
        <h1 className="message">No workshops scheduled</h1>
      )}
    </div>
  );
};

export default DisplayWorkshops;
