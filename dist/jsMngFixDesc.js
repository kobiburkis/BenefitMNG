var centerTreeTypes = { "fixdesc": { "valid_children": [] }, "#": { "valid_children": ["fixdesc"] } };
var otherTreeTypes = { "fixdesc": { "valid_children": [] }, "#": { "valid_children": [] } };
var centerTreePlugins = ["contextmenu", "unique", "dnd", "types"];
var otherTreePlugins = ["dnd", "types", "search"];
var centerTreeSearch;
var otherTreeSearch = { 'case_insensitive': true, 'show_only_matches': true };
var centerTreeDND = { 'always_copy': false };
var otherTreeDND = { 'always_copy': true };
var fixdescItems = ',create_root,rename,extraData,remove_center,';
function onLoad() {
}
function getFixDescData(centerID, sourceEnv, other,fldProblemID, fldProblemSubID, fldProblemDescID, fldPreservProcID, fldFixTypeID, fldResultDiklaID) {
    try {
        var srch = '';
        srch = getFldJSONsrch(srch, 'fldCenterID', centerID, 'string');
        srch = getFldJSONsrch(srch, 'fldSourceEnv', sourceEnv, 'string');
        srch = getFldJSONsrch(srch, 'fldOtherValues', other, 'int');
        srch = getFldJSONsrch(srch, 'fldProblemID', fldProblemID, 'string');
        srch = getFldJSONsrch(srch, 'fldProblemSubID', fldProblemSubID, 'string');
        srch = getFldJSONsrch(srch, 'fldProblemDescID', fldProblemDescID, 'string');
        srch = getFldJSONsrch(srch, 'fldPreservProcID', fldPreservProcID, 'string');
        srch = getFldJSONsrch(srch, 'fldFixTypeID', fldFixTypeID, 'string');
        srch = getFldJSONsrch(srch, 'fldResultDiklaID', fldResultDiklaID, 'string');
        srch = getFldJSONsrch(srch, 'fldIsSrv', $get("IsSrv").value, 'string');
        var data = getJQAJAX("srvHarel.asmx/getFixDescData", '{' + srch + '}', false, 1);
        if (data.data && data.data.length > 0) {
            if (other == 0) 
                var json_data = JSON.parse(getJsonTreeData(data.data, 1, "fixdesc", null));
            else
                var json_data = JSON.parse(getJsonTreeData(data.data, 1, "fixdesc", null));
            return json_data;
        }
        else {
            if (typeof (data.data) == "undefined") {
                openMsg("שגיאה בקריאה לפרוצדורה של תיעוד מובנה", 1);

                top.status = "Error In getJsonTreeData:" + e.message.toString();
                return "שגיאה";
            }
            if (data.data && data.data.length == 0) {
                openMsg("לא נמצאו הגדרות מתאימות", 1);
                return "שגיאה";
            }
        }
    } catch (e) {
        openMsg("שגיאה בטעינת נתונים", 1);
        top.status = "Error In getTeamsData:" + e.message.toString();
        return "שגיאה";
    }
}
function getFixDescTrees() {
    if ($get("commonCtl_treeDataChanged").value == "1")
        openMsg('בוצע שינוי בתיעוד מובנה - האם לצאת ללא שמירה ?', 2, 'getFixDescTreesAfter();', 'setPreSrchValues();');
    else
        getFixDescTreesAfter();
}
function getFixDescTreesAfter() {
    clearSelectedNode();
    $get("commonCtl_treeDataChanged").value = "0";
    var sourceEnv = $get("fldSourceEnv").value;
    var centerID = $get("fldSrchCenterID").value;
    var fldProblemID = $get("fldProblemID").value == '' ? '0' : $get("fldProblemID").value;
    var fldProblemSubID = $get("fldProblemSubID").value == '' ? '0' : $get("fldProblemSubID").value;
    var fldProblemDescID = $get("fldProblemDescID").value == '' ? '0' : $get("fldProblemDescID").value;
    var fldPreservProcID = $get("fldPreservProcID").value == '' ? '0' : $get("fldPreservProcID").value;
    var fldFixTypeID = $get("fldFixTypeID").value == '' ? '0' : $get("fldFixTypeID").value;
    var fldResultDiklaID = $get("fldResultDiklaID").value == '' ? '0' : $get("fldResultDiklaID").value;
    clearFixDescTrees();
    if (centerID != "0" && centerID != "" && sourceEnv != "") {
        if (($get("trSrvParams").style.display == '' && fldProblemID != "0" && fldProblemSubID != "0")
            || ($get("trPrsParams").style.display == '' && fldProblemDescID != "0" && fldPreservProcID != "0")) {
            savePreSrchValues();
            var fixDescData = getFixDescData(centerID, sourceEnv, 0,fldProblemID, fldProblemSubID, fldProblemDescID, fldPreservProcID, fldFixTypeID, fldResultDiklaID);
            if (fixDescData != "שגיאה") {
                show_tree("centerFixDescTree", fixDescData, centerTreeTypes, centerTreeSearch, centerTreeDND, centerTreePlugins);
                getOtherTrees(centerID, sourceEnv,fldProblemID, fldProblemSubID, fldProblemDescID, fldPreservProcID, fldFixTypeID, fldResultDiklaID);
            }
        }
    }
}
function getOtherTrees(centerID, sourceEnv,fldProblemID, fldProblemSubID, fldProblemDescID, fldPreservProcID, fldFixTypeID, fldResultDiklaID) {
    $('#OtherFixDescs')[0].style.display = "";
    var otherValuesData = "";
    otherValuesData = getFixDescData(centerID, sourceEnv, 1, centerID, sourceEnv, 0, fldProblemID, fldProblemSubID, fldProblemDescID, fldPreservProcID, fldFixTypeID, fldResultDiklaID);
    if (otherValuesData != "שגיאה" && otherValuesData != "") {
        show_tree("otherFixDescTree", otherValuesData, otherTreeTypes, otherTreeSearch, otherTreeDND, otherTreePlugins);
    }
}
function clearFixDescTrees() {
    $("#centerFixDescTree").jstree("destroy");
    $("#otherFixDescTree").jstree("destroy");
    $('#OtherFixDescs')[0].style.display = "none";
}
function savePreSrchValues() {
    savePreValues();//sourceEnv and Center
    if ($get("IsSrv").value == "0") {
        $("#fldProblemID").data('pre', $("#fldProblemID").val());
        $("#fldProblemSubID").data('pre', $("#fldProblemSubID").val());
    }
    else
    {
        $("#fldProblemDescID").data('pre', $("#fldProblemDescID").val());
        $("#fldPreservProcID").data('pre', $("#fldPreservProcID").val());
        $("#fldFixTypeID").data('pre', $("#fldFixTypeID").val());
        $("#fldResultDiklaID").data('pre', $("#fldResultDiklaID").val());
    }
}
function setPreSrchValues() {
    setPreValues();//sourceEnv and Center
    var before_change = '';
    if ($get("IsSrv").value == "0")
    {
        before_change = $("#fldProblemID").data('pre');
        $get("fldProblemID").value = before_change;

        before_change = $("#fldProblemSubID").data('pre');
        $get("fldProblemSubID").value = before_change;
    }
    else {
        before_change = $("#fldProblemDescID").data('pre');
        $get("fldProblemDescID").value = before_change;

        before_change = $("#fldPreservProcID").data('pre');
        $get("fldPreservProcID").value = before_change;

        before_change = $("#fldFixTypeID").data('pre');
        $get("fldFixTypeID").value = before_change;

        before_change = $("#fldResultDiklaID").data('pre');
        $get("fldResultDiklaID").value = before_change;
    }
}
function setFilterParams() {
    clearFixDescTrees();
    $get("fldProblemID").value = '';
    $get("fldProblemSubID").value = '';
    $get("fldProblemDescID").value = '';
    $get("fldPreservProcID").value = '';
    $get("fldFixTypeID").value = '';
    $get("fldResultDiklaID").value = '';
    var srch = '';
    srch = getFldJSONsrch(srch, 'fldCenterID', $get("fldSrchCenterID").value, 'int');
    var data = getJQAJAX("srvHarel.asmx/getCenterType", '{' + srch + '}', false, 1);
    if (data.data && data.data.length == 1) {
        $get("IsSrv").value = data.data[0].fldIsSrv;
        if ($get("IsSrv").value == 1)
            dispCenterParams('','none');
        else
            dispCenterParams('none', '');
    }
    else
        openMsg('שגיאה בהגדרות מוקד', 1);
}
function dispCenterParams(srvParams, prsParams) {
    $get("trSrvParams").style.display = srvParams;
    $get("trPrsParams").style.display = prsParams;
    if ($get("IsSrv").value == "1") {
        reloadProblemCombo();
        reloadProblemSubCombo();
    }
    else {
        reloadProblemDescCombo();
        reloadPreservProcCombo();
        reloadFixTypeCombo();
        reloadResultDiklaCombo();
    }
}
function reloadProblemCombo() {
        var srch = 'fldSourceEnv=';
        srch = srch + $get("fldSourceEnv").value;
        srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
        reloadCombo("frmMngFixDesc", "fldProblemID", srch);
}
function reloadProblemSubCombo() {
        var srch = 'fldSourceEnv=';
        srch = srch + $get("fldSourceEnv").value;
        srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
        srch = srch + "&fldProblemID=" + $get("fldProblemID").value;
        reloadCombo("frmMngFixDesc", "fldProblemSubID", srch);
}
function reloadProblemDescCombo() {
    var srch = 'fldSourceEnv=';
    srch = srch + $get("fldSourceEnv").value;
    srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
    reloadCombo("frmMngFixDesc", "fldProblemDescID", srch);
}
function reloadPreservProcCombo() {
    var srch = 'fldSourceEnv=';
    srch = srch + $get("fldSourceEnv").value;
    srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
    srch = srch + "&fldProblemDescID=" + $get("fldProblemDescID").value;
    reloadCombo("frmMngFixDesc", "fldPreservProcID", srch);
}
function reloadFixTypeCombo() {
    var srch = 'fldSourceEnv=';
    srch = srch + $get("fldSourceEnv").value;
    srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
    srch = srch + "&fldPreservProcID=" + $get("fldPreservProcID").value;
    reloadCombo("frmMngFixDesc", "fldFixTypeID", srch);
}
function reloadResultDiklaCombo() {
    var srch = 'fldSourceEnv=';
    srch = srch + $get("fldSourceEnv").value;
    srch = srch + "&fldCenterID=" + $get("fldSrchCenterID").value;
    srch = srch + "&fldPreservProcID=" + $get("fldPreservProcID").value;
    var fixType = $get("fldFixTypeID").value == '' ? '0' : $get("fldFixTypeID").value;
    srch = srch + "&fldFixTypeID=" + fixType;
    reloadCombo("frmMngFixDesc", "fldResultDiklaID", srch);
}
function saveTreeData(treeID) {
    if (checkMngMustFields()) {
        var srch = '';
        var targetEnv = getTargetEnv();
        srch = getFldJSONsrch(srch, 'fldCenterID', $get("fldSrchCenterID").value, 'int');
        srch = getFldJSONsrch(srch, 'fldTargetEnv', targetEnv, 'string');
        srch = getFldJSONsrch(srch, 'fldMngNote', $get("fldMngNote").value, 'string');
        var fldProblemID = $get("fldProblemID").value == '' ? '0' : $get("fldProblemID").value;
        var fldProblemSubID = $get("fldProblemSubID").value == '' ? '0' : $get("fldProblemSubID").value;
        var fldProblemDescID = $get("fldProblemDescID").value == '' ? '0' : $get("fldProblemDescID").value;
        var fldPreservProcID = $get("fldPreservProcID").value == '' ? '0' : $get("fldPreservProcID").value;
        var fldFixTypeID = $get("fldFixTypeID").value == '' ? '0' : $get("fldFixTypeID").value;
        var fldResultDiklaID = $get("fldResultDiklaID").value == '' ? '0' : $get("fldResultDiklaID").value;
        srch = getFldJSONsrch(srch, 'fldProblemID', fldProblemID, 'string');
        srch = getFldJSONsrch(srch, 'fldProblemSubID', fldProblemSubID, 'string');
        srch = getFldJSONsrch(srch, 'fldProblemDescID', fldProblemDescID, 'string');
        srch = getFldJSONsrch(srch, 'fldPreservProcID', fldPreservProcID, 'string');
        srch = getFldJSONsrch(srch, 'fldFixTypeID', fldFixTypeID, 'string');
        srch = getFldJSONsrch(srch, 'fldResultDiklaID', fldResultDiklaID, 'string');
        srch = getFldJSONsrch(srch, 'fldIsSrv', $get("IsSrv").value, 'string');
        var newData = getDataForSaveTree(treeID);
        srch = getFldJSONsrch(srch, 'doc', newData, 'string');
        var data = getJQAJAX("srvHarel.asmx/updateFixDescTree", '{' + srch + '}', false, 1);
        if (data && data.data) {
            $get("commonCtl_treeDataChanged").value = "0";
            openMsg('עידכון בוצע בהצלחה', 1);
            getFixDescTrees();
        }
        else {
            if (data && data.err && data.err.length > 0)
                openMsg(data.err[0]["ErrorMsg"], 1);
            else
                openMsg('שגיאה בשמירת שינויים', 1);
        }

    }
}