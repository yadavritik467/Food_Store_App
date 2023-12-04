import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Pagination, Table } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { allUser, deleteUser } from "../../../redux/action/authAction";

const AllUsers = () => {
  const [setLoad] = useState(false);
  const { users, user } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.search);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  const CustomerID = () => {
    let customer = users;
    if (searchQuery) {
      customer = customer?.filter((data) => {
        return data._id.toLowerCase().includes(searchQuery);
      });
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customer?.slice(startIndex, endIndex);
  };

  //   handle delete
  const handleDelete = async (id) => {
    try {
      setLoad(true);
      dispatch(deleteUser(id));
      setLoad(false);
      // if(data){
      //  toast.success(data.message)
      // }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting user");
      setLoad(false);
    }
  };

  return (
    <div>
      <div
        id="user"
        style={{ borderTop: "1px solid black", overflowX: "scroll" }}
      >
        {user.role === "admin" && (
          <div
            className=""
            style={{
              width: "100%",
              height: "86vh",
              overflowY: "scroll",
              padding: "0 25px",
            }}
          >
            <input
              onChange={(e) => {
                dispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
              style={{
                width: "100%",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid grey",
              }}
              type="text"
              placeholder="Search customer ID"
            />
            <Table style={{ color: "rgb(108, 108, 115)" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Customer ID</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Name</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Number</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Email</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Address</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Role</span>{" "}
                  </th>
                  <th style={{ border: "1px solid grey" }}>
                    {" "}
                    <span>Action</span>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {CustomerID()?.map((c) => {
                  return (
                    <tr
                      key={c._id}
                      style={{ borderBottom: "1px solid grey", width: "50px" }}
                    >
                      <td
                        style={{
                          width: "10px",
                          userSelect: "all",
                          border: "1px solid grey",
                        }}
                      >
                        <span>{c._id}</span>
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        {" "}
                        <span>{c.name}</span>
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        {" "}
                        <span>{c.number}</span>{" "}
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        {" "}
                        <span>{c.email}</span>{" "}
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        {" "}
                        <span>{c.address}</span>{" "}
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        {" "}
                        <span>{c.role}</span>{" "}
                      </td>
                      <td style={{ border: "1px solid grey" }}>
                        <span>
                          {" "}
                          <RiDeleteBin5Line
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onClick={(e) => handleDelete(c._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <Pagination className="mt-3">
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                  />
                  <li>{currentPage}</li>
           
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(users.length / itemsPerPage)
                        )
                      )
                    }
                  />
                </Pagination>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
