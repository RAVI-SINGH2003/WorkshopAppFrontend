import { useState, useEffect } from "react";
import "./UpdateWorkshop.css";
import { useParams } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import defaultCoverImage from "../../assets/images/defaultCoverImage.jpg";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { server_url } from "../../index.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateWorkshop = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id: workshopId } = useParams();
  const [updatedWorkshopDetails, setUpdatedWorkshopDetails] = useState({
    name: "",
    type: "",
    date: "",
    venue: "",
    url: "",
    coverimage: "",
  });
  const [coverImagePrev, setCoverImagePrev] = useState(defaultCoverImage);
  const navigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImagePrev(reader.result);
      setUpdatedWorkshopDetails({
        ...updatedWorkshopDetails,
        coverimage: file,
      });
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedWorkshopDetails.name);
    formData.append("type", updatedWorkshopDetails.type);
    formData.append("date", updatedWorkshopDetails.date);
    formData.append(
      "url",
      updatedWorkshopDetails.type === "Online" ? updatedWorkshopDetails.url : ""
    );
    formData.append(
      "venue",
      updatedWorkshopDetails.type === "In Person" ? updatedWorkshopDetails.venue : ""
    );
    formData.append("file", updatedWorkshopDetails.coverimage);
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server_url}/workshop/${workshopId}`,
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
     setUpdatedWorkshopDetails({
       ...updatedWorkshopDetails,
       name: "",
       type: "Online",
       date: "",
       venue: "",
       url: "",
       coverimage: "",
     });
     setCoverImagePrev(defaultCoverImage);
     navigate(`/workshops`);
  };

  const getWorkshop = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server_url}/workshop/${workshopId}`, {
        withCredentials: true,
      });
      setUpdatedWorkshopDetails(data.workshop);
      setCoverImagePrev((state) => data.workshop.coverimage.url || state);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    getWorkshop();
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

  return loading ? (
    <Loader />
  ) : (
    <form
      className="workshop_form"
      encType="multipart/form-data"
      onSubmit={submitHandler}
    >
      <h2 id="form_main_heading">Edit Workshop - {updatedWorkshopDetails.name}</h2>
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
              value={updatedWorkshopDetails.name}
              onChange={(e) =>
                setUpdatedWorkshopDetails({
                  ...updatedWorkshopDetails,
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
              value={updatedWorkshopDetails.type}
              onChange={(e) =>
                setUpdatedWorkshopDetails({
                  ...updatedWorkshopDetails,
                  type: e.target.value,
                })
              }
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
              value={updatedWorkshopDetails.date}
              onChange={(e) =>
                setUpdatedWorkshopDetails({
                  ...updatedWorkshopDetails,
                  date: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="right_section">
          {updatedWorkshopDetails.type === "Online" ? (
            <div className="input_group">
              <label htmlFor="workshop_url">Workshop URL</label>
              <input
                type="text"
                name="workshop_url"
                id="workshop_url"
                placeholder="zoom / google meet url"
                required
                value={updatedWorkshopDetails.url}
                onChange={(e) =>
                  setUpdatedWorkshopDetails({
                    ...updatedWorkshopDetails,
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
                value={updatedWorkshopDetails.venue}
                onChange={(e) =>
                  setUpdatedWorkshopDetails({
                    ...updatedWorkshopDetails,
                    venue: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
      <button type="submit">Update Workshop</button>
    </form>
  );
};

export default UpdateWorkshop;
