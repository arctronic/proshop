import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap';
import Message from '../Components/Message'
import { addCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({match,location,history}) => {
    const productId = match.params.id;
    const qty = location.search? Number(location.search.split('=')[1]) : 1
    
    const dispatch = useDispatch()

    const cart = useSelector(state=> state.cart)
    const {cartItems} = cart

    const removeFromCartHandler = (item)=>{
        dispatch(removeFromCart(item));
    }

    const checkOutHandler = (id)=>{
        history.push('/login?redirect=shipping')
    }
    
    useEffect(()=>{
        if(productId){
            dispatch(addCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const styles = {
        Row: {
          display: "block",
        }
      };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (<Message>Your cart is empty  <Link to='/'>Go Back</Link></Message>):(
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item=>(
                                    <ListGroup.Item className="ListGroup" key={item.product} variant="flush" style={styles}>
                                        <Row style={styles}>
                                            <Col md={2} className="col">
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                
                                            </Col>
                                            
                                            <Col md={3} className="col">
                                                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}> {item.name}</Link>
                                            </Col>

                                            <Col md={2} className="col" variant="light"><strong>${item.price}</strong></Col>
                                            <Col md={2} className="col">
                                            <Form.Control
                                                type="number"
                                                min={1}
                                                max={item.product.countInStock}
                                                value={item.qty}
                                                onChange={(e) => dispatch(addCart(item.product,Number(e.target.value)))}
                                                >
                                            </Form.Control>
                                            </Col>

                                            <Col md={2} className="col">
                                                <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>

                                                    <i className='fas fa-trash'></i>

                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))

                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,cur)=> acc+cur.qty,0)}) Items</h2>
                            $ {parseFloat(cartItems.reduce((acc,cur)=> acc+cur.qty*cur.price,0)).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkOutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
