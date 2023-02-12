import React, { useState, Fragment } from "react";
import "./App.css";
import data from "./data.json";
import ReadUser from "./components/ReadUser";
import EditUser from "./components/EditUser";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      firstName: addFormData.firstName,
      middleName: addFormData.middleName,
      lastName: addFormData.lastName,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      middleName: editFormData.middleName,
      lastName: editFormData.lastName,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      firstName: editFormData.firstName,
      middleName: editFormData.middleName,
      lastName: editFormData.lastName,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const handleButton = () => {
    document.getElementById("addUser").style.display = "block";
  };

  return (
    <div className="app-container">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-end">
            <p className="pointer" onClick={handleButton}>
              + Add User
            </p>
          </div>
        </div>
      </div>
      <h1>All Users</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditUser
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadUser
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <div id="addUser" style={{ display: "none" }}>
        <h2>Add a user</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            className="form-control"
            type="text"
            name="firstName"
            required="required"
            placeholder="Enter first..."
            onChange={handleAddFormChange}
          />
          <input
            className="form-control"
            type="text"
            name="middleName"
            required="required"
            placeholder="Enter middle..."
            onChange={handleAddFormChange}
          />
          <input
            className="form-control"
            type="text"
            name="lastName"
            required="required"
            placeholder="Enter Last..."
            onChange={handleAddFormChange}
          />

          <input
            className="form-control"
            type="email"
            name="email"
            required="required"
            placeholder="Enter an email..."
            onChange={handleAddFormChange}
          />
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
