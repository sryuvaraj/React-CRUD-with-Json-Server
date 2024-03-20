import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersList = ({ members, setMembers }) => {
  const membersAPI = "http://localhost:3001/members";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(membersAPI);
      setMembers(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${membersAPI}/${id}`);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editVals, setEditVals] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    experience: "",
  });

  const handleEdit = (member) => {
    setIsEdit(true);
    setEditVals({
        id:member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      designation: member.designation,
      experience: member.experience,
    });
  };

  const editHandleChange = (e) => {
    const { name, value } = e.target;
    setEditVals({ ...editVals, [name]: value });
  };

  const editMember = async (e) => {
    e.preventDefault()
    console.log(editVals);
    const edited = await axios.patch(`${membersAPI}/${editVals.id}`,editVals);
    loadData()
    setEditVals({
        name: "",
        email: "",
        phone: "",
        designation: "",
        experience: "",
    })
    setIsEdit(false)
  };

  return (
    <>
      <div>
        <div className="row">
        {isEdit && (
            <div className="d-flex justify-content-center">
              <form onSubmit={editMember} className="py-3" style={{width:"100vh"}}>
                <h3 className="text-warning" id="editFormHeading">Edit Details:</h3>
                <div className="form-group">
                  <label>Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editVals.name}
                    onChange={editHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editVals.email}
                    onChange={editHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone :</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={editVals.phone}
                    onChange={editHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Designation :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={editVals.designation}
                    onChange={editHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Experience :</label>
                  <input
                    type="number"
                    className="form-control"
                    name="experience"
                    value={editVals.experience}
                    onChange={editHandleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  Submit
                </button>
              </form>
            </div>
          )}
          <div className="col-md-6">
            <h3 className="text-primary mx-5 my-3">Members Details :</h3>
            <ol>
              {members.length === 0 ? (
                <h3 className="text-center">No members to display</h3>
              ) : (
                members.map((member, index) => (
                  <li
                    key={index}
                    className="m-4 pb-2"
                    style={{ borderBottom: "2px solid blue" }}
                  >
                    <p>
                      <b>Name</b>: {member.name}
                    </p>
                    <p>
                      <b>Email</b>: {member.email}
                    </p>
                    <p>
                      <b>Phone</b>: {member.phone}
                    </p>
                    <p>
                      <b>Designation</b>: {member.designation}
                    </p>
                    <p>
                      <b>Experience</b>: {member.experience}
                    </p>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(member)}
                    >
                     <a className="text-dark" style={{textDecoration:"none", listStyle:"none"}} href="#editFormHeading"> Edit</a>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersList;
