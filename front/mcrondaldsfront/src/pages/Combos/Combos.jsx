import React, { useContext } from "react";
import "./Combos.css";
import { CartContext } from "../../context/CartContext";

const Combos = () => {
    const { addToCart } = useContext(CartContext);


    return (
        <div className="combos__container">
            <h1 className="combos__item combos__title">
                Combos
            </h1>
            <div className="combos__item grid__menu">
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Hamburguesa Grande
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    doble carne y doble queso
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Hamburguesa Mediana
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    Hamburguesa + papas
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Hamburguesa clasica
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    Hamburguesa pequeña
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid__item">
                    <div>
                        <a className="product-link" href="#">
                            <img className="img-product" src="https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"></img>
                        </a>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            <a className="product-item-link" href="#">
                                Brasa Personal
                            </a>
                        </strong>
                        <a className="description-container">
                            <div className="product-item-inner">
                                <div className="product-item-description">
                                    <p>
                                    1/4 pollo, papas fritas,
                                    gaseosa 500ml y salsas.
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a className="price-box product-item">
                            <div className="price-box">
                                <span className="special-price">
                                    S/ 15.90
                                </span>
                                <span className="old-price">
                                    S/ 31.90
                                </span>
                            </div>
                        </a>
                        <div className="product-item-dinner">
                            <div className="product-item-btn">
                                <div className="actions-primary">
                                    <form className="tocart-form">
                                        <div className="fieldset">
                                            <button className="btn-add-tocart">
                                                <span>
                                                    Agregar
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Combos;