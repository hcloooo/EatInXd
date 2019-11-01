package com.eatinxd.tools;

import net.sf.json.JSONArray;

import java.util.List;

public class  JsonHelper {
    public static String  toJson(List list){
        JSONArray str=JSONArray.fromObject(list);
        return str.toString();

    }
}
