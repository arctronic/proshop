import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { deleteProduct, listProduct, createProduct } from "../actions/productAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConst";

const ProductListScreen = ({ history,match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete,success: successDelete, error: errorDelete } = productDelete;

  const createdProduct = useSelector((state) => state.producCreate);
  const { loading: loadingCreate,success: successCreate, error: errorCreate, product } = createdProduct;

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if(successCreate){
      history.push(`/admin/product/${product._id}/edit`)
    }else{
      dispatch(listProduct())
    }
  }, [dispatch, history, userInfo,successDelete,product,successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete the user?")) {
    //   dispatch(deleteUser(id));
    dispatch(deleteProduct(id));
    dispatch(listProduct());
    }
  };

  const createProductHandler = ()=>{
      dispatch(createProduct());
  }
  return (
    <>

        <Row className='align-items-center'>
            <Col>
                <h1><h1>Products</h1></h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>Add product
                </Button>
            </Col>
        </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Edit or Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="info" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
