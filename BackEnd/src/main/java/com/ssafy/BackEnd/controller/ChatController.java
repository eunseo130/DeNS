package com.ssafy.BackEnd.controller;
import com.ssafy.BackEnd.entity.ChatMessage;
//import com.ssafy.BackEnd.pubsub.RedisPublisher;
import com.ssafy.BackEnd.repository.ChatRoomRepository;
import com.ssafy.BackEnd.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Controller
public class ChatController {

//    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final ChannelTopic channelTopic;

//    private final JwtService jwtService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
//        String token = httpServletRequest.getHeader("Authorization");
        // 수정
        message.setSender(message.getSender());
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setSender("[알림]");
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}
//
//import java.util.LinkedHashSet;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Set;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//import com.ssafy.BackEnd.dto.ChatDTO;
//import com.ssafy.BackEnd.service.IChatService;
//import com.ssafy.BackEnd.util.CmmUtil;
//
//import com.ssafy.BackEnd.util.DateUtil;
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//
///*
// * Controller 선언해야만 Spring 프레임워크에서 Controller인지 인식 가능
// * 자바 서블릿 역할 수행
// * */
//@Controller
//public class ChatController {
//    private Logger log = LogManager.getLogger(this.getClass());
//
//    /*
//     * 비즈니스 로직(중요 로직을 수행하기 위해 사용되는 서비스를 메모리에 적재(싱글톤패턴 적용됨)
//     */
//    @Resource(name = "ChatService")
//    private IChatService chatService;
//
//    /**
//     * 채팅방 초기화면
//     */
//    @RequestMapping(value = "chat/room")
//    public String index(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//        log.info(this.getClass().getName() + ".index Start!");
//
//        log.info(this.getClass().getName() + ".index End!");
//
//        return "/chat/room";
//    }
//
//    /**
//     * 채팅방 생성
//     */
//    @RequestMapping(value = "chat/room", method=RequestMethod.GET)
//    public String intro(HttpServletRequest request, HttpServletResponse response, HttpSession session,ModelMap model)
//            throws Exception {
//
//        log.info(this.getClass().getName() + ".intro Start!");
//
//        // 기존 세션에 저장된 값 삭제하기
//        session.setAttribute("SS_ROOM_NAME", "");
//
//        String user_name = CmmUtil.nvl((String)session.getAttribute("SS_USER_NAME"));
//        String roomKey = CmmUtil.nvl((String)request.getParameter("roomKey"));
//
//        log.info("user_name : " + user_name);
//        log.info("roomKey : " + roomKey);
//
//        // 세션에 값 저장하기
//        session.setAttribute("SS_ROOM_NAME", roomKey);
//
//        // 입장 환영 멘트 저장하기
//        ChatDTO pDTO = new ChatDTO();
//
//        pDTO.setRoomId(roomKey);
//        pDTO.setUsername(user_name);
//        pDTO.setMessage(user_name + "님이 입장하였습니다.");
//        pDTO.setDateTime(DateUtil.getDateTime("yyyy.MM.dd HH:mm:ss"));
//        pDTO.setType("admin");
//
//        // 채팅 멘트 저장하기
//        chatService.insertChat(pDTO);
//
//        log.info(this.getClass().getName() + ".intro End!");
//
//        return "/chat/roomdetail";
//    }
//
//    /**
//     * 채팅방 전체 리스트가져오기
//     */
//    @RequestMapping(value = "chat/rooms", method=RequestMethod.POST)
//    @ResponseBody
//    public Set<String> roomList(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//        log.info(this.getClass().getName() + ".roomList Start!");
//
//        Set<String> rSet = chatService.getRoomList();
//
//        if (rSet == null) {
//            rSet = new LinkedHashSet<String>();
//
//        }
//
//        log.info(this.getClass().getName() + ".roomList End!");
//
//        return rSet;
//    }
//
//    /**
//     * 대화 저장
//     */
//    @RequestMapping(value = "chat/message")
//    @ResponseBody
//    public List<ChatDTO> msg(HttpServletRequest request, HttpServletResponse response, HttpSession session)
//            throws Exception {
//
//        log.info(this.getClass().getName() + ".msg Start!");
//
//        String room_name = CmmUtil.nvl((String) session.getAttribute("SS_ROOM_NAME"));
//        String user_name = CmmUtil.nvl((String) session.getAttribute("SS_USER_NAME"));
//        String user_no = CmmUtil.nvl((String) session.getAttribute("SS_USER_NO"));
//
//        String msg = CmmUtil.nvl(request.getParameter("send_msg"));
//
//        log.info("user_no : " + user_no);
//        log.info("user_name : " + user_name);
//        log.info("room_name : " + room_name);
//        log.info("msg : " + msg);
//
//        List<ChatDTO> rList = null;
//
//        // 메시지가 존재하는 경우에만 대화가져오기
//        if (msg.length() > 0) {
//            ChatDTO pDTO = new ChatDTO();
//
//            pDTO.setRoomId(room_name);
//            pDTO.setUsername(user_name);
//            pDTO.setUser_no(user_no);
//            pDTO.setMessage(msg);
//            pDTO.setDateTime(DateUtil.getDateTime("yyyy.MM.dd HH:mm:ss"));
//
//            rList = chatService.insertChat(pDTO);
//
//            if (rList == null) {
//                rList = new LinkedList<ChatDTO>();
//
//            }
//
//            pDTO = null;
//
//        }
//
//        log.info(this.getClass().getName() + ".msg End!");
//
//        return rList;
//    }
//
//    /**
//     * 대화 가져오기
//     */
//    @RequestMapping(value = "chat/getMessage")
//    @ResponseBody
//    public List<ChatDTO> getMsg(HttpServletRequest request, HttpServletResponse response, HttpSession session)
//            throws Exception {
//
//        log.info(this.getClass().getName() + ".getMsg Start!");
//
//        String room_name = CmmUtil.nvl((String) session.getAttribute("SS_ROOM_NAME"));
//
//        log.info("room_name : " + room_name);
//
//        ChatDTO pDTO = new ChatDTO();
//
//        pDTO.setRoomId(room_name);
//
//        List<ChatDTO> rList = chatService.getChat(pDTO);
//
//        if (rList == null) {
//            rList = new LinkedList<ChatDTO>();
//
//        }
//
//        pDTO = null;
//
//        log.info(this.getClass().getName() + ".getMsg End!");
//
//        return rList;
//    }
//
//}


