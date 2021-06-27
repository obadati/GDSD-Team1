import { useState, useEffect } from "react";
import { listOfProperty } from "../../../api/approval-managemnet";
import { deleteProperty } from "../../../api/approval-managemnet";
import { propertyImages } from "../../../api/approval-managemnet";
import { deletePropertyImages } from "../../../api/approval-managemnet";
import "./PropertyApproval.scss";
import Modal from "./Modal";
import ModalPopUpImage from "./ModalImage";
import LoaderComponent from "../../../components/CustomLoader/CustomLoader";
import { BASE_URL } from "../../../constants/constants";

const PropertyApproval: React.FC<any> = () => {
    const [propertyImage, setPropertyImage] = useState([{}]);
    const [featureImage, setFeatureImage] = useState("");
    const [propertyId, setProeprtyId] = useState("");
    const [property, setProperty] = useState([]);
    const [disp, setDisp] = useState(false);
    const [disp1, setDisp1] = useState(false);
    const [data, setData] = useState({});
    const [testData, setTestData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        const data = await listOfProperty(1);
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

    const imageCall = async (id: Number) => {
        setIsLoading(true);
        const images = await propertyImages(id);
        setIsLoading(false);
        setPropertyImage(images);
    };
    const deleteRecord = async (id: Number) => {
        await deleteProperty(id);
        loadData();
    };

    const deletePropertyImage = async (id: Number, propertyId: Number) => {
        console.log(id);
        await deletePropertyImages(id);
        imageCall(propertyId);
    };
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>PROPERTY APPROVALS</h3>
                </div>
            </div>
            {isLoading && (
                <LoaderComponent title="sit tight!"></LoaderComponent>
            )}
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa fa-home mr-3"></i>
                    PROPERTY LIST
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
                                    <th>City</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
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

                                            <td>{item.city}</td>
                                            <td>{item.date}</td>
                                            <td>{item.status}</td>

                                            <td>
                                                <ul className="list-inline m-0">
                                                    <li className="list-inline-item"></li>
                                                    <li className="list-inline-item">
                                                        <button
                                                            className="btn btn-success btn-sm rounded-0"
                                                            type="button"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Edit"
                                                            onClick={() => {
                                                                setDisp(item);
                                                                setData(item);
                                                            }}
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <button
                                                            className="btn btn-danger btn-sm rounded-0"
                                                            type="button"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Delete"
                                                            onClick={() => {
                                                                deleteRecord(
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <button
                                                            className="btn btn-warning btn-sm rounded-0"
                                                            type="button"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Image"
                                                            onClick={() => {
                                                                setDisp1(item);
                                                                setData(item);
                                                                setFeatureImage(
                                                                    item.images
                                                                );
                                                                setProeprtyId(
                                                                    item.id
                                                                );
                                                                imageCall(
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            <i className="fa fa-picture-o"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {data && disp ? (
                <Modal
                    display={disp}
                    onCloseModal={() => setDisp(false)}
                    data={data}
                    loadAgent={loadAgent}
                >
                    {isLoading && (
                        <LoaderComponent title="sit tight!"></LoaderComponent>
                    )}
                    <label>Status</label>
                    <select
                        className="form-control"
                        id="status"
                        aria-label="Default select example"
                        onChange={(e) => {
                            onInputChange(e);
                            setTestData(e.target.value);
                        }}
                        value={testData}
                        name="status"
                    >
                        <option value="approved">Approve</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </Modal>
            ) : (
                data &&
                disp1 && (
                    <ModalPopUpImage
                        display={disp1}
                        onCloseModal={() => setDisp1(false)}
                        data={data}
                        loadAgent={loadAgent}
                    >
                        {isLoading && (
                            <LoaderComponent title="sit tight!"></LoaderComponent>
                        )}
                        <label>Featured Image</label>
                        <img
                            className="square-image"
                            src={`${BASE_URL}/` + featureImage}
                            alt="Avatar"
                        />
                        <br></br>
                        <br></br>
                        <label>Property Image</label>
                        {propertyId}
                        <div
                            id="carouselExampleControls"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            {propertyImage.map((item: any) => {
                                return (
                                    <div className="carousel-inner">
                                        <div
                                            className="carousel-item active"
                                            id="#carouselExampleControls"
                                            key={item.id}
                                        >
                                            <img
                                                src={`${BASE_URL}/${item.image}`}
                                                className="d-block w-100"
                                                alt="..."
                                            />
                                            <button
                                                className="btn btn-danger position"
                                                type="button"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Delete"
                                                onClick={() => {
                                                    deletePropertyImage(
                                                        item.id,
                                                        item.propertyId
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ModalPopUpImage>
                )
            )}
        </div>
    );
};

export default PropertyApproval;
