import { useState, useEffect } from "react";
import { userQueries, DeleteQueries } from "../../api/contact";
import "./Queries.scss";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";

const Queries: React.FC<any> = () => {
  const [query, setQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const data = await userQueries(1);
    setQuery(data.result);
    setIsLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteRecord = async (id: Number) => {
    await DeleteQueries(id);
    loadData();
  };

  return (
    <div>
      <div className='row'>
        <div className='col style-box'>
          <h3>User Queries</h3>
        </div>
      </div>

      {isLoading && <LoaderComponent title='sit tight!'></LoaderComponent>}
      <div className='card mb-4'>
        <div className='card-header'>
          <i className='fa fa-user mr-3'></i>
          Contacts
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-bordered table-style' id='dataTable'>
              <thead>
                <tr className='alignment'>
                  <th>Name</th>
                  <th>Pgone</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {query.map((item: any) => {
                  let d = new Date(item.createdAt);
                  let setDate = d.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });

                  let date = d.getUTCDate();
                  let month = d.getMonth() + 1;
                  let year = d.getUTCFullYear();
                  return (
                    <tr key={item.id} className='alignment'>
                      <td> {item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>

                      <td>{setDate}</td>
                      <td>{item.description}</td>
                      <td>
                        <ul className='list-inline m-0'>
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
    </div>
  );
};

export default Queries;
