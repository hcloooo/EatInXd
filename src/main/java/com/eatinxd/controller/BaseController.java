package com.eatinxd.controller;

import java.text.SimpleDateFormat;
import java.util.List;

import com.eatinxd.tools.Tools;
import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;



@Controller
public class BaseController {
    // 常用字段

    /// <summary>
    /// 页码
    /// </summary>
    public int PageIndex = 1;

    /// <summary>
    /// 页码大小
    /// </summary>
    public int PageSize = 10;

    /// <summary>
    /// 状态 （大部分 1正常 -1删除）
    /// </summary>
    public int State = 1;

    /// <summary>
    /// 关键字，常用语模糊查询以及后台
    /// </summary>
    public String Word = null;

    public SimpleDateFormat sdfymd=new SimpleDateFormat("yyyy-MM-dd");
    public SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    // 常用类

    /// <summary>
    /// 帮助类
    /// </summary>
    public Tools tools = new Tools();

    /// <summary>
    /// 序列化
    /// </summary>
    public String js(Object list){

        JSONArray str=JSONArray.fromObject(list);

        return str.toString();
    }


    // 常用方法

    /**
     * 根据字符串转换数字，并给出默认值
     * @param str 要验证的字符串  num 要验证的字符串
     * @return 返回默认值或者数字
     */
    public int getInt(String str,int num)
    {
        if (!StrIsNull(str))
        {
            try
            {
                num = Integer.valueOf(str);
            }
            catch (Exception e) {
                System.out.println("转换数字异常,当前字符串："+str);
            }
        }
        return num;
    }

    /// <summary>
    /// 恢复字符串
    /// </summary>
    /// <param name="str">要恢复的字符串</param>
    /// <returns>返回已恢复的字符串</returns>
    public String getString(String str)
    {
        //暂时不实现
        return str;
    }

    public List<Object> parms=null;

    public String Where = null;

    /**
     * 字符串是否为空
     * @param str 要验证的字符串
     * @return boolean false 不为空，true为空
     */
    public boolean StrIsNull(String str){
        boolean Isnull=false;
        if(str == null || str.length() <= 0){
            Isnull=true;
        }
        return Isnull;
    }
}
