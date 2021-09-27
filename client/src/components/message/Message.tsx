import "./Message.scss";
import { format } from "timeago.js";
import { BASE_URL } from "../../constants/constants";

/**
 * Review: Component name should be more descriptive.
 * Review: Use proper types for components.
 * Review: Folder name to be capitalized
 * Review: Missing import React
 * Review: should check for nullish values before accessing nested properties like message.messageText
 */

const Message: React.FC<any> = ({ message, own, image }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className='messageTop'>
        <img className='messageImg' src={`${BASE_URL}/${image.image}`} alt='' />
        <div className='messageBubble'>
          <p className='messageText'>{message.messageTxt}</p>
        </div>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
};
export default Message;
