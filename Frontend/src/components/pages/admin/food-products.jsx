import React, { useEffect, useState } from "react";
import "./admin.css";
// import SideNav from "./side-nav";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
// import Loader from "../components/UI/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoginLoader from "../../UI/loginLoader";
import { creatFood, deleteFood, getAllFood, upateFood } from "../../../redux/action/foodAction";

const FoodProducts = () => {
  const [load, setLoad] = useState(false);
  const [cload, setCload] = useState(false);
  // const [Foods, setFoods] = useState([]);
  const [image, setImage] = useState("");
  const [items, setItems] = useState({
    title: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const options = ["Chicken", "Egg", "Fish", "Mutton", "SeaFood"];
  const [category, setCategory] = useState(options[0]);
  const [caro, setCaro] = useState([]);

  const {foods} = useSelector((state)=>state.food)
  const dispatch = useDispatch();

  //--------------------------------------------------------------------------------  search filter

  const { searchQuery } = useSelector((state)=>state.search);
  

  const transformFood = () => {
    let sortedFood = foods;
    if (searchQuery) {
      sortedFood = sortedFood?.filter((data) => {
        return data.title.toLowerCase().includes(searchQuery);
      });
    }
    return sortedFood;
  };

  //--------------------------------------------------------------------------------  set product list and images

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setItems({
        ...items,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.value);
    }
  };
  //--------------------------------------------------------------------------------  getting all food

  useEffect(() => {
    dispatch(getAllFood());
  }, [dispatch]);

  //--------------------------------------------------------------------------------  food creation

  let createHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      await dispatch(
        creatFood(items.title, items.price, image, category)
      );
      await dispatch(getAllFood());
      setLoad(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoad(false);
    }
  };


// handeling item
  const handleUpdateChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setItems({
        ...items,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.value);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        upateFood(items.title,items.price, image, category,id)
      );
      await dispatch(getAllFood());
      setShowModal(false)
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in updating food");
    }
  };

  const openModal = (_id) => {
    setShowModal(true);
  setId(_id)
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //--------------------------------------------------------------------------------  handle food deleting

  const handleDelete = async (_id) => {
    try {
    await dispatch(deleteFood(_id))
    await dispatch(getAllFood());
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting food");
    }
  };

  //--------------------------------------------------------------------------------  set carousel

  const getAllCarousel = async (req, res) => {
    // setLoad(true);
    const { data } = await axios.get("/caro/caro-get");
    // setLoad(false);
    if (data) {
      setCaro(data.caro);
      // setLoad(false);
    }
    // console.log(data.caro);
  };

  useEffect(() => {
    getAllCarousel();
  }, []);

  // -------------------------------------------------------------------------------- creating Carousel here

  const carouselHandler = async (e) => {
    e.preventDefault();
    try {
      setCload(true);
      const { data } = await axios.post("/caro/caro-update", {
        title: items.title,
        heading: items.title,
        image,
      });
      setCload(false);

      if (data) {
        // console.log(data.caro);
        toast.success("carousel created successfully");

        getAllCarousel();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, error);
      setCload(false);
    }
  };

  // -------------------------------------------------------------------------------- deleting caro delete

  const caroDelete = async (id) => {
    try {
      // setLoad(true);
      const { data } = await axios.delete(`/caro/caro-delete/${id}`);
      // setLoad(false);
      if (data) {
        toast.success(data.message);
        getAllCarousel();
      } else {
        toast.error(data.message);  
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting food");
    }
    console.log(id);
  };

  return (
    // -------------------------------------------------------------------------------- for creating food
    <div>
      <div
        id="food_creator"
        style={{
          borderTop: "1px solid black",
          height: "fit-content",
          display: "flex",
          flexWrap: "wrap",

          overflowY: "scroll",
          // gap: " 20px",
        }}
      >
        <div className="update-food">
          <form
            action="/items/create-foods"
            onSubmit={createHandler}
            encType="multipart/form-data"
            method="post"
          >
            <h3> Update your item here !!</h3>

            <input
              type="text"
              name="title"
              required={true}
              placeholder="title"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              required={true}
              placeholder="price"
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              required={true}
              files="image"
              accept="image/*"
              onChange={handleChange}
            />
            <small style={{ margin: "auto", color: "red" }}>
              File size should be less than *60kb*
            </small>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              {options.map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </select>
            <button type="submit" style={{ padding: "5px 10px" }}>
              {load ? <LoginLoader /> : "Update Item"}
            </button>
            <br />
          </form>

          {/* -------------------------------------------------------------------------------- creating carousel here  */}
          <form
            action="/items/create-foods"
            onSubmit={carouselHandler}
            encType="multipart/form-data"
            method="post"
          >
            <h3> Update your carousel here !!</h3>

            <input
              type="text"
              name="title"
              required={true}
              placeholder="heading"
              onChange={handleChange}
            />
            <input
              type="text"
              name="heading"
              required={true}
              placeholder="title"
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              required={true}
              files="image"
              accept="image/*"
              onChange={handleChange}
            />
            <small style={{ margin: "auto", color: "red" }}>
              File size should be less than *60kb*
            </small>

            <button
              type="submit"
              style={{ padding: "5px 10px", margin: "15px 0 0 0" }}
            >
              {cload ? <LoginLoader /> : "Update Item"}
            </button>
            <br />
          </form>
        </div>

        {/* {load ? (
            <Loader />
          ) : ( */}
        <div className=" update-food">
          <div
            style={{
              width: "350px",
              height: "640px",
              overflowY: "scroll",
              overflowX: "hidden",
              // padding: "0 15px",
              border: "1px solid gray",
            }}
          >
            <div
              style={{
                color: "rgb(108, 108, 115)",
                // width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <br />
              <p>All Your Food Item</p> <br />
              <input
                // style={{marginLeft:"auto"}}
                onChange={(e) => {
                  dispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
                type="text"
                placeholder="search your item here !!"
              />{" "}
              <br />
              {/* --------------------------------------------------------------------------------  getting all food */}
              {transformFood()?.map((c) => {
                return (
                  <div
                    key={c._id}
                    style={{
                      borderBottom: "1px solid gray",
                      justifyContent: "space-evenly",
                      padding: "5px 0 0 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <img
                        src={c.image.url}
                        style={{
                          objectFit:"cover",
                          height: "100px",
                          width: "100px",
                          borderRadius: "40px",
                        }}
                        alt={c.title}
                      />

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p> title: {c.title}</p>
                        <p>price: {c.price}</p>
                        <p>category: {c.category}</p>
                      </div>
                      <div>
                        {" "}
                        <RiDeleteBin5Line
                          style={{
                            color: "black",
                            fontSize: "40px",
                            cursor: "pointer",
                            padding: "10px",
                          }}
                          onClick={() => handleDelete(c._id)}
                        />
                        <AiTwotoneEdit
                          style={{
                            color: "black",
                            fontSize: "40px",
                            cursor: "pointer",
                            padding: "10px",
                          }}
                          onClick={() => openModal(c._id)}
                        />
                      </div>
                      {showModal && (
                        <div className="modal">
                          {/* <Reveal> */}
                          <div className="modal-content">
                            <h2>Edit Item</h2>
                            <form onSubmit={updateHandler}>
                              <input
                                type="text"
                                name="title"
                                placeholder="title"
                                onChange={handleUpdateChange}
                              />
                              <input
                                type="number"
                                name="price"
                                placeholder="price"
                                onChange={handleUpdateChange}
                              />
                              
                              <select
                                name="category"
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                defaultValue={category}
                              >
                                {options.map((option, idx) => (
                                  <option key={idx}>{option}</option>
                                ))}
                              </select>

                              {/* other input fields for item properties */}
                              <div className="modal-buttons">
                                <button type="submit">Update</button>
                                <button onClick={() => closeModal(c._id)}>
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------------------------- getting all carousel */}
          <div style={{ padding: "4rem 2.5rem " }}>
            <p>All your carousel </p> <br />
            <div className="admin_caro">
              {" "}
              {caro.map((c) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      padding: "1rem 2.5rem ",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={c._id}
                  >
                    <img
                      src={c.image.URL}
                      style={{
                        objectFit:"cover",
                        height: "100px",
                        width: "100px",
                        borderRadius: "40px",
                      }}
                      alt=""
                    />
                    <h3>{c.heading}</h3>
                    <p>{c.title}</p>
                    <RiDeleteBin5Line
                      style={{
                        color: "black",
                        fontSize: "40px",
                        cursor: "pointer",
                        padding: "10px",
                      }}
                      onClick={(e) => caroDelete(c._id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default FoodProducts;
