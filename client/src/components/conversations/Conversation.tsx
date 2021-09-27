import "./Conversation.scss";
// remove unused imports
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/constants";

// Review: Component should have correct typing
const Conversation: React.FC<any> = ({ conversation }) => {
  /**
   * Review: Image src should use BASE_URL constant.
   * Review: Folder name should be capitalized
   */
  return (
    <div className='conversation'>
      <img
        className='conversationImg'
        src={`${BASE_URL}/${conversation.image}`}
        alt=''
      />

      <span className='conversationName'>{conversation?.Name}</span>
    </div>
  );
};

export default Conversation;
