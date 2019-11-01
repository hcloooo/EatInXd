package com.eatinxd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/Sites")
public class IndexController {
    @RequestMapping(value = "")
    public String Index(){
        return "index";
    }
}
