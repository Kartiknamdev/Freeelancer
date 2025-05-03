import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiSearch, HiChat } from 'react-icons/hi'
import { format } from 'date-fns'
import { useAuth } from '../../hooks/useAuth'
import { mockConversations, mockMessages } from '../../data/mockData'
import { motion } from 'framer-motion'

const Messages = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  
  // Load conversations on mount
  useEffect(() => {
    if (user) {
      // Filter conversations that include the current user
      const userConversations = mockConversations.filter(conv => 
        conv.participants.includes(user.id)
      )
      
      // Get the last message for each conversation
      const conversationsWithDetails = userConversations.map(conv => {
        const otherParticipantId = conv.participants.find(id => id !== user.id)
        
        // For demo, we'll use fixed user data
        let name, avatar
        if (otherParticipantId === 'user_1') {
          name = 'Alex Johnson'
          avatar = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        } else {
          name = 'Sarah Miller'
          avatar = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
        
        // Get the most recent message
        const conversationMessages = mockMessages.filter(
          msg => msg.conversationId === conv.id
        )
        
        const lastMessage = conversationMessages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )[0]
        
        // Count unread messages
        const unreadCount = conversationMessages.filter(
          msg => !msg.read && msg.receiverId === user.id
        ).length
        
        return {
          ...conv,
          otherParticipant: {
            id: otherParticipantId,
            name,
            avatar
          },
          lastMessage,
          unreadCount
        }
      })
      
      // Sort by most recent message
      conversationsWithDetails.sort(
        (a, b) => new Date(b.lastMessage?.timestamp || 0) - new Date(a.lastMessage?.timestamp || 0)
      )
      
      setConversations(conversationsWithDetails)
      
      // If we have conversations, select the first one
      if (conversationsWithDetails.length > 0) {
        setSelectedConversation(conversationsWithDetails[0])
        
        // Get messages for the first conversation
        const firstConvMessages = mockMessages.filter(
          msg => msg.conversationId === conversationsWithDetails[0].id
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        
        setMessages(firstConvMessages)
      }
      
      setLoading(false)
    }
  }, [user])
  
  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)
    
    // Get messages for this conversation
    const conversationMessages = mockMessages.filter(
      msg => msg.conversationId === conversation.id
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    
    setMessages(conversationMessages)
    
    // Mark messages as read (in a real app, this would be an API call)
    // For demo, we'll just update the UI
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    )
  }
  
  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !selectedConversation) return
    
    // Create new message
    const newMsg = {
      id: `msg_new_${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: user.id,
      receiverId: selectedConversation.otherParticipant.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    }
    
    // Update messages state
    setMessages([...messages, newMsg])
    
    // Update conversation with new last message
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === selectedConversation.id
          ? { 
              ...conv, 
              lastMessage: newMsg
            }
          : conv
      )
    )
    
    // Clear input
    setNewMessage('')
    
    // In a real app, you would send this to your API
  }
  
  // Filter conversations by search term
  const filteredConversations = conversations.filter(conv => 
    conv.otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          {/* Conversations sidebar */}
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
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-l-primary-600"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredConversations.map((conversation) => (
                    <motion.li 
                      key={conversation.id}
                      whileTap={{ backgroundColor: '#F3F4F6' }}
                    >
                      <button
                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none ${
                          selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center">
                          <img
                            src={conversation.otherParticipant.avatar}
                            alt={conversation.otherParticipant.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {conversation.otherParticipant.name}
                              </p>
                              {conversation.lastMessage && (
                                <p className="text-xs text-gray-500">
                                  {format(new Date(conversation.lastMessage.timestamp), 'h:mm a')}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              {conversation.lastMessage ? (
                                <p className="text-xs text-gray-500 truncate">
                                  {conversation.lastMessage.senderId === user.id ? 'You: ' : ''}
                                  {conversation.lastMessage.content}
                                </p>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  No messages yet
                                </p>
                              )}
                              {conversation.unreadCount > 0 && (
                                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col h-full">
            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img
                      src={selectedConversation.otherParticipant.avatar}
                      alt={selectedConversation.otherParticipant.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedConversation.otherParticipant.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.otherParticipant.id === 'user_1' 
                          ? 'Client' : 'Worker'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message, index) => {
                    const isCurrentUser = message.senderId === user.id
                    
                    return (
                      <div 
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        {!isCurrentUser && (
                          <img
                            src={selectedConversation.otherParticipant.avatar}
                            alt={selectedConversation.otherParticipant.name}
                            className="h-8 w-8 rounded-full object-cover mr-2"
                          />
                        )}
                        <div
                          className={`
                            max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                            ${isCurrentUser 
                              ? 'bg-primary-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                            }
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`
                            text-xs mt-1
                            ${isCurrentUser ? 'text-primary-100' : 'text-gray-500'}
                          `}>
                            {format(new Date(message.timestamp), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Chat input */}
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
                <p className="text-sm">Select a conversation from the list to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages