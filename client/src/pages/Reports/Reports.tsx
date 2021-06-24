import React from "react";
import { useState, useEffect } from "react";
import { getAllPropertiesByAdminStatus } from "../../api/properties";
import "./Reports.scss";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PropertyApproval: React.FC<any> = () => {
    const [property, setProperty] = useState([]);
    const [disp, setDisp] = useState(false);
    const [data, setData] = useState({});
    const [testData, setTestData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("approved");

    const loadData = async (status = "approved") => {
        setIsLoading(true);
        const data = await getAllPropertiesByAdminStatus(status, 1);
        setProperty(data.result);
        setIsLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);

    const onInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loadAgent = (value: any) => {
        setDisp(false);
        if (value == true) {
            loadData();
        }
    };
    const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus((e.target as HTMLInputElement).value);
        console.log(status);
        loadData(status);
    };
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>Property List by Admin Status</h3>
                </div>
            </div>
            <RadioGroup
                aria-label="Status"
                name="status"
                value={status}
                onChange={changeStatus}
                className="radio-status"
            >
                <FormControlLabel
                    value="approved"
                    label="Pending"
                    control={<Radio />}
                />
                <FormControlLabel
                    value="pending"
                    label="Approved"
                    control={<Radio />}
                />
            </RadioGroup>
            {isLoading && (
                <LoaderComponent title="sit tight!"></LoaderComponent>
            )}
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa fa-home mr-3"></i>
                    Property List
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered table-style"
                            id="dataTable"
                        >
                            <thead>
                                <tr className="alignment">
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Room</th>
                                    <th>Size</th>
                                    <th>Location</th>
                                    <th>City</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {property.map((item: any) => {
                                    return (
                                        <tr key={item.id} className="alignment">
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.room}</td>
                                            <td>{item.size}</td>
                                            <td>{item.location}</td>
                                            <td>{item.city}</td>
                                            <td>{item.date}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyApproval;
