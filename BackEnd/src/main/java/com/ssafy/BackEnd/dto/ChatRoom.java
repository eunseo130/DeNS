package com.ssafy.BackEnd.dto;

//import com.ssafy.BackEnd.service.ChatService;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter

public class ChatRoom {

    private String roomId;
    private String name;

    public static ChatRoom create(String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        return chatRoom;
    }

//    private String roomId;
//    private String name;
//    private Set<WebSocketSession> sessions = new HashSet<>();
//
//    @Builder
//    public ChatRoom(String roomId, String name){
//        this.roomId = roomId;
//        this.name = name;
//    }
//
//    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService){
//        if(chatMessage.getType().equals(ChatMessage.MessageType.ENTER)){
//            sessions.add(session);
//            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다");
//        }
//        sendMessage(chatMessage, chatService);
//    }
//
//    public <T> void sendMessage(T message, ChatService chatService){
//        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
//    }


}
