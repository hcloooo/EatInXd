package com.eatinxd.controller;

import com.eatinxd.service.MerchantDal;
import com.eatinxd.tools.JsonHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "Sites")
public class WxMerchatController {
    MerchantDal merchantDal=new MerchantDal();
    @RequestMapping(value = "getMerchants")
    @ResponseBody
    public void Merchant(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        resp.setContentType("text/json; charset=utf-8");

        List<Object> entyties=new ArrayList<>();
        entyties=merchantDal.getEntyties();
        String json= JsonHelper.toJson(entyties);
        System.out.println(json);

        resp.getWriter().write(json);
    }
    @RequestMapping(value="addLikesNum",method= RequestMethod.POST)
    @ResponseBody
    public int addLikesNum(String id,HttpServletRequest rep,HttpServletResponse resp) throws IOException {

        if(true){
            int num=merchantDal.addLikesNum(Integer.parseInt(id));
        }else{
            resp.getWriter().write("wrong");
        }

        return 0;
    }

}

