import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./auth.context";

// Create the context
const messageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const { user } = useAuth();

  // State variables
  const [conversations, setConversations] = useState([]);
  const [otherUserDetails, setOtherUserDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [read, setRead] = useState(false);

  // Load all conversations for the current user
  const loadConversations = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/get-conversations?userId=${userId}`
      );

      const conversationList = response.data;
      if (response.status === 200 && Array.isArray(conversationList)) {
        setConversations(conversationList);
      }
      console.log("Conversations response:", conversationList);
      return conversationList;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  };

  // Load details of opponent users
  const loadOtherUserDetails = async (opponentUserIds) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/get-other-user-details`,
        { opponentUserIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const details = response.data;
      if (response.status === 200 && Array.isArray(details)) {
        setOtherUserDetails(details);
      }
      console.log("Other user details response:", details);
      return details;
    } catch (error) {
      console.error("Error fetching other user details:", error);
      throw error;
    }
  };

  // Load messages for a given conversation with pagination support
  const loadMessages = async (conversationId, timeStamp, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/get-messages`,
        {
          params: {
            conversationId,
            timeStamp,
            limit,
          },
        }
      );

      const messagesList = response.data;
      if (response.status === 200 && Array.isArray(messagesList)) {
        setMessages(messagesList);
      }
      console.log("Messages response:", messagesList);
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Send a message to a conversation
  const sendMessage = async (content, conversationId, senderId, recieverId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/send-message",
        { content, conversationId, senderId, recieverId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Message sent successfully:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  // Create a new conversation
  const createConversation = async ( recieverId) => {
    console.log("reached createConversation");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/create-conversation",
         {recieverId},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Conversation created successfully");
        console.log("Conversation created:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  };

  // Collect all functions and states into context value
  const contextValue = useMemo(
    () => ({
      createConversation,
      conversations,
      otherUserDetails,
      messages,
      read,
      loadConversations,
      loadOtherUserDetails,
      loadMessages,
      sendMessage,
    }),
    [conversations, otherUserDetails, messages, read]
  );

  return (
    <messageContext.Provider value={contextValue}>
      {children}
    </messageContext.Provider>
  );
};

// Hook to use the MessageContext
export const useMessage = () => {
  const context = useContext(messageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
