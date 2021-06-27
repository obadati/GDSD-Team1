import "./Message.scss";
import { format } from "timeago.js";
import { BASE_URL } from "../../constants/constants";

const Message: React.FC<any> = ({ message, own, image }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={`${BASE_URL}/${image.image}`}
                    alt=""
                />
                <div className="messageBubble">
                    <p className="messageText">{message.messageTxt}</p>
                </div>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
};
export default Message;
