import React, { useEffect } from "react";
import { getAgentProperties } from "../../api/properties";
import { useAuth } from "../../hooks/auth";
import { PropertiesPage } from "../../pages";
import { connect, ConnectedProps } from "react-redux";
import { setAgentProperties } from "../../store/properties/actions";

const AgentProperties: React.FC<PropsFromRedux> = ({ dispatch }) => {
  const { userId } = useAuth();
  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  const loadData = async () => {
    const { result } = await getAgentProperties(JSON.stringify(userId));
    dispatch(setAgentProperties(result));
  };
  return (
    <div>
      <PropertiesPage agent></PropertiesPage>
    </div>
  );
};

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AgentProperties);
