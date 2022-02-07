package com.ssafy.BackEnd.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;


@Getter
@RequiredArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode implements EnumModel{

//    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
//    /*
//     * 404 NOT_FOUND: 리소스를 찾을 수 없음
//     */
//    POSTS_NOT_FOUND(HttpStatus.NOT_FOUND, "게시글 정보를 찾을 수 없습니다."),
//
//    /*
//     * 405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
//     */
//    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),
//
//    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다."),
//    ;

   //private final HttpStatus status;
    //private final String message;

    INVALID_CODE(400, "C001", "Invalid Code"),
    RESOURCE_NOT_FOUND(204, "C002", "Resource not found"),
    EXPIRED_CODE(400, "C003", "Expired Code"),
    AWS_ERROR(400, "A001", "aws client error"),
    INTERNAL_SERVER_ERROR(500, "A005", "interner server error"),
    TEMPORARY_SERVER_ERROR(400, "T001", "오류 발생"),
    INVALID_ID(400, "C201", "아이디가 없음"),
    NO_VALUE_ERROR(400, "NO VALUE", "들어오는 데이터 확인"); //변수에 값이 없을 때

    private int status;
    private String code;
    private String message;
    private String detail;

    ErrorCode(int status, String code, String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    @Override
    public String getKey() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.message;
    }

}
