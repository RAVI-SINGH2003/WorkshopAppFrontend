import React from "react";
import "./WorkShopCard.css";
import { RiPencilFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiWifi2 } from "react-icons/bi";
import { GiEarthAmerica } from "react-icons/gi";
import defaultCoverImage from "../../assets/images/defaultCoverImage.jpg";

const WorkShopCard = ({
  id,
  name,
  date,
  type,
  url = "",
  venue = "",
  coverimage,
  editButtonHandler,
  deleteButtonHandler,
}) => {
  return (
    <div className="workshop_card">
      <div className="workshop_card_image_container">
        <img
          src={coverimage ? coverimage : defaultCoverImage}
          alt={`workshop${id}`}
        />
      </div>
      <div className="workshop_card_details">
        <div className="workshop_name_type_container">
          <h2>{name}</h2>
          <p>{type}</p>
        </div>
        <h3>
          <FaRegCalendarAlt />
          {date.split("T")[0]} , {date.split("T")[1]}
        </h3>
        {type && type === "Online" ? (
          <a href={url} target="_blank">
            <BiWifi2 />
            {url}
          </a>
        ) : (
          <h3>
            <GiEarthAmerica />
            {venue}
          </h3>
        )}
      </div>
      <div className="button_div">
        <button
          className="delete_workshop_btn"
          onClick={() => deleteButtonHandler(id)}
        >
          <AiFillDelete />
        </button>
        <button
          className="edit_workshop_btn"
          onClick={() => editButtonHandler(id)}
        >
          <RiPencilFill />
        </button>
      </div>
    </div>
  );
};

export default WorkShopCard;
