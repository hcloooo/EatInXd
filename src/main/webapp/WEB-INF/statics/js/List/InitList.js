var LISTID = new Array();//用于存储当前选中的id数组，不可删除
var index = 1;
var size = 10;
var word = "";
var COLORHOVER = "#44cef6";//悬浮的颜色

$(function () {
    //$("#tab-list tr:first td").each(function (i,e) {
    //    alert($(e).css("width"))
    //});
    SetPageWidth();
    Enter();
    //MoveDiv("#AddEditDiv");
    BindSearchClick();
    BindSize();
});

function BindSize() {
    $(".select-size").change(function () {
        size = $(this).val();
        index = 1;
        getList();
    });
}

//绑定搜索单击事件
function BindSearchClick() {
    $("#btn-search").click(getList);
}



/*=======================================初始化表格宽度=======================================*/
function SetPageWidth() {
    
    var tablewidth = document.getElementById("tab-list").offsetWidth;
    $(".page-div-par").css({ "width": tablewidth + "px" });
    $(".div-opr").css({ "width": tablewidth + "px" });
    $("#div-search").css({ "width": tablewidth + "px" });
}

function Enter() {
    var addOpr = 0;
    $("#AddEditDiv").hover(function () {
        addOpr = 1;
    }, function () { addOpr = 0; });
    $("#AddEditDiv").keypress(function (event) {
        event = event || window.event;
        if (event.keyCode == 13 && addOpr == 1) {
            $("#AddEditOK").click();
        }
    });
}

/*============================================================================================*/
/*--------------------------------------------------------------------------------------------------------*/


//单击整行或者复选框
function BindCheckBoxClick() {
    $("#tab-list td").click(function () {
        var iid = $(this).parent("tr").attr("iid");
        if ($(this).parent().index() >= 1 && $(this).index() >= 1) {
            if ($(this).parent("tr").children().children(".check-box").attr("checked") == "checked") {
                $(this).parent("tr").children().children(".check-box").removeAttr("checked");
                DelList(iid);
            } else {
                $(this).parent("tr").children().children(".check-box").attr("checked", "checked");
                AddList(iid);
            }
            EachChild();
        }
    });
    $(".check-box").change(function () {
        var iid = $(this).parent("td").parent("tr").attr("iid");
        if ($(this).attr("checked") == "checked") {
            AddList(iid);
        } else {
            DelList(iid);
        }
        EachChild();
    });
}
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/


//集合增加一个选中id
function AddList(id) {
    LISTID[LISTID.length] = id;
    ChangeColorBG();
}
/*--------------------------------------------------------------------------------------------------------*/



//集合删除一个id
function DelList(id) {
    var NewLISTID = new Array();

    for (var i = 0; i < LISTID.length; i++) {
        if (id != LISTID[i]) {
            NewLISTID[NewLISTID.length] = LISTID[i];
        }
    }
    LISTID = NewLISTID;
    ChangeColorBG();
}
/*--------------------------------------------------------------------------------------------------------*/



//变化背景颜色
function ChangeColorBG() {
    $("#tab-list tr").each(function (i, e) {
        if (i != 0) {
            if (i % 2 == 0) {
                $(e).css("background", "#FFFFFE");
            } else {
                $(e).css("background", "#EBF2D3");
            }
        }
    });
    EachCheck();
    $("#tab-list tr:not(:first)").hover(function () {
        $(this).css("background", COLORHOVER);
    }, function () {
        if ($(this).index() % 2 == 0) {
            $(this).css("background", "#FFFFFE");
        } else {
            $(this).css("background", "#EBF2D3");
        }
        EachCheck();
    });
}
/*--------------------------------------------------------------------------------------------------------*/
//遍历复选框，检查复选框是否选中 变背景色
function EachCheck() {
    $(".check-box").each(function (i, e) {
        if ($(e).attr("checked") == "checked") {
            $(e).parent("td").parent("tr").css("background", COLORHOVER);
        } else {
            if (i % 2 == 0) {
                $(e).parent("td").parent("tr").css("background", "#FFFFFE");
            } else {
                $(e).parent("td").parent("tr").css("background", "#EBF2D3");
            }
        }
    });
}

//检查子复选框，全选是否选中
function EachChild() {
    var num = 0;
    $(".check-box").each(function (i, e) {
        if ($(e).attr("checked") == "checked") {
            num++;
        }
    });
    if (num == $(".check-box").length) {
        $("#check-all").attr("checked", "checked");
    } else {
        $("#check-all").removeAttr("checked");
    }
}
//全选
function CheckAll() {
    $("#check-all").change(function () {
        if ($(this).attr("checked") == "checked") {
            $(".check-box").each(function (i, e) {
                if ($(e).attr("checked") != "checked") {
                    var iid = $(e).parent("td").parent("tr").attr("iid");
                    AddList(iid);
                }
            });
            $(".check-box").attr("checked", "checked");
            
            EachCheck();
        } else {
            $(".check-box").each(function (i, e) {
                var iid = $(e).parent("td").parent("tr").attr("iid");
                DelList(iid);
            });
            $(".check-box").removeAttr("checked");
            EachCheck();
        }
    });
}
/*--------------------------------------------------------------------------------------------------------*/

function CloseAddEdit() {
    $(".myConfim_div_parent1").remove();
    $("#AddEditDiv").css("display", "none");
}
