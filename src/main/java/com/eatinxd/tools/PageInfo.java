package com.eatinxd.tools;

public class PageInfo {

    public PageInfo(String field, String tableName, String where, String order, int page, int pageSize) {
        Field = field;
        TableName = tableName;
        Where = where;
        Order = order;
        Page = page;
        PageSize = pageSize;
    }

    //字段
    public String Field;
    //表名
    public String TableName;
    //条件
    public String Where;
    //排序
    public String Order;
    //页码
    public  int Page;
    //Size
    public  int PageSize;
}
