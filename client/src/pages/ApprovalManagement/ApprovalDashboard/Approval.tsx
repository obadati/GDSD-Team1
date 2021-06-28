import React from "react";
import { Link } from "react-router-dom";
import propertyImage from "../../../assets/images/property.png";
import agentImage from "../../../assets/images/agent.png";
import "./Approval.scss";
const Approval = () => {
    return (
        <div className="approvals-page">
            <div>
                <div className="wrapper">
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
                            <Link to="/propertyApproval" className="removeLine">
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
