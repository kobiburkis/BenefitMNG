var centerTreeTypes = { "team": { "icon": "dist/themes/default/team.png", "valid_children": [] }, "dep": { "icon": "dist/themes/default/depr.png", "valid_children": ["team"] }, "#": { "valid_children": ["dep"] } };
var otherTreeTypes = { "team": { "icon": "dist/themes/default/team.png", "valid_children": [] }, "dep": { "icon": "dist/themes/default/depr.png", "valid_children": [] }, "#": { "valid_children": [] } };
var centerAlternateTreeTypes = { "center": { "icon": "dist/themes/default/team.png", "valid_children": [] }, "dep": { "icon": "dist/themes/default/depr.png", "valid_children": ["center"] }, "#": { "valid_children": [] } };
var otherAlternateTreeTypes = { "center": { "icon": "dist/themes/default/team.png", "valid_children": [] }, "dep": { "icon": "dist/themes/default/depr.png", "valid_children": [] }, "#": { "valid_children": [] } };
var centerTreePlugins =["contextmenu", "unique", "dnd", "types"];
var otherTreePlugins = ["dnd", "types", "search"];
var centerTreeSearch;
var otherTreeSearch ={'case_insensitive': true,'show_only_matches': true};
var centerTreeDND = {};
var otherTreeDND = { 'always_copy': false };
var teamItems = 'rename,editData';
var depItems = 'create_root,create,rename,extraData';
var centerItems = 'remove_center';

function onLoad() {
    // הפעלת tooltip   
    //<script>
//$(function() {
//    $(document).tooltip({
//        position: { my: "left top", at: "left top", collision: "flipfit" },
//        content: function () {
//            return $(this).prop('title');
//        }
//    });
//});
//    </script>
    addIntegerHandler("fldSekerID");
    addMustClass("fldSekerID");
}
function getTeamsData(depID, sourceEnv, main,other) {
    try {
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldDepartmentID', depID, 'string');
        srch = getFldJSONsrch(srch, 'fldSourceEnv', sourceEnv, 'string');
        srch = getFldJSONsrch(srch, 'fldScreenMode', main, 'string');
        if (other == 1 || other == 2)
            srch = getFldJSONsrch(srch, 'fldOtherTeams', other, 'int');
        else
            srch = getFldJSONsrch(srch, 'fldOtherTeams', 0, 'int');
        var data = getJQAJAX("srvHarel.asmx/departmentsData", '{' + srch + '}', false, 1);
        if (data.data && data.data.length > 0) {
            if (other == 1)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "team"));
            else if (other == 2)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "center"));
            else
                if (main =="DeprTeamMode")
                    var json_data = JSON.parse(getJsonTreeData(data.data, 1, "dep", "team"));
                else
                    var json_data = JSON.parse(getJsonTreeData(data.data, 1, "dep", "center"));
            return json_data;
        }
        else {
            if (typeof (data.data) == "undefined") {
                openMsg("שגיאה בקריאה לפרוצדורה של צוותים", 1);

                top.status = "Error In getJsonTreeData:" + e.message.toString();
                return "שגיאה";
            }
            if (data.data && data.data.length == 0) {
                openMsg("לא נמצאו צוותים למוקד", 1);
                return "שגיאה";
            }
        }
    } catch (e) {
        openMsg("שגיאה בטעינת צוותים", 1);
        top.status = "Error In getTeamsData:" + e.message.toString();
        return "שגיאה";
    }
}
function saveTreeData(treeID) {
    if (checkMngMustFields()) {
        var screenMode = $('input[type=radio]:checked', '#rblScreenMode').val();
        var targetEnv = getTargetEnv();
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldDepartmentID', $get("fldSrchDepartmentID").value, 'int');
        srch = getFldJSONsrch(srch, 'fldScreenMode', screenMode, 'string');
        srch = getFldJSONsrch(srch, 'fldTargetEnv', targetEnv, 'string');
        srch = getFldJSONsrch(srch, 'fldMngNote', $get("fldMngNote").value, 'string');
        var newData = getDataForSaveTree(treeID);
        srch = getFldJSONsrch(srch, 'doc', newData, 'string');

        var data = getJQAJAX("srvHarel.asmx/updateDeprTeamTree", '{' + srch + '}', false, 1);
        if (data && data.data) {
            $get("commonCtl_treeDataChanged").value = "0";
            openMsg('עידכון בוצע בהצלחה', 1);
            reloadDepatmentCombo();
            getTeamTrees();
        }
        else {
            if (data && data.err && data.err.length>0)
                openMsg(data.err[0]["ErrorMsg"], 1);
            else
                openMsg('שגיאה בשמירת שינויים', 1);
        }

    }
}
function getTeamTrees() {
    if ($get("commonCtl_treeDataChanged").value == "1")
        openMsg('בוצע שינוי במחלקות/צוותים - האם לצאת ללא שמירה ?', 2, 'getTeamTreesAfter();', 'setPreValues();');
    else
        getTeamTreesAfter();
}
function getOtherTrees(main) {
    var otherTreeData = "";
    var mode = main == "DeprTeamMode" ? 1 : 2;
    $('#OtherTeams')[0].style.display = "";
    var otherTreeData = "";
    var depID = $get("fldSrchDepartmentID").value;
    var sourceEnv = $get("fldSourceEnv").value;
    otherTreeData = getTeamsData(depID, sourceEnv, main,mode);
    if (otherTreeData != "שגיאה" && otherTreeData != "") {
        if (mode==1)
            show_tree("otherTeamTree", otherTreeData, otherTreeTypes, otherTreeSearch, otherTreeDND, otherTreePlugins);
        else
            show_tree("otherTeamTree", otherTreeData, otherAlternateTreeTypes, otherTreeSearch, otherTreeDND, otherTreePlugins);
    }
    var lblText  = mode == 1 ? "צוותים נוספים : " : "מוקדים נוספים : ";
    $("#lblOtherTreeType").text(lblText);
}
function getTeamTreesAfter() {
    clearSelectedNode();
    $get("commonCtl_treeDataChanged").value = "0";
    var checked = $('input[type=radio]:checked', '#rblScreenMode').val();
    savePreValues();
    var depID = $get("fldSrchDepartmentID").value;
    var sourceEnv = $get("fldSourceEnv").value;
    if (depID != "0" && sourceEnv != "") {
        var teamsData = getTeamsData(depID, sourceEnv, checked);
        if (teamsData != "שגיאה") {
            if (checked == "DeprTeamMode")
                show_tree("centerTeamTree", teamsData, centerTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins,1);
            else
                show_tree("centerTeamTree", teamsData, centerAlternateTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins,1);
            if (depID != "0")
                getOtherTrees(checked);
        }
        else
            clearTeamTrees();
    }
    else
        clearTeamTrees();
    
}
function clearTeamTrees() {
    $("#centerTeamTree").jstree("destroy");
    $("#otherTeamTree").jstree("destroy");
    $('#OtherTeams')[0].style.display = "none";
}
function clearTeamNode() {
    $get("fldSekerID").value = "0";
    $get("fldTeamTorType").value = "";
}