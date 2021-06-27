import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../containers/Router/routes";
import { Developer } from "../../../../models/Developer";
import "./DeveloperCard.scss";

interface OwnProps extends Developer {}
const DeveloperCard: React.FC<OwnProps> = ({
    name,
    tagline,
    description,
    imgUrl,
}) => {
    const history = useHistory();
    const navigateToDeveloperDetail = (e: any) => {
        e.preventDefault();
        history.push(AppRoutes.AboutDeveloper.replace(":id", name), {
            developer: { name, tagline, description, imgUrl },
        });
    };

    return (
        <div className="developer-card">
            <div className="developer-card__header">
                <img src={imgUrl} className="img-responsive img-style-box" />
                <Link
                    to={{
                        pathname: AppRoutes.About,
                        state: {
                            developer: { name, tagline, imgUrl, description },
                        },
                    }}
                    className="about-link"
                >
                    <button onClick={navigateToDeveloperDetail}>About</button>
                </Link>
            </div>
            <div className="developer-card__content">
                <p className="developer-card__content--name">{name}</p>
                <p className="developer-card__content--tagline">{tagline}</p>
                <p className="developer-card__content--description">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default DeveloperCard;
