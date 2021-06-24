import { useState, useEffect } from "react";
import { listOfCompanies } from "../../api/companies";
import { deleteCompanes } from "../../api/companies";
import "./Company.scss";
import { BASE_URL } from "../../api/companies";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";

const AddCompanies: React.FC<any> = () => {
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

    const deleteRecord = async (id: Number) => {
        await deleteCompanes(id);
        loadData();
    };
    return (
        <div>
            <div className="row">
                <div className="col style-box">
                    <h3>REGISTER COMPANIES</h3>
                </div>
            </div>

            {isLoading && (
                <LoaderComponent title="sit tight!"></LoaderComponent>
            )}
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa fa-home mr-3"></i>
                     ADD COMPANIES 
                </div>
                <div className="card-body">
                <div className="wrapper">
                <form>

               
  <div className="row">
    <div className="col">
      <input type="text" className="form-control" placeholder="First name"/>
    </div>
    <div className="col">
      <input type="text" className="form-control" placeholder="Last name"/>
    </div>
  </div>
  <br></br>
  <div className="input-group mb-3">
  
  <div className="custom-file">
    <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
    <label className="custom-file-label" >Choose file</label>
  </div>
</div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
                </div>
            </div>
        </div>
    );
};

export default AddCompanies;
