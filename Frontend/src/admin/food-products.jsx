import React, { useEffect, useState } from "react";
import "./admin.css";
import SideNav from "./side-nav";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import Loader from "../components/UI/Loader";
import axios from "axios";
import { CartState } from "../context/Context";
// import { Reveal } from "react-reveal";
import LoginLoader from "../components/UI/loginLoader";

const FoodProducts = ({ dark }) => {
  const [load, setLoad] = useState(false);
  const [cload, setCload] = useState(false);
  const [Foods, setFoods] = useState([]);
  const [image, setImage] = useState("");
  const [items, setItems] = useState({
    title: "",
    price: "",
  });
  // const [editData, setEditData] = useState({
  //   title: "",
  //   price: "",
  // });
  // const [editTitle, setEditTitle] = useState("");
  // const [editPrice, setEditPrice] = useState("");
  const [showModal, setShowModal] = useState(false);

  const options = ["Chicken", "Egg", "Fish", "Mutton", "SeaFood"];
  const [category, setCategory] = useState(options[0]);
  const [caro, setCaro] = useState([]);
  // const [editCategory, setEditCategory] = useState(options[0]);

  //--------------------------------------------------------------------------------  search filter

  const {
    searchState: { searchQuery },
    searchDispatch,
  } = CartState();

  const transformFood = () => {
    let sortedFood = Foods;
    if (searchQuery) {
      sortedFood = sortedFood.filter((data) => {
        return data.title.toLowerCase().includes(searchQuery)
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
  const getAllFoods = async () => {
    try {
      // setLoad(true);
      const { data } = await axios.get(
        "/items/foods"
      );
      // setLoad(false);
      if (data) {
        setFoods(data.food);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting food");
      
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  //--------------------------------------------------------------------------------  food creation

  let createHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const { data } = await axios.post(
        "/items/create-foods",
        {
          title: items.title,
          price: items.price,

          image,
          category: category,
        },
        
      );
      setLoad(false);
      if (data) {
        toast.success("item created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoad(false);
    }
    getAllFoods();
  };

  //--------------------------------------------------------------------------------  handle update item
  // -------------------------------it is yet to be worked on

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

  const updateHandler = async (_id) => {
    // e.preventDefault();
    try {
      // setLoad(true);

      const { data } = await axios.put(
        `/items/update-foods/${_id}`,
        {
          title: items.title,
          price: items.price,

          image,
          category: category,
        },

        
      );
      // setLoad(false);

      if (data) {
        // setFoods(data.food);
        toast.success(data.message);
        // console.log(data);
      }
      getAllFoods();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in updating food");
    }
    getAllFoods();
    console.log(_id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //--------------------------------------------------------------------------------  handle food deleting

  const handleDelete = async (id) => {
    try {
      // setLoad(true);
      const { data } = await axios.delete(
        `/items/delete-foods/${id}`,
        
      );
      // setLoad(false);
      if (data) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      getAllFoods();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting food");
    }
    // console.log(id);
  };

  //--------------------------------------------------------------------------------  set carousel



  const getAllCarousel = async (req, res) => {
    // setLoad(true);
    const { data } = await axios.get(
      "/caro/caro-get"
    );
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
      const { data } = await axios.post(
        "/caro/caro-update",
        {
          title: items.title,
          heading: items.title,
          image,
        },
        
      );
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
      const { data } = await axios.delete(
        `/caro/caro-delete/${id}`, 
      );
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
            borderTop:"1px solid black",
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
                 {load ? <LoginLoader/> : "Update Item" } 
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
                 {cload ? <LoginLoader/> : "Update Item"} 
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
                      searchDispatch({
                        type: "FILTER_BY_SEARCH",
                        payload: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="search your item here !!"
                  />{" "}
                  <br />
                  {/* --------------------------------------------------------------------------------  getting all food */}
                  {transformFood().map((c) => {
                    return (
                      <div
                        key={c._id}
                        style={{
                          borderBottom: "1px solid gray",
                          // display: "flex",
                          //  flexWrap:"wrap",
                          justifyContent: "space-evenly",
                          padding: "5px 0 0 0",
                          // alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            // flexWrap:"wrap",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            // padding: "5px 0 0 0",
                            // alignItems: "flex-start",
                          }}
                        >
                          <img
                            src={c.image.url}
                            style={{
                              height: "100px",
                              width: "100px",
                              borderRadius: "40px",
                            }}
                            alt=""
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
                                  <form onSubmit={() => updateHandler(c._id)}>
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

                                    {/* <input
                                      type="file"
                                      name="image"
                                      required={true}
                                      files="image"
                                      accept="image/*"
                                      onChange={handleUpdateChange}
                                    />
                                    <small
                                      style={{ margin: "auto", color: "red" }}
                                    >
                                      File size should be less than *60kb*
                                    </small> */}
                                    <select
                                      name="category"
                                      id="category"
                                      onChange={(e) =>
                                        setCategory(e.target.value)
                                      }
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
                              {/* </Reveal> */}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* -------------------------------------------------------------------------------- getting all carousel */}
              <div style={{ padding: "4rem 2.5rem ",  }}>
                <p>All your carousel </p> <br />
                <div className="admin_caro">
                  {" "}
                  {caro.map((c) => {
                    return (
                      <div style={{display:"flex",padding: "1rem 2.5rem ",flexDirection:"column",justifyContent:"center",alignItems:"center"}} key={c._id}>
                        <img
                          src={c.image.URL}
                          style={{
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
