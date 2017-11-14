var centerTreeTypes = { "preserve": {"valid_children": [] }, "problem": { "valid_children": ["preserve"] }, "#": { "valid_children": ["problem"] } };
var otherTreeTypes = { "preserve": { "valid_children": [] }, "problem": {  "valid_children": [] }, "#": { "valid_children": [] } };
var centerTreePlugins = ["contextmenu", "unique", "dnd", "types"];
var otherTreePlugins = ["dnd", "types", "search"];
var centerTreeSearch;
var otherTreeSearch = { 'case_insensitive': true, 'show_only_matches': true };
var centerTreeDND = { 'always_copy': true };
var otherTreeDND = { 'always_copy': true };
var preserveItems = ',duplicate,rename,editData,extraData,';
var problemItems = ',create_root,create,rename,duplicate,extraData,editData,';
function onLoad() {
    addIntegerHandler("fldDaysDiff,fldSLA,fldSLA2,fldCMIndication,fldCMActionCode,fldDoctorEmplDepartmentIDs,fldDoctorEmplDepartmentIDs2,fldFieldID");
    addMustClass("fldPreserveTigmulID,fldPreserveTypeMrkzID");
}
function getProblemPreserveData(centerID, sourceEnv, other) {
    try {
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldCenterID', centerID, 'string');
        srch = getFldJSONsrch(srch, 'fldSourceEnv', sourceEnv, 'string');
        if (other == 1 || other == 2)
            srch = getFldJSONsrch(srch, 'fldOtherValues', other, 'int');
        else
            srch = getFldJSONsrch(srch, 'fldOtherValues', 0, 'int');
        var data = getJQAJAX("srvHarel.asmx/getProblemPreserveData", '{' + srch + '}', false, 1);
        if (data.data && data.data.length > 0) {
            if (other == 1)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "problem"));
            else if (other == 2)
                var json_data = JSON.parse(getJsonTreeData(data.data, 2, null, "preserve"));
            else
                var json_data = JSON.parse(getJsonTreeData(data.data, 1, "problem", "preserve"));
            return json_data;
        }
        else {
            if (typeof (data.data) == "undefined") {
                openMsg("שגיאה בקריאה לפרוצדורה של מקור/הליך", 1);

                top.status = "Error In getJsonTreeData:" + e.message.toString();
                return "שגיאה";
            }
            if (data.data && data.data.length == 0) {
                openMsg("לא נמצאו הגדרות למוקד", 1);
                return "שגיאה";
            }
        }
    } catch (e) {
        openMsg("שגיאה בטעינת נתונים", 1);
        top.status = "Error In getTeamsData:" + e.message.toString();
        return "שגיאה";
    }
}
function getProblemPreserveTrees() {
    if ($get("commonCtl_treeDataChanged").value == "1")
        openMsg('בוצע שינוי במקורות/הליכים - האם לצאת ללא שמירה ?', 2, 'getProblemPreserveTreeAfter();', 'setPreValues();');
    else
        getProblemPreserveTreeAfter();
}
function getOtherTrees() {
    var otherTreeData = "";
    var checked = $('input[type=radio]:checked', '#rblSearchTrees').val();
    $('#OtherValuesSearch')[0].style.display = "";
    if (checked) {
        var otherValuesData = "";
        var centerID = $get("fldSrchCenterID").value;
        var sourceEnv = $get("fldSourceEnv").value;
        if (checked == "ProblemTree")
            otherValuesData = getProblemPreserveData(centerID, sourceEnv, 1);
        if (checked == "PreserveTree")
            otherValuesData = getProblemPreserveData(centerID, sourceEnv, 2);
        if (otherValuesData != "שגיאה" && otherValuesData != "") {
            show_tree("otherValuesTree", otherValuesData, otherTreeTypes, otherTreeSearch, otherTreeDND, otherTreePlugins);
        }
    }
}
function getProblemPreserveTreeAfter() {
    clearSelectedNode();
    $get("commonCtl_treeDataChanged").value = "0";
    var sourceEnv = $get("fldSourceEnv").value;
   /* var checked = $('input[type=radio]:checked', '#rblCenterTree').val();
    //if (checked == "MainTree") {
    //    $get("trSrchCenter").style.display = "none";
    //    $get("fldSrchCenterID").value = "";
    //    clearProblemPreserveTrees();
    //    var proPreData = getProblemPreserveData("0", sourceEnv);
    //    if (proPreData != "שגיאה") {
    //        show_tree("centerProblemPreserveTree", proPreData, centerTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins);
    //    }
    //}
    //if (checked == "CenterTree") {
    //    if ($get("trSrchCenter").style.display == "none") { //switchFromMainToCenter
    //        $get("trSrchCenter").style.display = "";
    //        clearProblemPreserveTrees();
    //    }
        //else {// changeCenterCombo
        */
            var centerID = $get("fldSrchCenterID").value;
            clearProblemPreserveTrees();
            if (centerID != "0" && centerID != "" && sourceEnv != "") {
                savePreValues();
                var proPreData = getProblemPreserveData(centerID, sourceEnv);
                if (proPreData != "שגיאה") {
                    show_tree("centerProblemPreserveTree", proPreData, centerTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins);
                    getOtherTrees();
                }
            }
        //}
    //}
  }
function clearProblemPreserveTrees() {
    $("#centerProblemPreserveTree").jstree("destroy");
    $("#otherValuesTree").jstree("destroy");
    $('#OtherValuesSearch')[0].style.display = "none";
}
function saveTreeData(treeID) {
    if (checkMngMustFields()) {
        var srch = '';
        //if ($get('trSrchCenter').style.display == "none")
        //    srch = getFldJSONsrch(srch, 'fldCenterID', "0", 'int');
        //else
        var targetEnv = getTargetEnv();
        srch = getFldJSONsrch(srch, 'fldCenterID', $get("fldSrchCenterID").value, 'int');
        srch = getFldJSONsrch(srch, 'fldTargetEnv', targetEnv, 'string');
        srch = getFldJSONsrch(srch, 'fldMngNote', $get("fldMngNote").value, 'string');
        var newData = getDataForSaveTree(treeID);
        srch = getFldJSONsrch(srch, 'doc', newData, 'string');

        var data = getJQAJAX("srvHarel.asmx/updateProblemPreserveTree", '{' + srch + '}', false, 1);
        if (data && data.data) {
            $get("commonCtl_treeDataChanged").value = "0";
            openMsg('עידכון בוצע בהצלחה', 1);
            getProblemPreserveTrees();
        }
        else {
            if (data && data.err && data.err.length > 0)
                openMsg(data.err[0]["ErrorMsg"], 1);
            else
                openMsg('שגיאה בשמירת שינויים', 1);
        }

    }
}
function dispEditFields(type) {
    $get("trID").style.display = "";
    $get("trDisplayAdd").style.display = "";
    if (type == "problem")
        dispPreserveFields("none", "none");
    else
        dispPreserveFields("", "");
}
function dispPreserveFields(disp, dispCenterFields) {
    $get("trPreserveTypeMrkzID").style.display = disp;
    $get("trPreserveTigmulID").style.display = disp;
    $get("trDaysDiff").style.display = disp;
    $get("trSLA").style.display = disp;
    $get("trSLA2").style.display = disp;
    $get("trCMIndication").style.display = disp;
    $get("trCMActionCode").style.display = disp;
    $get("trDoctorSourceID").style.display = dispCenterFields;
    $get("trDoctorEmplDepartmentIDs").style.display = dispCenterFields;
    $get("trDoctorSourceID2").style.display = dispCenterFields;
    $get("trDoctorEmplDepartmentIDs2").style.display = dispCenterFields;
}
function clearPreserveProblemNode()
{
    $get("fldFieldID").value = "";
    $get("fldPreserveTigmulID").value = "";
    $get("fldPreserveTypeMrkzID").value = "";
    $get("fldDisplayAdd").checked = false;
    $get("fldDaysDiff").value = "";
    $get("fldSLA").value = "";
    $get("fldSLA2").value = "";
    $get("fldCMIndication").value = "";
    $get("fldCMActionCode").value = "";
    $get("fldDoctorSourceID").value = "";
    $get("fldDoctorEmplDepartmentIDs").value = "";
    $get("fldDoctorSourceID2").value = "";
    $get("fldDoctorEmplDepartmentIDs2").value = "";

}
function checkSpecialExtraFields() {
    var checkMust = true;
    if ($get('trDoctorSourceID').style.display == "" && $get('fldDoctorSourceID').selectedIndex > 0)
    {
        if ($get('fldDoctorEmplDepartmentIDs').value == "") {
            $get('fldDoctorEmplDepartmentIDs').style.backgroundColor = 'red';
            openMsg('שדה חובה', 1);
            checkMust = false;
        }
        else
            $get('fldDoctorEmplDepartmentIDs').style.backgroundColor = '';
    }
    if ($get('trDoctorSourceID2').style.display == "" && $get('fldDoctorSourceID2').selectedIndex > 0) {
        if ($get('fldDoctorEmplDepartmentIDs2').value == "") {
            $get('fldDoctorEmplDepartmentIDs2').style.backgroundColor = 'red';
            if (checkMust) {
                openMsg('שדה חובה', 1);
                checkMust = false;
            }
        }
        else
            $get('fldDoctorEmplDepartmentIDs2').style.backgroundColor = '';
    }
    return checkMust;
}