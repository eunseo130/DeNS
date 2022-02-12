package com.ssafy.BackEnd.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.*;
//
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSockConfig implements WebSocketMessageBrokerConfigurer {
//
//    @Override
//    // 클라이언트가 메시지를 구독할 endpoint를 정의합니다.
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        config.enableSimpleBroker("/send");
//    }
//
//    @Override
//    // connection을 맺을때 CORS 허용합니다.
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/").setAllowedOrigins("*").withSockJS();
//    }
////    @Override
////    public void configureMessageBroker(MessageBrokerRegistry config) {
////        config.enableSimpleBroker("/sub");
////        config.setApplicationDestinationPrefixes("/pub");
////    }
////
////    @Override
////    public void registerStompEndpoints(StompEndpointRegistry registry) {
////        registry.addEndpoint("/ws-stomp").setAllowedOrigins("*")
////                .withSockJS();
////    }
//}

// 은서

//import com.ssafy.BackEnd.handler.ChatHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.*;
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
////    private final ChatHandler chatHandler;
////
////    @Override
////    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
////
////        registry.addHandler(chatHandler, "ws/chat")
////                .setAllowedOrigins("http://*:8080", "http://*.*.*.*:8080")
////                .withSockJS()
////                .setClientLibraryUrl("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.2/sockjs.js");
////    }
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//
//        registry.addEndpoint("/stomp/chat")
//                .setAllowedOrigins("http://localhost:8080")
//                .withSockJS();
//    }
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        config.setApplicationDestinationPrefixes("/pub");
//        config.enableSimpleBroker("/sub");
//    }
//
//}