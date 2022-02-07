package com.ssafy.BackEnd.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HashTagAlgorithm {

    public static List<String> strList(String content){
        List<String> strlist = new ArrayList<>();
        String[] strArr = content.split(" ");
        for (String s : strArr){
            if(s.charAt(0) == '#') {
                String key = s.substring(1);
                strlist.add(key);
            }
        }
        return strlist;
    }
}
