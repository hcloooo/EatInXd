var CName =  "/EatInXd/SitesMana/";
var data;
var EntityName = "Merchant";
var state = 1;//默认正常状态
var set = -1;
var opr = 1;

$(function () {
    getList();
    BindPageClick();
    CheckAll();
    ChangeSelect();
    SubmitAdd();
    AddDelPro();
});



//所有下拉框绑定事件
function ChangeSelect() {
    $("#select-state").change(function () {
        state = $(this).val();
        index = 1;
        if (state == -1) {
            $(".btn-del").val("恢复数据");
            $(".btn-del").removeClass("del");
            $(".btn-del").addClass("ok");
            set = 1;
        } else {
            $(".btn-del").val("删除");
            $(".btn-del").removeClass("ok");
            $(".btn-del").addClass("del");
            set = -1;
        }
        getList();
    });
}

function getList() {

    word = MinGan($("#text-search").val());
    data = { a: Math.random(), index: index, size: size, word: word };
    $.ajax({
        url: CName + "get" + EntityName + "s",
        data: data,
        type: "post",
        dataType: "json",
        beforeSend: function () {
            myHui2();

            //myMess2("<img src='"+CName+"/EatInXd/Mytools/images/getdataloading.gif'/>", "", "transparent", "", "", "-1", "");
        },
        success: function (datalist) {

            $(".myConfim_div_parent2").remove();
            $(".myMess_div2").remove();
            if (datalist.length > 0) {
                var strtablist = "";
                for (var i = 0; i < datalist.length; i++) {
                    var info_list = datalist[i];
                    var checkedId = "";

                    for (var j = 0; j < LISTID.length; j++) {
                        if (info_list.id == LISTID[j]) {
                            checkedId = " checked='checked' ";
                            break;
                        }
                    }

                    strtablist += "<tr iid=" + info_list.id + ">"
                        + "<td><input " + checkedId + " type='checkbox' class='check-box' name='check-box'/></td>"
                        + "<td>" + ((index - 1) * size + i + 1) + "</td>"
                        + "<td>" + info_list.name + "</td>"
                        +  "<td><img class='Img' src='"+CIP+info_list.img+"'></td>"
                        + "<td>" +""+ (info_list.description) + "</td>"
                        + "<td>" + (info_list.likesNum) + "</td>"
                        + "</tr>";
                }

                $("#tab-list tr:not(:first)").remove();
                $("#tab-list").append(strtablist);
                EachChild();
                ChangeColorBG();
                BindCheckBoxClick();
            } else {
                $("#tab-list tr:not(:first)").remove();
                $("#tab-list").append("<tr><td colspan='11'>没有数据！</td></tr>");
            }
            InitPageIndex();
        }
    });
}
/*--------------------------------------------------------------------------------------------------------*/

//初始加载页码
function InitPageIndex() {
    data = { a: Math.random(), index: index, size: size, word: word};
    $.ajax({
        url: CName + "get" + EntityName + "sCount",
        data: data,
        type: "post",
        dataType: "text",
        success: function (data) {
            var count = parseInt(data);
            pageCount = count % size == 0 ? count / size : count / size + 1;
            pageCount = parseInt(pageCount);
            var pageStr = "";
            for (var i = 0; i < pageCount; i++) {
                if (i - index >= -4 && i - index <= 3) {
                    if (index == i + 1) {
                        pageStr += "<input style=\"background-color:white;border:1px solid white;color:#e225c1;\" class=\"btn-page-index\" type=\"button\" value=\"" + (i + 1) + "\" />";
                    } else {
                        pageStr += "<input class=\"btn-page-index\" type=\"button\" value=\"" + (i + 1) + "\" />";
                    }
                }
            }
            $(".btn-page-index").remove();
            $(".btn-page-prev").after(pageStr);
            $(".btn-page-index").click(function () { index = parseInt($(this).val()); getList(); });
        }
    });
}

//绑定分页单击事件
function BindPageClick() {
    /*
        1.首页
        2.上一页
        3.下一页
        4.尾页
        5.页码
    */
    $(".btn-page-first").click(function () {
        if (index != 1) {
            index = 1;
            getList();
        } else {
            eAlert("当前已经是第一页啦");
        }
    });
    $(".btn-page-prev").click(function () {
        if (index - 1 >= 1) {
            index--;
            getList();
        } else {
            eAlert("当前已经是第一页啦");
        }
    });
    $(".btn-page-next").click(function () {
        data = { a: Math.random(), index: index, size: size, word: word, state: state };
        $.ajax({
            url: CName + "get" + EntityName + "sCount",
            data: data,
            type: "post",
            dataType: "text",
            success: function (data) {
                var count = parseInt(data);
                pageCount = count % size == 0 ? count / size : count / size + 1;
                pageCount = parseInt(pageCount);
                if (index + 1 <= pageCount) {
                    index++;
                    getList();
                } else {
                    eAlert("当前已经是最后一页啦");
                }
            }
        });

    });
    $(".btn-page-last").click(function () {
        data = { a: Math.random(), index: index, size: size, word: word, state: state };
        $.ajax({
            url: CName + "get" + EntityName + "sCount",
            data: data,
            type: "post",
            dataType: "text",
            success: function (data) {
                var count = parseInt(data);
                pageCount = count % size == 0 ? count / size : count / size + 1;
                pageCount = parseInt(pageCount);
                if (index <= pageCount - 1) {
                    index = pageCount;
                    getList();
                } else {
                    eAlert("当前已经是最后一页啦");
                }
            }
        });
    });
}




//对于表格的操作
function AddDelPro() {
    //1.新增
    $(".btn-add").click(function () {
        ShowAddEdit("1");
    });
    //2.修改
    $(".btn-update").click(function () {
        if (LISTID.length == 1) {
            //提交LISTID[0]即为当前选中ID
            ShowAddEdit("2");

        } else {
            eAlert("每次只能修改1条数据！您已选择" + LISTID.length + "行数据");
        }
    });
    //3.删除
    $(".btn-del").click(function () {
        if (LISTID.length >= 1) {
            myConfirm("确定要进行删除的操作吗？", "注意", "#926024", "#FDDFC0", "", "", { "border-radius": "10px" });
            $("#myconfirm-ok").click(function () {
                //提交LISTID[0]即为当前选中ID
                var LISTSTR = "";
                for (var i = 0; i < LISTID.length; i++) {
                    LISTSTR += LISTID[i];
                    if (i < LISTID.length - 1) {
                        LISTSTR += ",";
                    }

                }
                $.ajax({

                    url: CName + "delete" + EntityName,
                    data: {
                        a: Math.random(),
                        ids: LISTSTR,
                        set: set
                    },
                    type: "post",
                    dataType: "text",
                    success: function (data) {

                        myMess(data, "red", "transparent", "500", "", "2000", { "font-size": "20px", "font-weight": "bold" });
                        LISTID = new Array();//清空数组
                        getList();
                    }
                });
            });

        } else {
            eAlert("至少操作1行数据！您已选择" + LISTID.length + "行数据");
        }
    });
}




//显示编辑面板
function ShowAddEdit(add) {
    ClearAddEdit();
    if (add == "1") {

    } else if (add == "2" || add == "3") {
        BindAddEdit();
    }
    $("#opr").text(add == "1" ? "增加" : add == "2" ? "修改" : "查看");
    myHui1();
    opr = add;
    $("#oprH").val(opr);
    $("#AddEditDiv").css("display", "block");
}
function CloseAddEdit() {
    $(".myConfim_div_parent1").remove();
    $("#AddEditDiv").css("display", "none");
}
function ClearAddEdit() {
    $("#id").val("");
    $("#reset").click();
    $("#FileImg").attr("src", "/EatInXd/Mytools/images/upload.jpg");
}

function BindAddEdit() {

    $.ajax({
        url: CName + "get" + EntityName + "",
        data: {
            a: Math.random(),
            id: LISTID[0]
        },
        type: "post",
        dataType: "json",
        beforeSend: function () {
            myHui2();
            myMess2("<img src='/EatInXd/Mytools/images/getdataloading.gif'/>", "", "transparent", "", "", "-1", "");
        },
        success: function (data) {
            $(".myConfim_div_parent2").remove();
            $(".myMess_div").remove();
            $("#id").val(data[0].id);
            $("#Name").val(data[0].name);
            $("#FileImg").attr("src", data[0].Img);
        }
    });
}

function SubmitAdd() {

    $("#AddEditOK").click(function () {
        if (
            validate("#Name", 1, 100, null, false, false, "展示案例名称", null, true)
        ) {
            var Isok = false;
            if (checkImgSize('Photo', opr == 2 ? false : true, 1024 * 5, '展示案例图片')) {
                Isok = true;
            }
            if (Isok) {
                ReplaceMinGan("Name", true);
                $("#AddEditForm").ajaxSubmit({
                    url: CName + "addOrUpdate" + EntityName + "?a=" + Math.random(),
                    type: "post",

                    beforeSend: function () {
                        myHui2();
                        myMess2("<img src='/EatInXd/Mytools/images/getdataloading.gif'/>", "", "transparent", "", "", "-1", "");
                    },
                    success: function (date) {
                        $(".myConfim_div_parent2").remove();
                        ReplaceMinGan("Name", false);
                        eAlert(date);
                        LISTID = new Array();//清空数组
                        getList();
                        CloseAddEdit();
                    }
                });
            }
        }

    });
}
/*--------------------------------------------------------------------------------------------------------*/

