package com.ssafy.BackEnd.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HashTagAlgorithm {

    protected static List<String> strList(String content){
        List<String> strlist = new ArrayList<>();
        String[] strArr = content.split(" ");
        for (String s : strArr){
            if(s.charAt(0) == '#') strlist.add(s);
        }

        return strlist;
    }
}
