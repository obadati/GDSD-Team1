import "./Message.scss";
import { format } from "timeago.js";


const Message: React.FC<any> = ({ message, own, image }) => {

    //<img src={`${BASE_URL}/${item}`}></img>
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">

                <img
                    className="messageImg"
                    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt={image.image}
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
