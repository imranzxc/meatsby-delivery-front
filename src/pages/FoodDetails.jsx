import React, { useState, useEffect } from 'react';

//import products from '../assets/fake-data/products';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { cartActions } from '../store/shopping-cart/cartSlice';

import '../styles/product-details.css';

import ProductCard from '../components/UI/product-card/ProductCard';
import { getProduct } from '../store/shopping-cart/productSlice';
import { useSelector } from 'react-redux';

const FoodDetails = () => {
  const [tab, setTab] = useState('desc');
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [reviewMsg, setReviewMsg] = useState('');

  const products = useSelector((state) => state.product.products);
  const [prod, setProd] = useState(products);

  const loading = useSelector((state) => state.product.loading);

  const { id } = useParams();

  const dispatch = useDispatch();

  const product = prod.filter((product) => Number(product.id) === Number(id));

  const [previewImg, setPreviewImg] = useState(product.image01);

  const relatedProduct = prod.filter((item) => item.category === item.category);

  const addItem = (id, title, price, image01) => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      }),
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Helmet title="Product-details">
      <CommonSection title={product.title} />

      <section>
        {products.map((item) => {
          console.log(item);
          if (Number(item.id) === Number(id)) {
            // setPreviewImg(item.image01)
            return (
              <Container>
                <Row>
                  <Col lg="2" md="2">
                    <div className="product__images ">
                      <div className="img__item mb-3" onClick={() => setPreviewImg(item.image01)}>
                        <img
                          src={`http://localhost:4200/${item.image01}`}
                          alt=""
                          className="w-50"
                        />
                      </div>
                      <div className="img__item mb-3" onClick={() => setPreviewImg(item.image02)}>
                        <img
                          src={`http://localhost:4200/${item.image02}`}
                          alt=""
                          className="w-50"
                        />
                      </div>

                      <div className="img__item" onClick={() => setPreviewImg(item.image03)}>
                        <img
                          src={`http://localhost:4200/${item.image03}`}
                          alt=""
                          className="w-50"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col lg="4" md="4">
                    <div className="product__main-img">
                      <img
                        src={`http://localhost:4200/${previewImg || item.image01}`}
                        alt=""
                        className="w-100"
                      />
                    </div>
                  </Col>

                  <Col lg="6" md="6">
                    <div className="single__product-content">
                      <h2 className="product__title mb-3">{item.title}</h2>
                      <p className="product__price">
                        {' '}
                        Price: <span>${item.price}</span>
                      </p>
                      <p className="category mb-5">
                        Category: <span>{item.category}</span>
                      </p>

                      <button
                        onClick={() => addItem(item.id, item.title, item.price, item.image01)}
                        className="addTOCart__btn">
                        Add to Cart
                      </button>
                    </div>
                  </Col>

                  <Col lg="12">
                    <div className="tabs d-flex align-items-center gap-5 py-3">
                      <h6
                        className={` ${tab === 'desc' ? 'tab__active' : ''}`}
                        onClick={() => setTab('desc')}>
                        Description
                      </h6>
                      <h6
                        className={` ${tab === 'rev' ? 'tab__active' : ''}`}
                        onClick={() => setTab('rev')}>
                        Review
                      </h6>
                    </div>

                    {tab === 'desc' ? (
                      <div className="tab__content">
                        <p>{item.desc}</p>
                      </div>
                    ) : (
                      <div className="tab__form mb-3">
                        <div className="review pt-5">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">jhon1@gmail.com</p>
                          <p className="feedback__text">great product</p>
                        </div>

                        <div className="review">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">jhon1@gmail.com</p>
                          <p className="feedback__text">great product</p>
                        </div>

                        <div className="review">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">jhon1@gmail.com</p>
                          <p className="feedback__text">great product</p>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                          <div className="form__group">
                            <input
                              type="text"
                              placeholder="Enter your name"
                              onChange={(e) => setEnteredName(e.target.value)}
                              required
                            />
                          </div>

                          <div className="form__group">
                            <input
                              type="text"
                              placeholder="Enter your email"
                              onChange={(e) => setEnteredEmail(e.target.value)}
                              required
                            />
                          </div>

                          <div className="form__group">
                            <textarea
                              rows={5}
                              type="text"
                              placeholder="Write your review"
                              onChange={(e) => setReviewMsg(e.target.value)}
                              required
                            />
                          </div>

                          <button type="submit" className="addTOCart__btn">
                            Submit
                          </button>
                        </form>
                      </div>
                    )}
                  </Col>

                  <Col lg="12" className="mb-5 mt-4">
                    <h2 className="related__Product-title">You might also like</h2>
                  </Col>

                  {relatedProduct.map((item) => (
                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                      <ProductCard item={item} />
                    </Col>
                  ))}
                </Row>
              </Container>
            );
          }
        })}
      </section>
    </Helmet>
  );
};

export default FoodDetails;
