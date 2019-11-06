package com.eatinxd.tools;
import java.sql.*;
import java.util.List;
import com.eatinxd.tools.PageInfo;
public class ConnectHelper {
    //tent001--mysql 5.7
    private static final String url = "jdbc:mysql://106.53.4.55/eatinxd?useSSL=false&useUnicode=true&characterEncoding=UTF-8";
    private static final String driverName = "com.mysql.jdbc.Driver";
    private static final String userName = "root";
    private static final String password = "qq2016";
    //aliNO1---mysql8--mysql8的驱动地址变了
  /*  private static final String url = "jdbc:mysql://139.224.55.171/eatinxd?useSSL=false&useUnicode=true&characterEncoding=UTF-8";
    private static final String driverName = "com.mysql.cj.jdbc.Driver";
    private static final String userName = "root";
    private static final String password = "qq2016";*/
    //sql server
    /*private final String driverName="com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private final String url="jdbc:sqlserver://localhost:1433;DatabaseName=EatInXd";
    private final String userName="sa";
    private final String password="qq2016";*/
    Connection conn=null;
    Statement stmt=null;
    PreparedStatement psmt=null;
    ResultSet rs=null;
    String sql=null;

    public Connection getConnection(){
        try{
            Class.forName(driverName);
        }catch(Exception e){
            System.out.println("驱动加载失败");
            e.printStackTrace();
            return null;
        }try{
            return DriverManager.getConnection(url,userName,password);
        }catch(Exception e){
            System.out.println("数据库连接失败");
            e.printStackTrace();
            return null;
        }
    }
    public void closeAll (Connection conn,PreparedStatement psmt,ResultSet rs){
        try {
            if(rs!=null){
                this.rs.close();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        try {
            if(psmt!=null){
                psmt.close();
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        try {
            if(conn!=null){
                conn.close();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public ResultSet getEntitys(PageInfo pageinfo, List<Object> p) {
        rs = null;
        setSQL(pageinfo);// 解析sql语句
        conn = this.getConnection();
        try {
           // System.out.println(sql);
            psmt = conn.prepareStatement(sql);
            if (this.psmt != null) {
                for (int i = 0; i < p.size(); i++) {
                    this.psmt.setObject(i + 1, p.get(i));
                }
            }
            rs = psmt.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;
    }
    public ResultSet getEntities(String sql,List<Object> p){
        try{
            rs=null;
            conn=this.getConnection();
            psmt=conn.prepareStatement(sql);
            if(this.psmt!=null);{
                for(int i=0;i<+p.size();i++){
                    psmt.setObject(i+1,p.get(i));
                }
                rs=psmt.executeQuery();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return rs;

    }
    public ResultSet getEntityById(String sql, List<Object> p){
       // System.out.println(sql);
        rs=null;
        conn=this.getConnection();
        try {
            psmt=conn.prepareStatement(sql);
            if(this.psmt!=null){
                for(int i =0;i<p.size(); i++){
                    this.psmt.setObject(i+1,p.get(i));
                }
            }
            rs=psmt.executeQuery();
        }catch(Exception e){
            e.printStackTrace();
        }
        return rs;
    }
    public int executeUpdate(String sql,List<Object> p) {
       // System.out.println(sql);
        int num=0;
        conn=this.getConnection();
        try{
            psmt=conn.prepareStatement(sql);
            if(this.psmt!=null){
                for(int i=0;i<+p.size();i++){
                    psmt.setObject(i+1,p.get(i));
                }
            }
            num=this.psmt.executeUpdate();

        }catch(Exception e){
            e.printStackTrace();
        }finally {
            closeAll(conn,psmt,rs);
        }

        return num;
    }
    // 返回第一行第一列
    public int getCount(String SQL, List<Object> p) {
        int num = 0;
        rs = null;
        conn = this.getConnection();
        try {
            psmt = conn.prepareStatement(SQL);
            if (this.psmt != null) {
                for (int i = 0; i < p.size(); i++) {
                    this.psmt.setObject(i + 1, p.get(i));
                }
            }
            rs = psmt.executeQuery();
            if (rs.next()) {
                num = rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return num;
    }
    // SQL
    public void setSQL(PageInfo page) {
        // select * from A where 1=1 order by ID
        sql = "select ";
        //sql += " top " + page.PageSize;
        sql += " " + page.Field;
        sql += " from " + page.TableName;
        sql += " where 1=1 " + page.Where;
        sql += " and Id  not in (select t.id from (select  Id from " + page.TableName + ""
                + " where 1=1 " + page.Where ;
        sql += page.Order == null ? "" : (" order by " + page.Order);
        sql +="limit "+((page.Page-1)*page.PageSize);
        sql+=")";
        sql+=" as t)";
        sql += page.Order == null ? "" : (" order by " + page.Order);
        sql +="limit " +page.PageSize;
    }
    /**
     * 字符串是否为空
     *
     * @param str
     *            要验证的字符串
     * @return boolean false 不为空，true为空
     */
    public boolean StrIsNull(String str) {
        boolean Isnull=false;
        if(str == null || str.length() <= 0){
            Isnull=true;
        }
        return Isnull;
    }
}
