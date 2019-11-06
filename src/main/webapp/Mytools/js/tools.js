var CIP = "http://127.0.0.1:8080/EatInXd";
//正则替换script  并支持html css
function myHtml(content) {
    content = MinGan2(content);
    return content.replace(/<(\s*)(script)(\s*)>/gi, "&lt;$1$2$3&gt;").replace(/<(\s*)\/(\s*)(script)(\s*)>/gi, "&lt;$1/$2$3$4&gt;");
}


//转换时间戳
function changTime(datestr) {

    var date = datestr.replace("/Date(", "").replace(")/", "") / 1000;
    date = new Date(parseInt(date) * 1000);
    date = date.getFullYear() + "-" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
    return date;
}

function changTime2(datestr) {
	var date=datestr.substr(0,16);
    return date;
}

function changTime1(datestr) {
    var date = datestr.replace("/Date(", "").replace(")/", "") / 1000;
    date = new Date(parseInt(date) * 1000);
    date = date.getFullYear() + "/" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "/"
        + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) + " "
        + ((date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()))
        + ":"
        + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes());
    return date;
}
//替换
function MinGan(str) {
    return str.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").trim();
}
//替回
function MinGan2(str) {
    return str.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\"").replace(/&amp;/g, "&");
}
//IsRe  true替换,fasle替回
function ReplaceMinGan(id, IsRe) {
    if (IsRe) {
        $("#" + id).val(MinGan($("#" + id).val()));
    } else {
        $("#" + id).val(MinGan2($("#" + id).val()));
    }
}