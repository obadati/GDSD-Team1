import { useState, useEffect } from "react";
import { listOfAgent } from "../../../api/approval-managemnet";
import "./AgentApproval.scss";
import Modal from "./Modal";
import { deleteAgent } from "../../../api/approval-managemnet";
import LoaderComponent from "../../../components/CustomLoader/CustomLoader";
import { BASE_URL } from "../../../constants/constants";

const AgentApproval: React.FC<any> = () => {
  // Review: Correctly add types to useState
  const [agent, setAgent] = useState([]);
  // Review: variable name should be descriptive
  const [disp, setDisp] = useState(false);
  // Review: variable name should be descriptive
  const [data, setData] = useState({ status: "" });
  const [testData, setTestData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const data = await listOfAgent(1);
    setAgent(data.result);
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

  const deleteRecord = async (id: Number) => {
    await deleteAgent(id);
    loadData();
  };
  return (
    <div>
      <div className='row'>
        <div className='col style-box'>
          <h3>AGENT APPROVALS</h3>
        </div>
      </div>

      {isLoading && <LoaderComponent title='sit tight!'></LoaderComponent>}
      <div className='card mb-4'>
        <div className='card-header'>
          <i className='fa fa-user mr-3'></i>
          AGENT LIST
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-bordered table-style' id='dataTable'>
              <thead>
                <tr className='alignment'>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Post</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {agent.map((item: any) => {
                  return (
                    <tr key={item.id} className='alignment'>
                      <td>
                        <img
                          className='circle-image'
                          src={`${BASE_URL}/` + item.image}
                          alt='Avatar'
                        />
                      </td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>{item.date}</td>
                      <td>{item.status}</td>

                      <td>
                        <ul className='list-inline m-0'>
                          <li className='list-inline-item'></li>
                          <li className='list-inline-item'>
                            <button
                              className='btn btn-success btn-sm rounded-0'
                              type='button'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Edit'
                              onClick={() => {
                                setDisp(item);
                                setData(item);
                                setTestData(item.status);
                              }}>
                              <i className='fa fa-edit'></i>
                            </button>
                          </li>
                          <li className='list-inline-item'>
                            <button
                              className='btn btn-danger btn-sm rounded-0'
                              type='button'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Delete'
                              onClick={() => {
                                deleteRecord(item.id);
                              }}>
                              <i className='fa fa-trash'></i>
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
        <Modal
          display={disp}
          onCloseModal={() => setDisp(false)}
          data={data}
          loadAgent={loadAgent}>
          {isLoading && <LoaderComponent title='sit tight!'></LoaderComponent>}
          <label>Status</label>
          <select
            className='form-control'
            id='status'
            aria-label='Default select example'
            onChange={(e) => {
              onInputChange(e);
              setTestData(e.target.value);
            }}
            name='status'
            value={testData}>
            <option value='approved'>Approve</option>
            <option value='pending'>Pending</option>
            <option value='rejected'>Rejected</option>
          </select>
        </Modal>
      )}
    </div>
  );
};

export default AgentApproval;
