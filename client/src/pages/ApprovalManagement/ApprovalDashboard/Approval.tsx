import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import propertyImage from "../../../assets/images/property.png";
import agentImage from "../../../assets/images/agent.png";
import "./Approval.scss";
const Approval = () => {
    return (
        <div>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col col style-box height">
                            <h3>PROPERTY MANAGEMENT</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col style-box">
                            <Link to="/agentApproval" className="removeLine">
                                <img
                                    className="dimesion"
                                    src={agentImage}
                                    alt="agent"
                                />
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-block"
                                    >
                                        AGENT APPROVAL
                                    </button>
                                </div>
                            </Link>
                        </div>
                        <div className="col style-box">
                            <Link
                                to="/propertyApproval"
                                className="removeLine"
                            >
                                <img
                                    className="dimesion"
                                    src={propertyImage}
                                    alt="property"
                                />
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-block"
                                    >
                                        PROPERTY APPROVAL
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Approval;
