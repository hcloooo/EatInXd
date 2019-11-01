package com.eatinxd.dao;

import com.eatinxd.pojo.Merchant;
import com.eatinxd.tools.PageInfo;

import java.util.List;

public interface MerchantIdal {
    public List<Object> getEntyties(int  pageSize,int pageIndex,String word);
    public List<Object> getEntyties();
    public Merchant getEntity(int id);
    public  int addMerchant(Merchant merchant);
    public int addLikesNum(int id);
    public  int updateEntity(Merchant entity);
    public int deleteEntities(String ids);
}
