import { useState, useEffect } from "react";
import { listOfProperty } from "../../../api/approval-managemnet";
import { deleteProperty } from "../../../api/approval-managemnet";
 import { propertyImages } from "../../../api/approval-managemnet";
import "./PropertyApproval.scss";
import Modal from "./Modal";

import { BASE_URL } from "../../../api/approval-managemnet";
import ModalPopUpImage from "./ModalImage";
import LoaderComponent from "../../../components/CustomLoader/CustomLoader";

const PropertyApproval: React.FC<any> = () => {
     const [propertyImage, setPropertyImage] =useState({ });
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

    const imageCall =async(id:Number)=>{
        const images = await propertyImages(id)
        setPropertyImage(images);
    }
    

    const deleteRecord = async (id: Number) => {
        await deleteProperty(id);
        loadData();
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
                                                                setProeprtyId(item.id)
                                                                imageCall(item.id)

                                                              
                                                                

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

                        
                       {console.log(propertyId)}
                        {propertyId}
                       {console.log(propertyImage)} 
                                          
                        <div
                            id="carouselExampleControls"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">

                                {/* {
                           propertyImage.map((item:any)=>{
                               return(
                                <div className="carousel-item active" key={item.id}>
                                        <img
                                        src={`${BASE_URL}/` + item.image}
                                        className="d-block w-100"
                                        alt="..."
                                    />
                                      </div>
                               )
                           })
                                } */}

                                    

                              
                               
                                
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </ModalPopUpImage>
                )
            )}
        </div>
    );
};

export default PropertyApproval;
