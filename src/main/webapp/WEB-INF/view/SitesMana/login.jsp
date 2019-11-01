<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/1 0001
  Time: 16:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
<div id="wrap">
    <div id="modal-dialog">
        <div id="modal-content">
            <div id="model-body">
                <div id="name">青志</div>
                <div id="form">
                    <form action="#">
                        <div class="div-input">
                            <div class="input-border input-border-username">
                                <input type="text" class="input fr" placeholder="请输入常用手机号/邮箱">
                            </div>

                        </div>
                        <div class="div-input">
                            <div class="input-border .input-border-password">
                                <input type="password" class="input fr" placeholder="请输入密码">
                            </div>

                        </div>

                    </form>
                </div>
                <div class="clearfix"></div>
                <div id="submit">
                    登录
                </div>
                <div id="register">立即注册</div>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</body>
</html>
