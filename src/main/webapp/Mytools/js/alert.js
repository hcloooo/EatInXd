function myMess(text, color, bgColor, width, height, stop, style) {
    //文本，字体颜色，背景，宽度，高度，悬浮时间，自定义样式
    clearInterval(myMess_time2);
    clearTimeout(myMess_time1);
    clearTimeout(myMess_time3);
    $(".myMess_div").remove();
    var reg = /^[0-9]*$/;
    $("body").append("<div class='myMess_div'><div>");
    var textDefault = "提示信息", bgDefault = "black", fontDefault = "white", widthDefault = 280, heightDefault = 30, stopDefault = 2000, myMess_opacity = 9;
    if (text.trim() + "" != "") { textDefault = text; }
    if (bgColor.trim() + "" != "") { bgDefault = bgColor; }
    if (color.trim() + "" != "") { fontDefault = color; }
    if (width + "" != "") { if (reg.test(width)) { widthDefault = width; } }
    if (height + "" != "") { if (reg.test(height)) { heightDefault = height; } }
    if (stop + "" != "") { if (reg.test(stop)) { stopDefault = stop; } }

    $(".myMess_div").html(textDefault);
    $(".myMess_div").css({ "z-index": "10000", "border-radius": "4px", "font-size": "15px", "color": fontDefault, "text-align": "center", "line-height": heightDefault + "px", "background": bgDefault, "width": widthDefault + "px", "height": heightDefault + "px", "opacity": "1", "position": "fixed", "top": "50%", "left": "50%", "margin-top": "-" + parseInt(heightDefault / 2) + "px", "margin-left": "-" + parseInt(widthDefault / 2) + "px" });

    if (stop != "-1") {
        if (stop != "0") {
            myMess_time1 = setTimeout(function () {
                myMess_time2 = setInterval(function () {
                    $(".myMess_div").css("opacity", "0." + myMess_opacity);
                    myMess_opacity--;
                    if (myMess_opacity == 0) {
                        clearInterval(myMess_time2);
                        $(".myMess_div").remove();
                        $(".myConfim_div_parent").remove();
                    }
                }, 200);
            }, stopDefault);
        } else {
            myMess_opacity = 5;
            $(".myMess_div").css("opacity", "0." + myMess_opacity);
            myMess_time1 = setTimeout(function () {
                $(".myMess_div").fadeOut(2000);
                myMess_time3 = setTimeout(function () { $(".myMess_div").remove(); $(".myConfim_div_parent").remove(); }, 2000);
            }, 2000);
        }
    }
    if (style + "" != "") { $(".myMess_div").css(style); }
}

//防止冲突
function myMess2(text, color, bgColor, width, height, stop, style) {
    //文本，字体颜色，背景，宽度，高度，悬浮时间，自定义样式
    clearInterval(myMess_time22);
    clearTimeout(myMess_time12);
    clearTimeout(myMess_time32);
    $(".myMess_div2").remove();
    var reg = /^[0-9]*$/;
    $("body").append("<div class='myMess_div2'><div>");
    var textDefault = "提示信息", bgDefault = "black", fontDefault = "white", widthDefault = 280, heightDefault = 30, stopDefault = 2000, myMess_opacity = 9;
    if (text.trim() + "" != "") { textDefault = text; }
    if (bgColor.trim() + "" != "") { bgDefault = bgColor; }
    if (color.trim() + "" != "") { fontDefault = color; }
    if (width + "" != "") { if (reg.test(width)) { widthDefault = width; } }
    if (height + "" != "") { if (reg.test(height)) { heightDefault = height; } }
    if (stop + "" != "") { if (reg.test(stop)) { stopDefault = stop; } }

    $(".myMess_div2").html(textDefault);
    $(".myMess_div2").css({ "z-index": "10000", "border-radius": "4px", "font-size": "15px", "color": fontDefault, "text-align": "center", "line-height": heightDefault + "px", "background": bgDefault, "width": widthDefault + "px", "height": heightDefault + "px", "opacity": "1", "position": "fixed", "top": "50%", "left": "50%", "margin-top": "-" + parseInt(heightDefault / 2) + "px", "margin-left": "-" + parseInt(widthDefault / 2) + "px" });

    if (stop != "-1") {
        if (stop != "0") {
            myMess_time1 = setTimeout(function () {
                myMess_time2 = setInterval(function () {
                    $(".myMess_div2").css("opacity", "0." + myMess_opacity);
                    myMess_opacity--;
                    if (myMess_opacity == 0) {
                        clearInterval(myMess_time2);
                        $(".myMess_div2").remove();
                        $(".myConfim_div_parent").remove();
                    }
                }, 200);
            }, stopDefault);
        } else {
            myMess_opacity = 5;
            $(".myMess_div2").css("opacity", "0." + myMess_opacity);
            myMess_time1 = setTimeout(function () {
                $(".myMess_div2").fadeOut(2000);
                myMess_time3 = setTimeout(function () { $(".myMess_div").remove(); $(".myConfim_div_parent").remove(); }, 2000);
            }, 2000);
        }
    }
    if (style + "" != "") { $(".myMess_div2").css(style); }
}
//重写
function eAlert(text) {
	myMess(text, "", "#0099CC", 400, 50, 1000, "");
}
var myMess_time1 = null;
var myMess_time2 = null;
var myMess_time3 = null;
var myMess_time12 = null;
var myMess_time22 = null;
var myMess_time32 = null;
var myMess_opacity = 9;

function ClearEAlert() {
    clearInterval(myMess_time2);
    clearTimeout(myMess_time1);
    clearTimeout(myMess_time3);
    $(".myMess_div").remove();
}

function myHui() {
    $(".myConfim_div_parent").remove();
    $("body").append("<div class='myConfim_div_parent'><div>");
}
function myHui1() {
    $(".myConfim_div_parent1").remove();
    $("body").append("<div class='myConfim_div_parent1'><div>");
}
function myHui2() {
    $(".myConfim_div_parent2").remove();
    $("body").append("<div class='myConfim_div_parent2'><div>");
}


//弹出选择框
function myConfirm(text, title, color, bgColor, width, height, style) {
    //文本，字体颜色，背景，宽度，高度，悬浮时间，自定义样式
    clearInterval(myMess_time2);
    clearTimeout(myMess_time1);
    clearTimeout(myMess_time3);
    $(".myConfim_div").remove();
    $(".myMess_div").remove();
    $(".myConfim_div_parent").remove();
    var reg = /^[0-9]*$/;
    $("body").append("<div class='myConfim_div_parent'><div>");
    $("body").append("<div class='myConfim_div'><div>");
    var textDefault = "提示信息";
    if (text.trim() + "" != "") {
        textDefault = text;
    }
    var titleDefault = "提示";
    if (title.trim() + "" != "") {
        titleDefault = title;
    }
    var bgDefault = "#fff";
    if (bgColor.trim() + "" != "") {
        bgDefault = bgColor;
    }
    var fontDefault = "#7C8EA4";
    if (color.trim() + "" != "") {
        fontDefault = color;
    }
    var widthDefault = 320;
    if (width + "" != "") {
        if (reg.test(width)) {
            widthDefault = width;
        }
    }
    var heightDefault = 40;
    if (height + "" != "") {
        if (reg.test(height)) {
            heightDefault = parseInt(height);
        }
    }
    myMess_opacity = 9;
    var title_Height = 30;
    var buttom_Height = 40;
    $(".myConfim_div").html(
        "<div class='myconfirm-title' style='line-height:" + title_Height + "px;text-align:left;padding-left:10px;'>" + title + "<input class='myConfim_close' value='×' type='button' onclick='myConfim_Close();' title='关闭'/></div>"
            + "<div style='height:30px;'></div>"
            + "<div style='height:" + heightDefault + "px'>"
            + textDefault
            + "</div>"
            + "<div style='line-height:" + buttom_Height + "px;text-align:center;'>"
                + "<input id='myconfirm-ok' type='button' value='确定'/>"
                + "<input id='myconfirm-exit' type='button' value='取消'/>"
            + "</div>"
    );
    $(".myConfim_div").css({ "z-index": "10000", "border-radius": "0px", "font-size": "16px", "color": fontDefault, "text-align": "center", "background": bgDefault, "width": widthDefault + "px", "height": (parseInt(heightDefault) + buttom_Height + title_Height + 30+10) + "px", "opacity": "1", "position": "fixed", "top": "50%", "left": "50%", "margin-top": "-" + (parseInt(parseInt(heightDefault) + buttom_Height + title_Height) / 2) + "px", "margin-left": "-" + parseInt(widthDefault / 2) + "px" });
    if (style + "" != "") { $(".myConfim_div").css(style); }
    $("#myconfirm-ok").click(function () {
    	myConfim_Close();
    });
    $("#myconfirm-exit").click(function () {
    	myConfim_Close();
    });
}

function myConfim_Close(){
	$(".myConfim_div").remove();
    $(".myConfim_div_parent").remove();
}

//拖拽,过时的拖拽
function MoveDiv(ID) {
    $(ID).mousedown(function (e)//e鼠标事件
    {
        $(this).css("cursor", "move");//改变鼠标指针的形状

        var offset = $(this).offset();//DIV在页面的位置
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
        $(document).bind("mousemove", function (ev)//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
        {
            $(ID).stop();//加上这个之后

            var _x = ev.pageX - x;//获得X轴方向移动的值
            var _y = ev.pageY - y;//获得Y轴方向移动的值

            $(ID).animate({ left: _x + "px", top: _y + "px" }, 10);
        });

    });

    $(document).mouseup(function () {
        $(ID).css("cursor", "default");
        $(this).unbind("mousemove");
    });
}


///////////////////////////////////////////
var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
var getCss = function (o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};

var NewMoveDiv = function (TitleID, ContentID, callback) {
    var bar = document.getElementById(TitleID);
    var target = document.getElementById(ContentID);
    if (getCss(target, "left") !== "auto") {
        params.left = getCss(target, "left");
    }
    if (getCss(target, "top") !== "auto") {
        params.top = getCss(target, "top");
    }
    bar.onmousedown = function (event) {
        params.flag = true;
        if (!event) {
            event = window.event;
            bar.onselectstart = function () {
                return false;
            }
        }
        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
    };
    document.onmouseup = function () {
        params.flag = false;
        if (getCss(target, "left") !== "auto") {
            params.left = getCss(target, "left");
        }
        if (getCss(target, "top") !== "auto") {
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function (event) {
        var e = event ? event : window.event;
        if (params.flag) {
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            target.style.left = parseInt(params.left) + disX + "px";
            target.style.top = parseInt(params.top) + disY + "px";
        }

        if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
        }
    }
};
//////////////////////////////////////////////////////////
