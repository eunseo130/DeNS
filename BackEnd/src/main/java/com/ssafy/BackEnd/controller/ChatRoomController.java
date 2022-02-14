//
//package com.ssafy.BackEnd.controller;
//
//import com.ssafy.BackEnd.dto.ChatMessage;
//import com.ssafy.BackEnd.pubsub.RedisPublisher;
//import com.ssafy.BackEnd.repository.ChatRoomRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Controller;
//
//@RequiredArgsConstructor
//@Controller
//public class ChatController {
//
//    private final RedisPublisher redisPublisher;
//    private final ChatRoomRepository chatRoomRepository;
//
//    /**
//     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
//     */
//    @MessageMapping("/chat/message")
//    public void message(ChatMessage message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            chatRoomRepository.enterChatRoom(message.getRoomId());
//            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
//        }
//        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
//        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
//    }
//}

//    private final ChatService chatService;
//
//    @PostMapping
//    public ChatRoom createRoom(@RequestParam String name){
//        return chatService.createRoom(name);
//    }
//
//    @GetMapping
//    public List<ChatRoom> findAllRoom() {
//        return chatService.findAllRoom();
//    }

//}

//// 은서
//
//import com.ssafy.BackEnd.client.UserServiceClient;
//import com.ssafy.BackEnd.dto.UserIdDto;
//import com.ssafy.BackEnd.entity.ChatRoom;
//import com.ssafy.BackEnd.service.ChatService;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/chat")
//class ChatRoomController {
//
//    private final ChatService chatService;
//    private final UserServiceClient userServiceClient;
//
//    @ApiOperation(value = "room 전체 조회", notes = "채팅 룸 전체를 조회한다.")
//    @GetMapping("/rooms")
//    public ResponseEntity<List<ChatRoom>> rooms() {
//        List<ChatRoom> rooms = chatService.findAllRoom();
//        return new ResponseEntity<>(rooms, HttpStatus.OK);
//    }
//
//    @ApiOperation(value = "채팅창 개설", notes = "채팅방을 개설한다.")
//    @PostMapping("/room")
//    public ResponseEntity<ChatRoom> createRoom(@RequestHeader("X-AUTH-TOKEN") String xAuthToken, @RequestBody UserIdDto store) {
//        UserIdDto customer = userServiceClient.getUserId(xAuthToken);
//        ChatRoom chatRoom = chatService.createChatRoom(customer, store);
//        return new ResponseEntity<>(chatRoom, HttpStatus.OK);
//    }
//
//    @ApiOperation(value = "방 정보 보기", notes = "방 정보")
//    @GetMapping("/room/{roomId}")
//    public ResponseEntity<ChatRoom> roomInfo(@PathVariable String roomId) {
//        ChatRoom room = chatService.findRoomById(roomId);
//        return new ResponseEntity<>(room, HttpStatus.OK);
//    }
//
//    @ApiOperation(value = "customer 방 조회")
//    @GetMapping("/customer")
//    public ResponseEntity<List<ChatRoom>> getRoomsByCustomer(@RequestHeader("X-AUTH-TOKEN") String xAuthToken) {
//        UserIdDto customer = userServiceClient.getUserId(xAuthToken);
//        List<ChatRoom> customerEnterRooms = chatService.getCustomerEnterRooms(customer);
//        return new ResponseEntity<>(customerEnterRooms, HttpStatus.OK);
//    }
//
//    @ApiOperation(value = "store 방 조회")
//    @GetMapping("/store")
//    public ResponseEntity<List<ChatRoom>> getRoomsByStore(@RequestHeader("X-AUTH-TOKEN") String xAuthToken) {
//        UserIdDto store = userServiceClient.getUserId(xAuthToken);
//        List<ChatRoom> customerEnterRooms = chatService.getCustomerEnterRooms(store);
//        return new ResponseEntity<> (customerEnterRooms, HttpStatus.OK);
//    }
//
//}

package com.ssafy.BackEnd.controller;

import com.ssafy.BackEnd.dto.ChatUserDto;
import com.ssafy.BackEnd.entity.ChatRoom;
import com.ssafy.BackEnd.entity.LoginInfo;
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.ChatRoomRedisRepository;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import com.ssafy.BackEnd.service.JwtServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("chat")
public class ChatRoomController {

    private final ChatRoomRedisRepository chatRoomRedisRepository;


    private final ProfileRepository profileRepository;


    @GetMapping("/room")
    public Iterable<ChatRoom> rooms() {
        Iterable<ChatRoom> all = chatRoomRedisRepository.findAll();
        return all;
    }

    @GetMapping("/rooms/{profileId}")
    public Iterable<ChatRoom> room(@PathVariable Long profileId) {
        System.out.println(profileId);
        Iterable<ChatRoom> chatRooms = chatRoomRedisRepository.findAll();
        System.out.println(profileId);
        Profile profile = profileRepository.findById(profileId).get();
        System.out.println(profileId);
        List<ChatRoom> result = new ArrayList<>();
        for (ChatRoom chatRoom : chatRooms) {
            if (chatRoom.getName().contains(profile.getName())) {
                System.out.println(chatRoom.getName());
                result.add(chatRoom);
            }
        }
        System.out.println("============result===========");
        System.out.println(result);
        return result;
    }

    @PostMapping("/room/{profileId1}/{profileId2}")
    public ChatRoom createRoom(@PathVariable Long profileId1, @PathVariable Long profileId2) {
        System.out.println(profileId1);
        Profile user1 = profileRepository.findById(profileId1).get();
        ChatUserDto chatuser1 = new ChatUserDto();
        ChatUserDto chatUser1 = chatuser1.builder().profileId(profileId1).name(user1.getName()).build();
        System.out.println(profileId2);
        Profile user2 = profileRepository.findById(profileId2).get();
        ChatUserDto chatuser2 = new ChatUserDto();
        ChatUserDto chatUser2 = chatuser2.builder().profileId(profileId2).name(user2.getName()).build();
        System.out.println(user1.getName());
        System.out.println(user2.getName());
        ChatRoom chatRoom = ChatRoom.create(chatUser1, chatUser2);
        System.out.println(chatRoom.getName());
        ChatRoom save = chatRoomRedisRepository.save(chatRoom);
        System.out.println(save.getRoomId());
        return save;
    }

//    @GetMapping("/room/enter/{roomId}")
//    public String roomDetail(Model model, @PathVariable String roomId) {
//        model.addAttribute("roomId", roomId);
//        return "/chat/roomdetail";
//    }

    @GetMapping("/room/{roomId}")
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRedisRepository.findByRoomId(roomId);
    }

    @GetMapping("/user")
    public LoginInfo getUserInfo() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return LoginInfo.builder().name(name).build();
    }
}