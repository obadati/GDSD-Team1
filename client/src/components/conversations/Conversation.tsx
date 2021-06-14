import "./Conversation.scss"


const Conversation: React.FC<any> = ({ conversation }) => {

    return (
        <div className="conversation">
            <img className="conversationImg" src="https://avatars.githubusercontent.com/u/80964042?v=4" alt="" />
            <span className="conversationName">Obada Tinawi</span>

        </div>
    );
}
export default Conversation;