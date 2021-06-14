import "./Message.scss";
import { format } from "timeago.js";


const Message: React.FC<any> = ({ own }) => {


    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <div className="messageBubble">
                    <p className="messageText">
                        As you know, the Chinese government keeps a close eye on how people in the country use the internet
                    </p></div>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
}
export default Message;
