import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ListProductDetails, updateProduct } from "../actions/productAction";
import FormContainer from "../Components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConst";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDiscription] = useState("");
  const [upload, setUpload] = useState(false);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  console.log(product);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  console.log(productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/itemlist");
    } else {
      if (!product.title || product._id !== productId) {
        dispatch(ListProductDetails(productId));
      } else {
        setTitle(product.title);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDiscription(product.description);
      }
    }
  }, [dispatch, history, product, productId, successUpdate, loadingUpdate]);

  const uploadHandler = async (e) =>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image',file);
    setUpload(true);

    try{
      const config ={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload/',formData,config);
      console.log(data);
      setImage(data)
      setUpload(false)
    }catch(error){
      console.log(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        title,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/itemlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadHandler}
              ></Form.File>
              {upload && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3 rounded">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
