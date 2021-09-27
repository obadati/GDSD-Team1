import React from "react";
import { useHistory } from "react-router";

const CreateContract = () => {
  const history = useHistory();
  const state = history.location.state;
  return <div className='app-page'></div>;
};

export default CreateContract;
