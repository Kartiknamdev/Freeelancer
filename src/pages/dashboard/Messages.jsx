import { useState, useEffect, useRef } from "react";
import { HiSearch, HiChat } from "react-icons/hi";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "../../contextStore/auth.context.jsx";
import { useMessage } from "../../contextStore/message.context.jsx";

const Messages = () => {
  const { user } = useAuth();
  const currentUser = user?.user;
  //  console.log('currentUser: ', currentUser);
  //  console.log('accessToken: ', user.accessToken);
  const {
    loadConversations,
    loadRecieverDetails,
    loadMessages,
    sendMessage,
    conversations, // conversations: [{
    // conversationId, receiverId}],
    RecieverDetails, // RecieverDetails: [{
    // _id, photo,fullName, updatedAt}],
    messages, // messages: [{
    // _id, content, conversationId, senderId, recieverId, read, createdAt}],
  } = useMessage();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load all conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const conversationList = await loadConversations(currentUser._id);
        if (conversationList?.length > 0) {
          setSelectedConversation(conversationList[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?._id) fetchConversations();
  }, [currentUser]);

  // Fetch receivers details for all conversations
  useEffect(() => {
    const fetchRecieverDetails = async () => {
      setLoading(true);
      try {
        // Collect all other participant ids from conversations
        const recieverIds = new Set(
          conversations.map((conversation) => conversation.receiverId)
        );
        console.log("recieverIds: ", recieverIds);
        if (recieverIds.length > 0) {
          await loadRecieverDetails(recieverIds);
        }
      } catch (error) {
        console.error("Error fetching receiver details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (conversations.length > 0) fetchRecieverDetails();
  }, [conversations, loadRecieverDetails]);

  // Fetch messages for selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      try {
        // Use conversationId to load messages (adjust to your API param)
        await loadMessages(selectedConversation.conversationId, null, 20);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation) fetchMessages();
  }, [selectedConversation, loadMessages]);

  // Select a conversation
  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setNewMessage("");
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);
    try {
      await sendMessage(
        newMessage,
        selectedConversation.conversationId,
        currentUser._id,
        selectedConversation.receiverId
      );
      setNewMessage("");
      // Reload messages after sending
      await loadMessages(selectedConversation.conversationId, null, 20);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter conversations based on search term
  // conversation:{
  //          conversationId,
  //           receiverId,
  //        }
 const filteredConversations = conversations.filter((conversation) => {
  if (!Array.isArray(RecieverDetails)) return false;

  const receiver = RecieverDetails.find(
    (receiverDetail) => receiverDetail._id === conversation.receiverId
  );

  const name = receiver?.fullName || '';
  return name.toLowerCase().includes(searchTerm.toLowerCase());
});


  // Find current selected receiver details from RecieverDetails array
  const currentReceiver = selectedConversation
    ? RecieverDetails.find(
        (RecieverDetail) => RecieverDetail._id === selectedConversation.receiverId
      )
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-600 mt-1">
          Communicate with clients and workers
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[600px]">
          {/* Sidebar */}
          <div className="col-span-1 bg-gray-50 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="form-input pl-10 text-sm"
                  placeholder="Search conversations"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="h-[calc(600px-73px)] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin h-6 w-6 border-2 border-gray-200 border-l-primary-600 rounded-full"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredConversations.map((conversation) => {
                    const receiver = RecieverDetails.find(
                      (receiverDetail) =>
                        receiverDetail._id === conversation.receiverId
                    );

                    const photo = receiver?.photo || "/default-avatar.png";
                    const name = receiver?.fullName || "Unknown";

                    return (
                      <motion.li
                        key={conversation.conversationId}
                        whileTap={{ backgroundColor: "#F3F4F6" }}
                      >
                        <button
                          className={`w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none ${
                            selectedConversation?._id === conversation.receiverId
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => selectConversation(conversation)}
                        >
                          <div className="flex items-center">
                            <img
                              src={photo}
                              alt={name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="ml-3 flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {name}
                                </p>
                                {/* {conversation.lastMessage && (
                                  <p className="text-xs text-gray-500">
                                    {format(
                                      new Date(
                                        conversation.lastMessage.timestamp
                                      ),
                                      "h:mm a"
                                    )}
                                  </p>
                                )} */}
                              </div>
                              <div className="flex items-center justify-between">
                                {/* {conversation.lastMessage ? (
                                  <p className="text-xs text-gray-500 truncate">
                                    {conversation.lastMessage.senderId ===
                                    currentUser._id
                                      ? "You: "
                                      : ""}
                                    {conversation.lastMessage.content}
                                  </p>
                                ) : (
                                  <p className="text-xs text-gray-500">
                                    No messages yet
                                  </p>
                                )}
                                {conversation.unreadCount > 0 && (
                                  <span className="ml-1 px-2 py-1 text-xs font-bold text-white bg-primary-600 rounded-full">
                                    {conversation.unreadCount}
                                  </span>
                                )} */}
                              </div>
                            </div>
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col h-full">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img
                      src={
                        currentReceiver?.photo
                      }
                      alt={
                        currentReceiver?.fullName || "Unknown"
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {currentReceiver?.fullName || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentReceiver?.updatedAt
                          ? format(
                              new Date(currentReceiver.updatedAt),
                              "MMM d, yyyy"
                            )
                          : "No activity"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUser._id;
                    return (
                      <div
                        key={message._id}
                        className={`flex ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        } mb-4`}
                      >
                        {!isCurrentUser && (
                          <img
                            src={currentReceiver.photo}
                            alt={currentReceiver.fullName}
                            className="h-8 w-8 rounded-full object-cover mr-2"
                          />
                        )}
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isCurrentUser
                              ? "bg-primary-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isCurrentUser
                                ? "text-primary-100"
                                : "text-gray-500"
                            }`}
                          >
                            {format(new Date(message.updatedAt), "h:mm a")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="ml-3 btn-primary"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <HiChat className="h-16 w-16 text-gray-300 mb-4" />
                <p className="mb-1">No conversation selected</p>
                <p className="text-sm">
                  Select a conversation from the list to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
// This code is a React component for a messaging dashboard. It includes features like searching conversations, displaying messages, and sending new messages. The component uses hooks for state management and effects for data fetching. The UI is styled using Tailwind CSS and includes loading states and error handling.
