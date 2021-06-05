import MissionLogo from "../../../assets/images/mission.png";
import "../../AboutUs/component/styles/aboutUs.scss";
const Mission: React.FC<any> = () => {
  return (
    <div>
      <div className="container">
      <img
          className="float-right logo"
          src={MissionLogo}
        />
        <div className="generalInfo-heading">
          
        </div>
        <div className="Content">
          <h2><strong>Mission</strong></h2>
          <br></br>
          <p>Our mission is to inspire a positive, lasting impact.</p>
          <br></br>
          <h4><strong>HFM VALUES</strong></h4>
          <br></br>
          <p>
           <ul>
             <li><b>HUMBLE.</b> We never forget that we owe everything to the efforts of each team member, our families, and our clients.</li>
             <li><b>GRIT.</b> We persevere in our efforts no matter the obstacle with a high sense of urgency and always keeping our team and clients top of mind.</li>
             <li><b>INTEGRITY.</b> We promise to always do the right thing for our team, our business, and our clients, resulting in mutual success.</li>
             <li><b>SERVANT LEADERSHIP.</b> We are passionate about giving back in the communities we serve.</li>
            <li><b>ACCOUNTABLE.</b> We operate with a high level of accountability, taking full ownership in delivering on our commitment to excellence.</li>
            <li><b>INNOVATIVE.</b> We pursue excellence by pushing each other to be better every day and seeing possibility instead of limitation.</li>
            <li><b>SOLUTION-BASED.</b> We are resourceful, always seeking to discover a solution and providing options for any concerns that arise.</li>
           </ul>
          </p>
          <br></br>
        </div>
      </div>
    </div>
  );
};
export default Mission;
