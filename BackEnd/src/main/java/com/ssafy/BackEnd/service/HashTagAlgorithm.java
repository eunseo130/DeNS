package com.ssafy.BackEnd.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HashTagAlgorithm {
    public static List<String> strList(String content){

        List<String> strlist = new ArrayList<>();
        String[] strArr = content.split("#");
        for (String s : strArr){
            if(s.equals(" ")) continue;
            String key = s;
            strlist.add(key);
        }
        return strlist;
    }
}
