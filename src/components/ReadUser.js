import React from "react";

const ReadUser = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.firstName}</td>
      <td>{contact.middleName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.email}</td>
      <td>
        <button
          className="btn btn-primary"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadUser;
