function onLoad() {
    //$('fldSourceEnv').data('pre', $('fldSourceEnv').val());
    //$('fldSrchCenterID').data('pre', $('fldSrchCenterID').val());
    var el = $get("fldSekerID");
    $addHandlers(el, integer_hand, el);
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
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "depr"));
            else
                var json_data = JSON.parse(getJsonTreeData(data.data, 1, "depr", "team"));
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
function show_tree(treeID, json_data) {
    try {
        treeID = "#" + treeID;
        $(treeID).jstree("destroy");
        if (treeID.indexOf("other") > -1) {
            $(treeID).jstree({
                "core": {
                    "check_callback": function (op, node, par, pos, more) {
                        //if ((op === "move_node" || op === "copy_node") && node.type && node.type == "depr") {
                        //    return false;
                        //}
                        return true;
                    },
                    "data": json_data

                },
                "types": {
                    "team": {
                        "icon": "dist/themes/default/team.png",
                        "valid_children": []
                    },
                    "depr": {
                        "icon": "dist/themes/default/depr.png",
                        "valid_children": []
                    },
                    "#": {
                        "valid_children": []
                    }
                },
                'search': {
                    'case_insensitive': true,
                    'show_only_matches': true
                },
                'dnd': {
                    'always_copy': false
                },
                "plugins": ["dnd", "types", "search"]
            });

            $('#fldSearchTeams').keyup(function () {
                $(treeID).jstree(true).show_all();
                $(treeID).jstree('search', $(this).val());
            });
        }
        else {
            $(treeID).jstree({
                "core": {
                    "check_callback": function (op, node, par, pos, more) {
                        //if ((op === "move_node" || op === "copy_node") && node.type && node.type == "depr") {
                        //    return false;
                        //}
                        return true;
                    },
                    "data": json_data

                },
                "types": {
                    "team": {
                        "icon": "dist/themes/default/team.png",
                        "valid_children": []
                    },
                    "depr": {
                        "icon": "dist/themes/default/depr.png",
                        "valid_children": ["team"]
                    },
                    "#": {
                        "valid_children": ["depr"]
                    }
                },
                "plugins": ["contextmenu", "unique", "dnd", "types"]
            });
            // $get("cntlPanel").style.display = "";
        }
    }
    catch (e) {
        openMsg("שגיאה בטעינת צוותים", 1);
        top.status = "Error In show_tree:" + e.message.toString();
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
            show_tree("otherTeamTree", otherTreeData);
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
            show_tree("centerTeamTree", teamsData);
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