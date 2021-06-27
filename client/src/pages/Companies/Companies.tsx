import { useState, useEffect } from "react";
import { listOfCompanies } from "../../api/companies";
import "./Company.scss";
import { BASE_URL } from "../../api/companies";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router";

const Companies: React.FC<any> = ({ dispatch, loading }) => {
    const history = useHistory();
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        const data = await listOfCompanies(1);
        setCompanies(data.result);
        setIsLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);

    const companyId = async (id: Number) => {
        console.log(id,"id")
        history.push(`/agentList/${id}`)
    };
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>COMPANIES</h3>
                </div>
            </div>

            {isLoading && (
                <LoaderComponent title="sit tight!"></LoaderComponent>
            )}
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa fa-home mr-3"></i>
                COMPANIES LIST
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered table-style"
                            id="dataTable"
                        >
                            <thead>
                                <tr className="alignment">
                                    <th>Logo</th>
                                    <th>Company</th>
                                    <th>Registration Number</th>
                                    <th>Date</th>
                                    <th>Agents</th>
                                </tr>
                            </thead>

                            <tbody>
                                {companies.map((item: any) => {
                                    let d = new Date(item.createdAt);
                                    let setDate = d.toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        }
                                    );
                                    return (
                                        <tr key={item.id} className="alignment">
                                            <td>
                                                <img
                                                    className="square-image"
                                                    src={
                                                        `${BASE_URL}/` +
                                                        item.logo
                                                    }
                                                    alt="Avatar"
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.registrationNumber}</td>
                                            <td>{setDate}</td>

                                            <td>
                                                <ul className="list-inline m-0">
                                                    <li className="list-inline-item"></li>

                                                    <li className="list-inline-item">
                                                        <button
                                                            className="btn btn-success btn-sm rounded-0"
                                                            type="button"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Agent"
                                                            onClick={() => {
                                                                companyId(
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            <i className="fa fa-user"></i>
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

export default Companies;
