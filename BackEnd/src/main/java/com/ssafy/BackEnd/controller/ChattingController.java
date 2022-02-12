//package com.ssafy.BackEnd.controller;
//
//import com.ssafy.BackEnd.client.UserServiceClient;
//import com.ssafy.BackEnd.dto.ChatMessageDTO;
//import com.ssafy.BackEnd.dto.UserIdDto;
//import com.ssafy.BackEnd.entity.ChatMessage;
//import com.ssafy.BackEnd.entity.ChatRoom;
//import com.ssafy.BackEnd.pubsub.RedisPublisher;
//import com.ssafy.BackEnd.service.ChatService;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RestController;
//
//@RequiredArgsConstructor
//@Slf4j
//@RestController
//@CrossOrigin
//public class ChattingController {
//
//    private final RedisPublisher redisPublisher;
//    private final UserServiceClient userServiceClient;
//    private final ChatService chatService;
//
//    /**
//     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
//     */
//    @ApiOperation(value = "채팅방 메시지", notes = "메시지")
//    @MessageMapping("/chat/message")
//    public void message(ChatMessage message) {
//        log.info("채팅 메시지");
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setSender("[알림]");
//            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
//        } else if(ChatMessage.MessageType.QUIT.equals(message.getType())) {
//            message.setSender("[알림]");
//            message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
//            chatService.deleteById(message.getRoomId());
//        }
//        chatService.save(message);
//        ChannelTopic topic = chatService.getTopic(message.getRoomId());
//        redisPublisher.publish(topic, message);
//    }
//}
