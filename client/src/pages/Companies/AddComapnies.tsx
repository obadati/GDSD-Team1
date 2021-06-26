import { useState, useEffect } from "react";
import { postCompanies } from "../../api/companies";
import "./Company.scss";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";

const AddCompanies: React.FC<any> = () => {
    const [state, setState] = useState({
  
      chooseFile: '',
      name: '',
      registrationNumber:''
  })

    const [isLoading, setIsLoading] = useState(false);

    const onChangeFile = (e:any) => {
      const target = e.target;

      setState(prevState => ({
          ...prevState,
          chooseFile: target.files[0]
      }));

      console.log(target.files[0]);
  };

    const onHandleSubmit = async(e:any) => {
      e.preventDefault();
      let data = new FormData();
      data.append('logo', state['chooseFile']);
      data.append('name', state['name']);
      data.append('registrationNumber', state['registrationNumber']);
      console.log(data,"data")
      await postCompanies(data)
     
  }
  const onHandleTextChange = (e:any) => {
    const target = e.target
    setState(prevState => ({
        ...prevState, [target.name]: target.value
    }))
}
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
                 <form onSubmit={onHandleSubmit}> 

               
  <div className="row">
    <div className="col">
      <input type="text" className="form-control" name="name" placeholder="Company Name"  onChange={onHandleTextChange}
                                                />
    </div>
    <div className="col">
      <input type="text" className="form-control" placeholder="Registration Number" name="registrationNumber"  onChange={onHandleTextChange}
                                                />
    </div>
  </div>
  <br></br>
  <div className="input-group mb-3">
  
  <div className="custom-file">
    <input type="file" className="custom-file-input" name='chooseFile'  onChange={onChangeFile} />
    <label className="custom-file-label" >Choose file</label>
  </div>
</div>
  <input type="submit" name="submit" className="btn btn-primary" value="Submit" />
 </form> 
</div>
                </div>
            </div>
        </div>
    );
};

export default AddCompanies;
