import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const ContactUs: React.FC<any> = () => {
  let history = useHistory();
  var val = Math.floor(1000 + Math.random() * 9000);
  const [user, setUser] = useState({
    id: val,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const { name, username, email, phone, website } = user;
  const onInputChange = (e:any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e:any) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);
    history.push("/");
  };
  return (
    <div>
      <div className="container">
        <div className="Content">
            <div className="w-100    mx-auto shadow p-5">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Your E-mail Address"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Phone Number"
                    name="phone"
                    value={phone}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    
                    className="form-control form-control-lg"
                    placeholder="Enter Your Query"
                    name="website"
                    value={website}
                    onChange={(e:any) => onInputChange(e)}
                  />
                  
                </div>
                <button className="btn btn-danger btn-block">Send Query</button>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
