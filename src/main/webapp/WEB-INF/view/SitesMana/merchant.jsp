<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/10/30 0030
  Time: 16:27
  To change this template use File | Settings | File Templates.
--%>
<%@page import="com.eatinxd.pojo.Merchant"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <%
        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    %>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>商家管理</title>

    <link href="<%=basePath%>Mytools/css/loading.css" rel="stylesheet" />
    <link href="<%=basePath%>Mytools/css/alert.css" rel="stylesheet" />
    <link href="<%=basePath%>statics/css/List/initList.css" rel="stylesheet" />
    <script src="<%=basePath%>Mytools/js/jquery-1.8.3.min.js"></script>
    <script src="<%=basePath%>Mytools/js/loading.js"></script>
    <script src="<%=basePath%>Mytools/js/jquery.cookie.js"></script>
    <script src="<%=basePath%>Mytools/js/jquery-form.js"></script>
    <script src="<%=basePath%>Mytools/js/validate.js"></script>
    <script src="<%=basePath%>Mytools/js/alert.js"></script>
    <script src="<%=basePath%>Mytools/js/tools.js"></script>
    <script src="<%=basePath%>Mytools/js/loading.js"></script>
    <script src="<%=basePath%>statics/js/List/InitList.js"></script>
    <script src="<%=basePath%>statics/js/demo.js"></script>

    <style type="text/css">
        .Img {width: 140px;height: 120px;}
    </style>
</head>
<body>
<!----------------------------loading开始---------------------------->
<div class="w-loading-div">
</div>
<img class="w-loading-img" src="<%=basePath%>Mytools/images/loading.gif" />
<!----------------------------loading结束---------------------------->
<!----------------------------本页内容---------------------------->
<!-----搜索----->
<div id="div-search">

    <label class="left" for="text-search">关键字：</label>
    <input type="text" class="left" id="text-search" />

    <!--选择条件-->
    <label class="left" id="label-state" for="select-state">状态：</label>
    <select id="select-state" class="select left">
        <option value="-2">不限</option>
        <option value="1" selected="selected">正常</option>
        <option value="-1">已删除</option>
    </select>
    <c:if test="${admin.type!=1 }">
        <script type="text/javascript">
            $(function () {
                myHide("#label-state");
                myHide("#select-state");
            });
        </script>
    </c:if>
    <!--选择条件-->

    <input type="button" class="see" title="搜索" value="" id="btn-search" />
</div>
<!--对于表格的操作、例如修改，删除等-->
<div class="div-opr">
    <input class="btn-add add" type="button" value="增加展示案例" />
    <input class="btn-update setb" type="button" value="修改展示案例" />
    <input class="btn-del del" type="button" value="删除展示案例" />
    <input class="ref" type="button" value="刷新" onclick="getList();" title="刷新" />
</div>

<!----------------------------本页内容结束---------------------------->
<!--列表-->
<table id="tab-list" class="tab-list tableDefault" border="1">
    <tr>
        <td width="10"><input type="checkbox" id="check-all" name="check-all" /></td>
        <td width="80">序号</td>
        <td width="150">名称</td>
        <td width="150">图片</td>
        <td width="200">描述</td>
        <td width="200">点赞数</td>
    </tr>
</table>
<!-----------------------------------分页开始----------------------------------->
<div class="page-div-par">
    <select class="select-size select">
        <option value="5">每页5条</option>
        <option selected="selected" value="10">每页10条</option>
        <option value="15">每页15条</option>
        <option value="20">每页20条</option>
    </select>
    <div class="page-div">
        <input class="btn-page-first" type="button" value="首页" />
        <input class="btn-page-prev" type="button" value="上一页" />
        <input class="btn-page-next" type="button" value="下一页" />
        <input class="btn-page-last" type="button" value="尾页" />
    </div>
</div>
<!-----------------------------------分页结束----------------------------------->

<!--添加框-->
<div id="AddEditDiv" style="width:900px;height:500px;display:none;overflow-y:auto;">
    <form id="AddEditForm" method="post">
        <div style="background-color:#fbf9f9;height:21px;">
            <span class="left" style="font-size:14px;font-weight:bold;text-indent:10px;line-height:21px;"><label id="opr">增加</label>展示案例</span>
            <span class="right">
                    <img src="<%=basePath%>Mytools/images/close.png" onclick="CloseAddEdit();" title="关闭" style="cursor:pointer;" />
                </span>

            <div class="AllClear"></div>
        </div>

        <div style="width:100%;">
            <table style="margin:30px 0px 30px 100px;line-height:50px;width:80%;">
                <tr>
                    <td class="width100">
                        <span class="req">*</span>案例名称：
                    </td>
                    <td><input name="Name" id="Name" class="inputStyle" style="width:80%;" value="" type="text" /></td>
                </tr>
                <tr>
                    <td class="width100">
                        <span class="req">*</span>案例图片：
                    </td>
                    <td>
                        <input style="display:none;" accept="image/*" type="file" name="upload" id="Photo" onchange="previewImage(this, 'FileDiv', 'FileImg', 140, 120, 'Photo'); checkImgSize('Photo', false, 1024 * 5, '展示图片')" />
                        <div style="width:140px;height:120px;" id="FileDiv">
                            <img style="width:100%;height:100%;" src="<%=basePath%>Mytools/images/upload.jpg" id="FileImg" onclick="$('#Photo').click();" />
                        </div>
                    </td>
                </tr>
            </table>
            <div style="width: 400px;height:200px;margin-left:100px">
                描述<input type="text" name="description" style="height:135px;width: 500px;margin: 20px 30px;"> </div>

        </div>
        <div style="text-align:center;">
            <input type="hidden" id="oprH" name="oprH" />
            <input type="hidden" id="id" name="ID" value="" />
            <input type="reset" style="display:none;" id="reset" name="reset" />
            <input type="button" id="AddEditOK" class="btnDefaultOK" value="确定" />
            <input type="button" id="AddEditNo" class="btnDefaultOK" title="关闭" value="取消" onclick="CloseAddEdit();" />
        </div>
    </form>
</div>
<!----------------------------本页内容结束---------------------------->

</body>
</html>