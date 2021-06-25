import { useState, useEffect } from "react";
import { companyAgent } from "../../api/companies";
import "./Company.scss";
import { BASE_URL } from "../../api/companies";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router";

const AgentList: React.FC<any> = () => {
    const history = useHistory();
    const [agent, setAgent] = useState([]);
    const [isLoading, setIsLoading] =useState(false);

    const loadData = async () => {
         setIsLoading(true)
         const data = await companyAgent(1,1);
         console.log(data)
         setAgent(data.result);
         setIsLoading(false)
    };
    useEffect(() => {
        loadData();
       
    }, []);

  
  
    
    const propertyRecord= async(id:Number)=>{
        history.push('/agentProperty')
          
            }
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>AGENT LIST</h3>
                </div>
            </div>

            {isLoading && (<LoaderComponent title="sit tight!"></LoaderComponent>)}
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa fa-user mr-3"></i>
                    AGENT LIST
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered table-style"
                            id="dataTable"
                        >
                            <thead>
                                <tr className="alignment">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Property</th>
                                </tr>
                            </thead>

                            <tbody>
                                {agent.map((item: any) => {
                                    return (
                                        <tr key={item.id} className="alignment">
                                            <td>
                                                <img
                                                    className="circle-image"
                                                    src={
                                                        `${BASE_URL}/` +
                                                        item.image
                                                    }
                                                    alt="Avatar"
                                                />
                                            </td>
                                            <td>
                                                {item.firstName} {item.lastName}
                                            </td>
                                           
                                            <td>
                                                <ul className="list-inline m-0">
                                                    <li className="list-inline-item"></li>
                                                   
                                                    <li className="list-inline-item">
                                                        <button
                                                            className="btn btn-success btn-sm rounded-0"
                                                            type="button"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Delete"
                                                             onClick={()=>{propertyRecord(item.id)}}
                                                        >
                                                            <i className="fa fa-home"></i>
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
           
        </div>
    );
};

export default AgentList;
