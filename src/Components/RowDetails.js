import React from "react";

const RowDetails = ({
  userName,
  emaill,
  phone,
  date,
  time,
  nbPlaces,
  acceptHandler,
  deleteHandler,
  _id,
}) => {
  return (
    <tr>
      <td>{userName}</td>
      <td>{emaill}</td>
      <td>{phone}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{nbPlaces}</td>
      <td
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
        }}
      >
        <span
          value="Accepter"
          id="Accepter"
          onClick={() => acceptHandler(_id, emaill)}
        >
          <i class="fa-solid fa-circle-check"></i>
        </span>
      </td>
      <td
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span id="Refuser" onClick={() => deleteHandler(_id)}>
          <i class="fa-solid fa-trash"></i>
        </span>
      </td>
    </tr>
  );
};

export default RowDetails;
