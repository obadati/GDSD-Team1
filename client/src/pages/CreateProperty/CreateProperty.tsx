import React from "react";
import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";
import {
  createProperty,
  CreatePropertyParams,
  getAllProperties,
  updateProperty,
} from "../../api/properties";
import { PropertyCategories } from "../../components/Filters/Filters";
import { useAuth } from "../../hooks/auth";
import { setLoadingState } from "../../store/loader/actions";
import { setAllProperties } from "../../store/properties/actions";
import { Property } from "../../store/properties/types";
import "./CreateProperty.scss";

const CreateProperty: React.FC<PropsFromRedux> = ({ dispatch }) => {
  const history = useHistory();
  const { id: agentId, token } = useAuth();
  const [formData, setFormData] = useState<CreatePropertyParams>({
    token,
    title: "",
    description: "",
    price: 0,
    location: "",
    image: "",
    categoryId: "2",
    size: "",
    room: 1,
    city: "",
  });

  const resolveCategory = (label: string): PropertyCategories => {
    if (label.toLowerCase() === PropertyCategories.Apartment) {
      return PropertyCategories.Apartment;
    }
    if (label.toLowerCase() === PropertyCategories.Rent) {
      return PropertyCategories.Rent;
    }
    if (label.toLowerCase() === PropertyCategories.House) {
      return PropertyCategories.House;
    }
    return PropertyCategories.House;
  };

  const handleFormSubmit = async () => {
    try {
      dispatch(setLoadingState(true));
      await createProperty(formData);
      const { result } = await getAllProperties();
      dispatch(setAllProperties(result));
      dispatch(setLoadingState(false));
    } catch (e) {
      dispatch(setLoadingState(false));
    }
  };

  const handleImageChange = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className='app-page create-property-page'>
      <div className='wrapper'>
        <p className='form-title'>Upload </p>
        <form id='create-prop-form'>
          <label htmlFor='=title'>Title</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='form-control'
            id='title'
            type='text'
            placeholder='Title'
            value={formData.title}
          />
          <label htmlFor='=title'>Category</label>
          <div className='dropdown'>
            <button
              style={{ width: "100%" }}
              className='btn btn-info dropdown-toggle app-button'
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'>
              {/* {resolveCategory(formData.category.name)} */}
            </button>
            <div
              style={{ width: "100%" }}
              className='dropdown-menu'
              aria-labelledby='dropdownMenuButton'>
              {Object.keys(PropertyCategories)?.map((x, index) => (
                <a
                  className='dropdown-item'
                  onClick={() => {
                    setFormData({
                      ...formData,
                      //   category: {
                      //     ...formData.category,
                      //     name: resolveCategory(x),
                      //     id: JSON.stringify(index + 1),
                      //   },
                    });
                  }}>
                  {resolveCategory(x)}
                </a>
              ))}
            </div>
          </div>

          <label htmlFor='description'>Description</label>
          <textarea
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className='form-control'
            id='description'
            placeholder='Description'
            value={formData.description}
          />

          <label htmlFor='=location'>Location</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
            className='form-control'
            id='location'
            type='text'
            placeholder='Location'
            value={formData.location}
          />
          <label htmlFor='city'>City</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
            className='form-control'
            id='city'
            type='text'
            placeholder='City'
            value={formData.city}
          />

          <label htmlFor='=location'>Size m^2</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                size: e.target.value,
              })
            }
            className='form-control'
            id='size'
            type='number'
            placeholder='Size'
            value={formData.size}
          />

          <label htmlFor='rooms'>Rooms</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                room: parseInt(e.target.value),
              })
            }
            className='form-control'
            id='rooms'
            type='number'
            min={1}
            placeholder='rooms'
            value={formData.room}
          />

          <label htmlFor='images'>Images</label>
          <input
            onChange={handleImageChange}
            placeholder='images'
            id='images'
            type='file'
            name='myImage'
            accept='image/png, image/gif, image/jpeg'
            max={20000}
          />
        </form>
        <button type='submit' className='app-button' onClick={handleFormSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CreateProperty);
