import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { createContact } from "../../../api/contact";
const ContactUs: React.FC<any> = () => {
  let history = useHistory();
  var val = Math.floor(1000 + Math.random() * 9000);
  const [user, setUser] = useState({
    id: val,
    name: "",
    description: "",
    email: "",
    phone: "",
  });

  const { name, description, email, phone } = user;
  const onInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await createContact(user);
    history.push("/");
  };
  return (
    <div>
      <div className='container'>
        <div className='Content'>
          <div className='w-100    mx-auto shadow p-5'>
            <h2 className='text-center mb-4'>Contact Us</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Enter Your Name'
                  name='name'
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className='form-group'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='Enter Your E-mail Address'
                  name='email'
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Enter Your Phone Number'
                  name='phone'
                  value={phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='form-group'>
                <textarea
                  className='form-control form-control-lg'
                  placeholder='Enter Your Query'
                  name='description'
                  value={description}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button className='btn btn-success btn-block' onClick={onSubmit}>
                Send Query
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
