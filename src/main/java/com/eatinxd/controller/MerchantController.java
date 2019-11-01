package com.eatinxd.controller;

import com.eatinxd.pojo.Merchant;
import com.eatinxd.service.MerchantDal;
import com.eatinxd.tools.JsonHelper;
import com.eatinxd.tools.Upload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller()
@RequestMapping(value = "/SitesMana")
public class MerchantController extends BaseController{
    MerchantDal merchantDal=new MerchantDal();
    @RequestMapping(value = "merchant")
    public  String Merchant() {
        return "SitesMana/merchant";
    }
    @RequestMapping(value = "getMerchant")
    @ResponseBody
    public void Merchant(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("content-type", "text/json;charset=UTF-8");
        int id=this.getInt(req.getParameter("id"),190101);
        Merchant entity=new Merchant();
        entity=merchantDal.getEntity(id);
        parms=new ArrayList<>();
        parms.add(entity);
        String json=JsonHelper.toJson(parms);


        resp.getWriter().write(json);
    }
    @RequestMapping(value = "getMerchants",method = RequestMethod.POST)
    @ResponseBody
    public void getMerchantsByPage(HttpServletResponse resp,HttpServletRequest req) throws IOException {
        this.PageIndex = this.getInt(req.getParameter("index"), this.PageIndex);//页码
        this.PageSize = this.getInt(req.getParameter("size"), this.PageSize);//页码大小
        this.Word = this.getString(req.getParameter("Word"));
       // System.out.println(  this.PageIndex+"-----------"+ this.PageSize);
        resp.setHeader("content-type", "text/json;charset=UTF-8");
        MerchantDal merchantDal=new MerchantDal();
        List<Object> entyties=new ArrayList<>();
        entyties=merchantDal.getEntyties(PageSize,PageIndex,Word);
        String content = "[]";
        if (entyties.size() > 0)
        {
            content =JsonHelper.toJson(entyties);

        }

        resp.getWriter().write(content);
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
    @RequestMapping(value = "addOrUpdateMerchant",method = RequestMethod.POST)
    @ResponseBody
    public void addMerchant(HttpServletRequest req,HttpServletResponse resp,
                            @RequestParam(value = "upload", required = false) MultipartFile upload
                            ,@RequestParam(value = "oprH", required = false)String oprH
                            ,@RequestParam(value="ID",required =false)String id
                            ,@RequestParam(value="Name",required =false)String name
                            ,@RequestParam(value="description",required =false)String description){
        //System.out.println("name=>>>>>>>>>>>"+name);

        resp.setHeader("content-type", "text/html;charset=UTF-8");
        Merchant entity=new Merchant();
        entity.setLikesNum(0);
        entity.setName(name);
        entity.setDescription(description);
        Date date=new Date();
        String path="/UploadFile/";
        Upload Img=new Upload("",false,"image",req.getSession().
                getServletContext().getRealPath(path),1024*1024,path);
        System.out.println(req.getSession().getServletContext().getRealPath(path));
        if (upload != null)
        {
            Img = this.tools.uploadImg(upload, Img);
            if (Img.IsOK)
            {
                entity.setImg(Img.FilePath);
            }
        }

        if (oprH.equals("1"))//增加
        {


            PrintWriter out;

            try {
                out = resp.getWriter();
                if (merchantDal.addMerchant(entity) > 0)
                {

                    out.print("操作成功！");
                }
                else{
                    out.print("出现异常，请重试！");
                }
                out.flush();
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        else
        {

           /* entity.setName(name);
            entity.setDescription(description);*/
            entity.setId(Integer.valueOf(id));
            Merchant oldEntity = merchantDal.getEntity(entity.getId());
            oldEntity.setName(entity.getName());
            oldEntity.setDescription(entity.getDescription());
            if(Img.IsOK){
                oldEntity.setImg(entity.getImg());
            }


            PrintWriter out;
            resp.setHeader("content-type", "text/html;charset=UTF-8");
            try {
                out = resp.getWriter();
                if (merchantDal.updateEntity(oldEntity) > 0)
                {
                    out.print("操作成功！");
                }
                else
                {
                    out.print("出现异常，请重试！");
                }
                out.flush();
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
    // 获取数量
    @ResponseBody
    @RequestMapping(value="/getMerchantsCount")
    public void getDemosCount(HttpServletRequest Request, HttpServletResponse Response, HttpSession Session)
    {
        //this.State = this.getInt(Request.getParameter("state"), this.State);
        this.Word = this.getString(Request.getParameter("word"));
        int count = merchantDal.getCount(this.Word);
        String rcount=count+"";

        try {
            Response.getWriter().write(rcount);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/deleteMerchant",method=RequestMethod.POST)
    public void deletetMerchant(HttpServletResponse resp,HttpServletRequest req,String ids){
        String[] idArr = ids.split(",");
        try
        {
            for (int i = 0; i < idArr.length; i++) {
                String id=idArr[i];
                Merchant entity = merchantDal.getEntity(Integer.valueOf(id));

                PrintWriter out;
                resp.setHeader("content-type", "text/html;charset=UTF-8");
                try {
                    out = resp.getWriter();
                    if (merchantDal.deleteEntities(id) >= 0)
                    {
                        out.print("操作成功！<br/>");
                    }
                    out.flush();
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }
        catch (Exception e) {
            PrintWriter out;
            resp.setHeader("content-type", "text/html;charset=UTF-8");
            try {
                out = resp.getWriter();
                out.print("出现异常，请重试！");
                out.flush();
                out.close();
            } catch (IOException ee) {
                ee.printStackTrace();
            }
        }


    }



}
