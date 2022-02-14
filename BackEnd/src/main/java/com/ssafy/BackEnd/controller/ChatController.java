package com.ssafy.BackEnd.controller;
import com.ssafy.BackEnd.entity.ChatMessage;

import com.ssafy.BackEnd.repository.ChatMessageRedisRepository;
import com.ssafy.BackEnd.repository.ChatMessageRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.JwtService;
import com.ssafy.BackEnd.service.JwtServiceImpl;
import com.ssafy.BackEnd.service.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class ChatController {


    private final ChatMessageRedisRepository chatMessageRedisRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final ChannelTopic channelTopic;

    private final JwtServiceImpl jwtService;

    private final RedisUtil redisUtil;

    private static final String CHAT_MESSAGES = "CHAT_MESSAGES";


    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("chat/message")
    public void message(ChatMessage message, @Header("name") String name) {
        message.setSender(name);
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setSender("[알림]");
            message.setMessage(name + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
        if (!message.getSender().equals("[알림]")) {
            ChatMessage save = chatMessageRedisRepository.save(message);
        }
    }


    @GetMapping("chat/messages/{roomId}")
    @ResponseBody
    public List<ChatMessage> messages(@PathVariable String roomId) {
        return chatMessageRedisRepository.findByRoomId(roomId);
    }
}



