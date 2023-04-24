import React, { useEffect, useState } from "react";
import "../../styles/form.css";
import { FaRegImage } from "react-icons/fa";
import defaultCoverImage from "../../assets/images/defaultCoverImage.jpg";
import axios from "axios";
import { server_url } from "../../index.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const CreateWorkshop = () => {
  const [worshopDetails, setWorkshopDetails] = useState({
    name: "",
    type: "Online",
    date: "",
    venue: "",
    url: "",
    coverimage: "",
  });
  const [coverImagePrev, setCoverImagePrev] = useState(defaultCoverImage);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImagePrev(reader.result);
      setWorkshopDetails({ ...worshopDetails, coverimage: file });
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", worshopDetails.name);
    formData.append("type", worshopDetails.type);
    formData.append("date", worshopDetails.date);
    formData.append("url",worshopDetails.type==="Online" ? worshopDetails.url : "");
    formData.append("venue",worshopDetails.type==="In Person" ? worshopDetails.venue : "");
    formData.append("file", worshopDetails.coverimage);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server_url}/workshop/create`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setMessage(data.message);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
    setWorkshopDetails({
      ...worshopDetails,
      name: "",
      type: "Online",
      date: "",
      venue: "",
      url: "",
      coverimage: "",
    });
    setCoverImagePrev(defaultCoverImage);
  };
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
  return loading ? (
    <Loader />
  ) : (
    <form
      className="workshop_form"
      encType="multipart/form-data"
      onSubmit={submitHandler}
    >
      <div className="workshop_cover_image_container">
        <img src={coverImagePrev} alt="" />
        <button className="upload_button">
          <FaRegImage />
          Change Cover Image
          <input type="file" accept="image/*" onChange={changeImageHandler} />
        </button>
      </div>
      <div className="workshop_inputs_container">
        <div className="left_section">
          <div className="input_group">
            <label htmlFor="workshop_name">Workshop Name</label>
            <input
              type="text"
              name="workshop_name"
              id="workshop_name"
              placeholder="Talk Show...."
              required
              value={worshopDetails.name}
              onChange={(e) =>
                setWorkshopDetails({
                  ...worshopDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="input_group">
            <label htmlFor="workshop_type">Workshop Type</label>
            <select
              name="workshop_type"
              id="workshop_type"
              required
              onChange={(e) => {
                setWorkshopDetails({
                  ...worshopDetails,
                  type: e.target.value,
                });
              }}
              value={worshopDetails.type}
            >
              <option value="Online">Online</option>
              <option value="In Person">In Person</option>
            </select>
          </div>
          <div className="input_group">
            <label htmlFor="workshop_date">Workshop Date</label>
            <input
              type="datetime-local"
              name="workshop_date"
              id="workshop_date"
              required
              value={worshopDetails.date}
              onChange={(e) =>
                setWorkshopDetails({
                  ...worshopDetails,
                  date: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="right_section">
          {worshopDetails.type === "Online" ? (
            <div className="input_group">
              <label htmlFor="workshop_url">Workshop URL</label>
              <input
                type="text"
                name="workshop_url"
                id="workshop_url"
                placeholder="zoom / google meet url"
                required
                value={worshopDetails.url}
                onChange={(e) =>
                  setWorkshopDetails({
                    ...worshopDetails,
                    url: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className="input_group">
              <label htmlFor="workshop_venue">Workshop Venue</label>
              <input
                type="text"
                name="workshop_venue"
                id="workshop_venue"
                placeholder="Delhi , India"
                required
                value={worshopDetails.venue}
                onChange={(e) =>
                  setWorkshopDetails({
                    ...worshopDetails,
                    venue: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
      <button type="submit">Create Workshop</button>
    </form>
  );
};

export default CreateWorkshop;
