import { useState, useEffect } from "react";
import { listOfProperty } from "../../../api/approval-managemnet";
import { deleteProperty } from "../../../api/approval-managemnet";
import "./PropertyApproval.scss";
import Modal from "./Modal";

const PropertyApproval: React.FC<any> = () => {
    const [property, setProperty] = useState([]);
    const [disp, setDisp] = useState(false);
    const [data, setData] = useState({});

    const loadData = async () => {
        const data = await listOfProperty(1);
        setProperty(data.result);
        console.log(data.result)
    };
    useEffect(() => {
        loadData();
    }, []);

    const onInputChange = (e:any) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const loadAgent=(value:any)=>{
      setDisp(false)
      if(value==true){
        loadData()
      }
    }

    const deleteRecord= async(id:Number)=>{
      await  deleteProperty(id)
        loadData();
        
          }
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>PROPERTY APPROVALS</h3>
                </div>
            </div>
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
                                    <th>Location</th>
                                    <th>City</th>
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
                                            <td>{item.location}</td>
                                            <td>{item.city}</td>
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
                                                            onClick={()=>{deleteRecord(item.id)}}
                                                        >
                                                            <i className="fa fa-trash"></i>
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
            {data && disp && (
        <Modal display={disp} onCloseModal={() => setDisp(false)} data ={data} loadAgent={loadAgent}>
      {console.log(data)}
          <label>Status</label>
          <select
            className="form-control"
            id="status"
            aria-label="Default select example"
            onChange={(e) => onInputChange(e)}
            name="status"
          >
            {/* <option selected>{data['status']}</option> */}
            <option value="approved">Approve</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        
        </Modal>
      )}
        </div>
    );
};

export default PropertyApproval;