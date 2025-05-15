import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./auth.context";

// Create context
const messageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const accessToken = user?.accessToken;
  const currentUserId = user?.user?._id;
 
  const [conversations, setConversations] = useState([]);
  const [receiverDetails, setReceiverDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [read, setRead] = useState(false);

  // Load all conversations
  const loadConversations = async function (userId) {
    if (!userId || !accessToken) {
      console.error("User ID or access token is missing");
      return;
    }
    try {
      console.log("Loading conversations", currentUserId,accessToken);
      const response = await axios.get(
        `http://localhost:3000/api/v1/messages_route/get-all-conversations?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const conversationList = response.data?.data;
      if (response.status === 200 && Array.isArray(conversationList)) {
        setConversations(conversationList);
      }
      return conversationList;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  };

  // Load receiver details
  const loadReceiverDetails = async (opponentUserIds) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/messages_route/get-other-user-details`,
        { opponentUserIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const details = response.data?.data;
      if (response.status === 200 && Array.isArray(details)) {
        setReceiverDetails(details);
      }
      return details;
    } catch (error) {
      console.error("Error fetching other user details:", error);
      throw error;
    }
  };

  // Load messages
  const loadMessages = async (conversationId, timeStamp, limit = 20) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/messages_route/get-messages`,
        {
          params: {
            conversationId,
            timeStamp,
            limit,
          },
        }
      );

      const messagesList = response.data?.data;
      if (response.status === 200 && Array.isArray(messagesList)) {
        setMessages(messagesList);
      }
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Send a message
  const sendMessage = async (content, conversationId, receiverId) => {
    try {
      const senderId = currentUserId;
      const response = await axios.post(
        "http://localhost:3000/api/v1/messages_route/send-message",
        { content, conversationId, senderId, recieverId: receiverId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data?.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  // Create a conversation
  const createConversation = async (senderId,recieverId) => {
    try {
      alert("Creating conversation",currentUserId, recieverId);
      const response = await axios.post(
        "http://localhost:3000/api/v1/messages_route/create-conversation",
        { senderId,
          recieverId, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data?.data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  };

  // Context value
  const contextValue = useMemo(
    () => ({
      createConversation,
      conversations,
      receiverDetails,
      messages,
      read,
      loadConversations,
      loadReceiverDetails,
      loadMessages,
      sendMessage,
    }),
    [conversations, receiverDetails, messages, read]
  );

  return (
    <messageContext.Provider value={contextValue}>
      {children}
    </messageContext.Provider>
  );
};

// Hook to use the message context
export const useMessage = () => {
  const context = useContext(messageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
