//绑定验证   ID(也可以.class或者#id)  最小长度，最大长度 0表示不要最大值，比较id，不比较null，是否区分大小写 ， 是否允许为空，  提示名称（如：用户名），ajax {url:""} 服务器用name接受  post  ，是否是提交
function validateBlur(Id, MinLen, MaxLen, CompareId, IsCase, IsNull, Name, Ajax, IsSubmit, Reg,Check) {
    $(Id).blur(function () {
        WCheck2(Id, MinLen, MaxLen, CompareId, IsCase, IsNull, Name, Ajax, IsSubmit, Reg,Check);
    });
}
//绑定验证   ID(也可以.class或者#id)  最小长度，最大长度 0表示不要最大值，比较id，不比较null，是否区分大小写 ， 是否允许为空，  提示名称（如：用户名），ajax {url:""} 服务器用name接受  post  ，是否是提交  Check为空已存在  否则提示错误
function validate(Id, MinLen, MaxLen, CompareId, IsCase, IsNull, Name, Ajax, IsSubmit, Reg,Check) {
    clearInterval(myMess_time2);
    clearTimeout(myMess_time1);
    clearTimeout(myMess_time3);
    $(".myMess_div").remove();

    var IsValidate = true;
    var WVAL = $(Id).val();
    $(Id).val(WVAL.trim());
    if (!IsNull && (WVAL.trim() + "" == "")) {
        eAlert(Name + "不能为空！");
        if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
        IsValidate = false;
    } else {
        if (MaxLen != 0) {
            var WVALLength = getStrLength(WVAL);
            if (WVALLength > MaxLen | WVALLength < MinLen) {
                eAlert(Name + "长度为" + MinLen + "到" + MaxLen + "位！");
                if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
                IsValidate = false;
            }
        }
    }
    if (!(IsNull && (WVAL.trim() + "" == ""))) {
        if (IsValidate && Reg != null && !Reg.test(WVAL)) {
            eAlert(Name + "格式有误！");
            if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
            IsValidate = false;
        }
    }
    if (IsValidate && CompareId != null) {
        var WVAL2 = $(CompareId).val();
        if (IsCase) {
            if (WVAL.toLowerCase() != WVAL2.toLowerCase()) {
                eAlert(Name + "不一致！");
                if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
                IsValidate = false;
            }
        } else {
            if (WVAL != WVAL2) {
                eAlert(Name + "不一致！");
                if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
                IsValidate = false;
            }
        }
    }

    if (WVAL.trim() + ""!= "") {
        if (IsValidate && Ajax != null && Ajax.url!=null) {
            $.ajax({
                url: Ajax.url,
                async: false,
                type: "post",
                data: { a: Math.random(), name: WVAL },
                dataType: "text",
                success: function (IsOK) {               
                    if (IsOK != "") {                    
//                        eAlert(Name +Check);
                    	eAlert(Name);
                        if (IsSubmit) { $(Id).focus(); $('html,body').animate({ scrollTop: $(Id).offset().top - 45 }, 300); }
                        IsValidate = false;
                    }
                }
            });
        }
    }
    return IsValidate;
}

function validateCheckBox(Id, Name, Count) {
    var IsOK = false;
    var checkboxs = $("input:checkbox[name=" + Id + "]");
    var counts = 0;
    var checkboxsLength = checkboxs.length;
    var checkboxsStr = "";
    for (var aa = 0; aa < checkboxsLength; aa++) {
        if (checkboxs.eq(aa).attr("checked") == "checked") {
            checkboxsStr += checkboxs.eq(aa).val() + ",";
            counts++;
        }
    }
    $("input[name=" + Id.substr(0, Id.length - 1) + "]").eq(0).val(checkboxsStr.substr(0, checkboxsStr.length - 1));
    if (counts >= Count) {
        IsOK = true;
    } else {
        $('html,body').animate({ scrollTop: checkboxs.eq(0).offset().top - 45 }, 300);
        eAlert(Name + "至少选择" + Count + "个");
    }
    return IsOK;
}
function validateSelect(id, Name, value) {
    var IsOK = true;
    if ($(id).val() == value) {
        eAlert("请选择" + Name);
        $('html,body').animate({ scrollTop: $(id).offset().top - 45 }, 300);
        IsOK = false;
    }
    return IsOK;
}
function getStrLength(str) {
    return str.length;
    //return str.replace(/[^\x00-\xFF]/g, '**').length;
}

//重写
function eAlert(text) {
    myMess(text, "", "#0099CC", 400, 50, 1000, "");
}

//本地预览图片
function previewImage(file, divid, imgid, width, height, fileId) {
    var MAXWIDTH = width;
    var MAXHEIGHT = height;
    var div = document.getElementById(divid);
    if (file.files && file.files[0]) {
        if (fileId != null && fileId + "" != "") {

            div.innerHTML = '<img title="点击更换" style="cursor:pointer;" alt="预览失败" onclick="$(\'#' + fileId + '\').click();" width="' + width + '" height="' + height + '" id=' + imgid + '>';
        } else {
            div.innerHTML = '<img alt="预览失败"  width="' + width + '" height="' + height + '" id=' + imgid + '>';
        }
        var img = document.getElementById(imgid);
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
        };
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; };
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        if (fileId != null && fileId + "" != "") {
            div.innerHTML = '<img title="点击更换" style="cursor:pointer;" alt="预览失败" onclick="$(\'#' + fileId + '\').click();"  width="' + width + '" height="' + height + '" id=' + imgid + '>';
        } else {
            div.innerHTML = '<img alt="预览失败" width="' + width + '" height="' + height + '" id=' + imgid + '>';
        }
        var img = document.getElementById(imgid);
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam1(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id='" + divid + "' style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}


//本地验证图片大小及格式 IsNull  true不可为空
function checkImgSize(fileName, IsNull, imgSize, title) {
    var wOK = true;
    var imgLoad = document.getElementById(fileName).files;
    var imgLoadName = "";
    if (imgLoad.length == 0 && IsNull) {
        eAlert(title + "必须选择图片！");
        wOK = false;
    } else {
        for (var myi = 0; myi < imgLoad.length; myi++) {
            imgLoadName = "第" + (myi + 1) + "张" + title;
            if (imgLoad.length == 1) {
                imgLoadName = title;
            }
            if (!IsNull && imgLoad[myi] == null) {
                wOK = false;
            } else {
                if (IsNull && imgLoad[myi] == null) {
                    eAlert(imgLoadName + "必须选择图片！");
                    wOK = false;
                } else {
                    //验证格式
                    if (!/\.(bmp|jpg|jpeg|png|gif)$/.test(imgLoad[myi].name.toLowerCase())) {
                        eAlert(imgLoadName + "格式有误（bmp,jpg,png,gif,jpeg）！");
                        wOK = false;
                    } else {
                        if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                            try {
                                if (imgLoad[myi].size / 1024 > imgSize) {
                                    eAlert("很抱歉，" + imgLoadName + "大小不能超过" + imgSize + "KB!当前" + parseInt(imgLoad[myi].size / 1024) + "KB!");
                                    wOK = false;
                                }
                            } catch (e) {
                                wOK = false;
                            }
                        } else {
                            if (imgLoad[myi].size / 1024 > imgSize) {
                                eAlert("很抱歉，" + imgLoadName + "大小不能超过" + imgSize + "KB!当前" + parseInt(imgLoad[myi].size / 1024) + "KB!");
                                wOK = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return wOK;
}