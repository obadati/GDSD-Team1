import "./Message.scss";
import { format } from "timeago.js";
import { BASE_URL } from "../../api/properties";


const Message: React.FC<any> = ({ message, own, image }) => {

    //<img src={`${BASE_URL}/${item}`}></img>
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">

                <img
                    className="messageImg"
                    src={`${BASE_URL}/${image.image}`}
                    alt=""
                />
                <div className="messageBubble">
                    <p className="messageText">
                        {message.messageTxt}
                    </p></div>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
export default Message;
