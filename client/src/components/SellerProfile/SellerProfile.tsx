import React, { useState } from "react";
import "./SellerProfile.scss";
import ReactStars from "react-stars";
import Avatar from "../../assets/images/avatar.png";

interface SellerProfileProps {
    image:string
    stars: number;
    sellerName: string;
    sellerCompany: string;
    actions: string[];
}

const SellerProfileComponent: React.FC<SellerProfileProps> = ({
    image,
    stars,
    sellerName,
    sellerCompany,
    actions,
}) => {
    return (
        <div className="seller-info-card">
            <div className="avatar">
                <img src={image} alt="avatar" />
            </div>
            <div>
                <h2 className="seller-name">{sellerName}</h2>
                <h3 className="seller-company">{sellerCompany}</h3>
            </div>
            <div className="rating">
                <ReactStars
                    count={5}
                    value={stars}
                    edit={false}
                    size={18}
                    color2={"#ffd700"}
                />
            </div>
            <div>
                <button className="action">Message Agent</button>
                <button className="action">Create Contact</button>
                <button className="action">Get Average Price</button>
                <button className="action">Add To Compare</button>
            </div>
        </div>
    );
};

export default SellerProfileComponent;
