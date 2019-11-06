package com.eatinxd.service;

import com.eatinxd.dao.MerchantIdal;
import com.eatinxd.pojo.Merchant;
import com.eatinxd.tools.ConnectHelper;
import com.eatinxd.tools.PageInfo;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MerchantDal implements MerchantIdal {

    ConnectHelper helper=new ConnectHelper();
    private List<Object> parms=null;
    private String className=getClass().getName();
    private String tableName=className.substring(className.lastIndexOf(".")+1, className.indexOf("Dal"));


    @Override
    public List<Object> getEntyties(int pageSize, int pageIndex, String word) {
        List<Object> entyties=new ArrayList<Object>();
        int count =getCount(word);
        int page = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
        pageIndex = pageIndex <= 1 ? 1 : pageIndex > page ? page : pageIndex;
        String where="";
        parms=new ArrayList<Object>();
        if (!helper.StrIsNull(word))
        {
            where+=" and (Name like ?) ";
            parms.add(where);
        }
        PageInfo pageinfo=new PageInfo("*",tableName,where," likesNum desc ", page,pageSize);
        ResultSet rs=helper.getEntitys(pageinfo, parms);
        try {
            while (rs.next()) {
                entyties.add(new Merchant(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4), rs.getString(5)));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }


        return entyties;
    }

    @Override
    public List<Object> getEntyties() {
        List<Object> entities=new ArrayList<Object>();
        String sql="select *from Merchant";
        List<Object> parms=new ArrayList<Object>();
        parms=new ArrayList<Object>();
        ResultSet rs=helper.getEntities(sql,parms);
        try {
            while(rs.next()){
                entities.add(new Merchant(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getInt(4),rs.getString(5)));
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return  entities;
    }

    @Override
    public Merchant getEntity(int id) {
        Merchant entity=null;
        String sql="select * from "+"Merchant" +" where 1=1 and ID=?";
         parms=new ArrayList();
        parms.add(id);
        ResultSet rs=helper.getEntityById(sql,parms);
        try {
            while(rs.next()){
                entity=new Merchant(rs.getInt(1),rs.getString(2),
                        rs.getString(3), rs.getInt(4),
                        rs.getString(5));

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return entity;
    }

    @Override
    public int addMerchant(Merchant merchant) {
        String sql="insert into Merchant values(null,?,?,?,?)";
        parms=new ArrayList();
        parms.add(merchant.getName());

        parms.add(merchant.getDescription());
        parms.add(merchant.likesNum);
        parms.add(merchant.getImg());
        int num=0;
        num=helper.executeUpdate(sql,parms);
        return num;
    }

    @Override
    public int addLikesNum(int id) {
        int num=0;
        String sql="update Merchant set likesNum=? where id=?";
        Merchant merchant=getEntity(id);
        try{
            int likesNum=merchant.getLikesNum();
            likesNum++;
            merchant.setLikesNum(likesNum);
            List<Object> parms =new ArrayList<Object>();
            parms.add(likesNum);
            parms.add(id);
            num=helper.executeUpdate(sql,parms);

        }catch (Exception e){
            e.printStackTrace();
        }
        return  num;

    }

    @Override
    public int updateEntity(Merchant entity) {
        String sql="update "+tableName+" set Name=?,Description=?,LikesNum=?,Img=? where Id=?";

        parms=new ArrayList();
        parms.add(entity.getName());
        System.out.println("----------------"+entity.getName());
        parms.add(entity.getDescription());
        parms.add(entity.getLikesNum());
        parms.add(entity.getImg());
        parms.add(entity.getId());
        int num=0;
        num=helper.executeUpdate(sql,parms);
        return num;
    }



    @Override
    public int deleteEntities(String id) {

        String sql="delete from Merchant where id=?";
        int num=0;
        parms =new ArrayList<>();
        parms.add(id);
        num=helper.executeUpdate(sql,parms);
        return num;

    }

    public int getCount(String Word)
    {
        int count = 0;
        String SQL="select count(*) from "+tableName +" where 1=1 ";
        if (!helper.StrIsNull(Word))
        {
            SQL+=" and (Name like ? ) ";
        }
        parms=new ArrayList<Object>();
        if (!helper.StrIsNull(Word))
        {
            parms.add("%"+Word+"%");
        }
        count=helper.getCount(SQL, parms);
        return count;
    }
}
