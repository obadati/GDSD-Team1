
import AppLogo from "../../../assets/images/logo.png";
const GeneralInfo: React.FC<any> = () => {
  const font = {
    fontSize: "20px",
  };
  const logo = {
    height: "150px",
    width: "auto",
  };

  return (
    <>
      <div className="container">
        <img
          style={logo}
          className="float-right"
          src={AppLogo}
        />
        <div className="generalInfo-heading">
          <h2>HomeForMe</h2>
        </div>
        <div className="Content">
          <p style={font}>Motivation Importance</p>
          <br></br>
          <p style={font}>
            The real estate market is one of the most complex markets in the
            entire world since it is in a continuous change, thus making it a
            very dynamic market. Ihe intemet has a lot to offer consumers
            regarding real estate and as a result it is a great place to start
            shopping. The buyer and seller have direct access to information
            about the property in question. This makes other forms of
            communication between the buyer and the seller obsolete. The
            internet is easy in comparison to the old-fashioned method of
            answering dozens of phenes calls or setting up numerous meetings
            milestone.
          </p>

          <p style={font}>
            All in all, there is no better, safer and easier way to search for a
            home or to sel one than online as the internet has a lot to offer in
            the real estate market anditisrapidy developing. gaining more and
            more consumers every day and thuS improving your chances for a
            profitable buy/sell.
          </p>
          <br></br>
          <p style={font}>Target Audience:</p>
          <br></br>
          <p style={font}>
            The target of our applications is the customer5 who cannot spend
            more time for buying and selling the housing property.
          </p>
          <br></br>
          <p style={font}>
            Online real estate has become popular and Is consuming are looking
            in the intenet more each day as an easy pace to get good.
          </p>
        </div>
      </div>
    </>
  );
};
export default GeneralInfo;
