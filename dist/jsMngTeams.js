var centerTreeTypes = { "team": { "icon": "dist/themes/default/team.png", "valid_children": [] }, "dep": { "icon": "dist/themes/default/depr.png", "valid_children": ["team"] }, "#": { "valid_children": ["dep"] } };
var otherTreeTypes = {"team":{"icon":"dist/themes/default/team.png","valid_children":[]},"dep":{"icon":"dist/themes/default/depr.png","valid_children":[]},"#":{"valid_children":[]}};
var centerTreePlugins =["contextmenu", "unique", "dnd", "types"];
var otherTreePlugins = ["dnd", "types", "search"];
var centerTreeSearch;
var otherTreeSearch ={'case_insensitive': true,'show_only_matches': true};
var centerTreeDND = {};
var otherTreeDND = {'always_copy': false};

function onLoad() {
    addIntegerHandler("fldSekerID");
    addMustClass("fldSekerID");
}
function getTeamsData(centerID, sourceEnv, other) {
    try {
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldCenterID', centerID, 'string');
        srch = getFldJSONsrch(srch, 'fldSourceEnv', sourceEnv, 'string');
        if (other == 1 || other == 2)
            srch = getFldJSONsrch(srch, 'fldOtherTeams', other, 'int');
        else
            srch = getFldJSONsrch(srch, 'fldOtherTeams', 0, 'int');
        var data = getJQAJAX("srvHarel.asmx/departmentsData", '{' + srch + '}', false, 1);
        if (data.data && data.data.length > 0) {
            if (other == 1)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "team"));
            else if (other == 2)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "dep"));
            else
                var json_data = JSON.parse(getJsonTreeData(data.data, 1, "dep", "team"));
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
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldCenterID', $get("fldSrchCenterID").value, 'int');
        srch = getFldJSONsrch(srch, 'fldTargetEnv', $get("fldTargetEnv").value, 'int');
        srch = getFldJSONsrch(srch, 'fldMngNote', $get("fldMngNote").value, 'string');
        var newData = getDataForSaveTree(treeID);
        srch = getFldJSONsrch(srch, 'doc', newData, 'string');

        var data = getJQAJAX("srvHarel.asmx/updateDeprTeamTree", '{' + srch + '}', false, 1);
        if (data && data.data) {
            $get("treeDataChanged").value = "0";
            openMsg('עידכון בוצע בהצלחה', 1);
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
    if ($get("treeDataChanged").value == "1")
        openMsg('בוצע שינוי במחלקות/צוותים - האם לצאת ללא שמירה ?', 2, 'getTeamTreesAfter();', 'setPreValues();');
    else
        getTeamTreesAfter();
}
function getOtherTrees() {
    var otherTreeData = "";
    var checked = $('input[type=radio]:checked', '#rblSearchTrees').val();
    $('#OtherTeams')[0].style.display = "";
    if (checked) {
        var otherTreeData = "";
        var centerID = $get("fldSrchCenterID").value;
        var sourceEnv = $get("fldSourceEnv").value;
        if (checked == "TeamTree")
            otherTreeData = getTeamsData(centerID, sourceEnv, 1);
        if (checked == "DeprTree")
            otherTreeData = getTeamsData(centerID, sourceEnv, 2);
        if (otherTreeData != "שגיאה" && otherTreeData != "") {
            show_tree("otherTeamTree", otherTreeData, otherTreeTypes, otherTreeSearch, otherTreeDND, otherTreePlugins);
        }
    }
}
function getTeamTreesAfter() {
    clearSelectedNode();
    $get("treeDataChanged").value = "0";
    savePreValues();
    var centerID = $get("fldSrchCenterID").value;
    var sourceEnv = $get("fldSourceEnv").value;
    if (centerID != "0" && centerID != "" && sourceEnv != "") {
        var teamsData = getTeamsData(centerID, sourceEnv);
        if (teamsData != "שגיאה") {
            show_tree("centerTeamTree", teamsData, centerTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins);
            getOtherTrees();
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