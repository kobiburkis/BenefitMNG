var integer_hand = {keypress: bnft_pressNum};

function btnConfiguration(btnType, btnYFunc, btnNFunc) {
    if (btnType == 1) {
        var btnConfig =
            {
                "אשר": function (btnYFunc) {
                    $(this).dialog("close");
                    if (btnYFunc)
                        eval(btnYFunc);
                }
            };
    }
    if (btnType == 2) {
        var btnConfig = {
            "כן": function () {
                $(this).dialog("close");
                if (btnYFunc)
                    eval(btnYFunc);
            },
            "לא": function () {
                $(this).dialog("close");
                if (btnNFunc)
                    eval(btnNFunc);
            }
        };
    }
    return btnConfig;
}
function openMsg(text, btnType, btnYFunc, btnNFunc) {
    $get("dialogText").innerText = text;
    //$("#dialogIcon").addClass('ui-icon-alert');
    $("#ctlDialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        show: {
            effect: "drop",
            duration: 300
        },
        hide: {
            effect: "puff",
            duration: 400
        }
    });
    $('#ctlDialog').dialog('option', 'buttons', btnConfiguration(btnType, btnYFunc, btnNFunc));
}
function savePreValues() {
    $("#fldSrchCenterID").data('pre', $("#fldSrchCenterID").val());
    $("#fldSourceEnv").data('pre', $("#fldSourceEnv").val());

}
function setPreValues() {
    var before_change = $("#fldSrchCenterID").data('pre');
    $get("fldSrchCenterID").value = before_change;
    before_change = $("#fldSourceEnv").data('pre');
    $get("fldSourceEnv").value = before_change;

}

function getChangeNodeMsg(treeID, objID) {
    if (treeID == 'centerTeamTree')
        return 'בוצע שינוי בצוות - האם לצאת ללא שמירה ?';
    return 'בוצעו שינויים - האם לצאת ללא שמירה';
}

function checkClearSelectionNode(treeID, objID) {
    if ($get("nodeDataChanged").value == "1") {
        var funcAfterYes = "clearSelectedNode('" + treeID + "'," + objID + ")";
        var funcAfterNo = "backToSelectedNode('" + treeID + "')";
        var msg = getChangeNodeMsg(treeID, objID);
        openMsg(msg, 2, funcAfterYes, funcAfterNo);
    }
    else
        clearSelectedNode(treeID, objID);
}
function backToSelectedNode(treeID)
{
    if (treeID.indexOf("other") < 0) { ///if select is on other tree - no action needed
        var selectedNode = $get("selectedNode").value;
        var selector = $("#" + treeID)[0];
        $("#" + treeID).jstree("deselect_node", $(selector).jstree("get_selected", true)[0]).trigger("deselect_node.jstree");
        $("#" + treeID).jstree("select_node", $.jstree.reference(selector)._model.data[selectedNode]).trigger("select_node.jstree");
    }
}
   
function clearSelectedNode(treeID, objID) {
    $get("nodeDataChanged").value = "0";
    $get("selectedNode").value = "";
    $get("ExtraFields").style.display = "none";
    if (treeID == 'centerTeamTree')
        clearTeamNode();
   
}


function getJsonTreeData(data, treeLevel, RootLevelType, InLevelType) {
    if (treeLevel == 1) {
        var json_data = '[{ "id" : "' + data[0].id + '" ,"text" : ' + JSON.stringify(data[0].nodeText) + ', "type": "' + RootLevelType + '","data":[' + JSON.stringify(data[0].data) + '], "children"    : [';
        for (var i = 1; i < data.length; i++) {
            var el = data[i];
            if (el.parent === "#") {
                if (json_data[json_data.length - 1] == ',')
                    json_data = json_data.substring(0, json_data.length - 1);
                json_data = json_data + ']},';
                json_data = json_data + '{' + '"id" : "' + el.id + '", "text" : ' + JSON.stringify(el.nodeText) + ', "type": "' + RootLevelType + '","data":[' + JSON.stringify(data[0].data) + '], "children"    : [';
            }
            else
                json_data = json_data + '{' + '"id" : "' + el.id + '", "text" : ' + JSON.stringify(el.nodeText) + ', "type": "' + InLevelType + '","data":[' + JSON.stringify(el.data) + ']},';
        }
        if (json_data[json_data.length - 1] == ',')
            json_data = json_data.substring(0, json_data.length - 1);
        json_data = json_data + "]}]";
    }
    if (treeLevel == 2) {
        var json_data = '[{ "id" : "' + data[0].id + '" ,"text" : ' + JSON.stringify(data[0].nodeText) + ', "type": "' + InLevelType + '","data":[' + JSON.stringify(data[0].data) + '], "children"    : [';
        for (var i = 1; i < data.length; i++) {
            var el = data[i];
            if (json_data[json_data.length - 1] == ',')
                json_data = json_data.substring(0, json_data.length - 1);
            json_data = json_data + ']},';
            json_data = json_data + '{' + '"id" : "' + el.id + '", "text" : ' + JSON.stringify(el.nodeText) + ', "type": "' + InLevelType + '","data":[' + JSON.stringify(el.data) + '], "children"    : [';
        }
        if (json_data[json_data.length - 1] == ',')
            json_data = json_data.substring(0, json_data.length - 1);
        json_data = json_data + "]}]";
    }
    return json_data;
}

function checkMngMustFields()
{
    if ($get("fldMngNote").value == '') {
        $get("fldMngNote").style.backgroundColor = 'red';
        openMsg('חובה להזין הערה ל- MNG', 1)
        return false;
    }
    if ($get("fldTargetEnv").value == '0') {
        $get("fldMngNote").style.backgroundColor = '';
        $get("fldTargetEnv").style.backgroundColor = 'red';
        openMsg('חובה לבחור סביבת MNG', 1)
        return false;
    }
    $get("fldTargetEnv").style.backgroundColor = '';
    $get("fldMngNote").style.backgroundColor = '';
    return true;
}

function getDataForSaveTree(treeID)
{
    var v = $(treeID).jstree(true).get_json('#', { flat: true });
    var newData = '[';
    for (var i = 0; i < v.length; i++) {
        //if (typeof (v[i].a_attr.class) != "undefined" && v[i].a_attr.class == "nodeChanged") {
        var json_data = '{ "id" : ' + JSON.stringify(v[i].id) + ',"parent" : ' + JSON.stringify(v[i].parent) + ' ,"nodeText" : ' + JSON.stringify(v[i].text) + ' ,"data" : ' + JSON.stringify(v[i].data.toString()) + '},';
        newData = newData + json_data;
        //}
    }
    newData = newData.substring(0, newData.length - 1);
    newData = newData + ']';
    return newData;
}

function saveNodeData(treeID) {
    var obj = $(treeID).jstree("get_selected", true);
    //Example: var newData = '{"fldSekerID":"1","fldTeamTorType":"2"}';
    var newData = getJsonDataFromFields('fstExtraFields');
    var data = '{' + newData + '}';
    obj[0].data.pop();
    obj[0].data.push(data);
    dataChanged(0);
    $(treeID).jstree(true).refresh_node(obj[0].id);
    
}

function dataChanged(change) {
    $get("nodeDataChanged").value = change;
}

function getJsonDataFromFields(fieldSetID) {
    var data = bnft_getJSON($get(fieldSetID));
    return data;
}
function setJsonDataToFields(obj) {
    //Example: var jsonResult = '{"fldSekerId": "retr","fldTeamTorType": "1"}';
    var jsonData = obj.data;
    $get("selectedNode").value = obj.id;
    if (obj.type == "team")
        $get("ExtraFields").style.display = "";
    var fields = JSON.parse(jsonData);
    if (fields) {
        $get("lblExtraDetailsSpec").innerText = obj.text;
        var keys = Object.keys(fields);
        for (var i = 0, emp; i < keys.length; i++) {
            var field = $get(keys[i]);
            if (field)
                field.value = fields[keys[i]];
        }
    }
}
function bnft_pressNum() {
    try {
        var key = event.keyCode;
        var ok = bnft_isNum(key) || (key == bnft_code(',')) || ((key == bnft_code('.')) && event.srcElement.value.indexOf('.') == -1);
        event.returnValue = ok;
        if (!ok)
            event.preventDefault();
        return ok;
    } catch (e) {
        return false;
    }
}
function bnft_isNum(key) { return (key >= bnft_code('0') && key <= bnft_code('9')); }
function bnft_code(ch) { return ch.charCodeAt(0); }
function bnft_fld(el) {
    return el && el.name;
}
function bnft_getFldJSON(sFld, sVal) {
    if (sFld.indexOf('$') != -1) {
        if (sFld.indexOf("fixCtl") != -1) {
            sFld = sFld.substring(sFld.lastIndexOf('fixCtl') + 7);
            sFld = sFld.replace(/\$/g, '_');
        }
        else if (sFld.indexOf("custIdent") != -1) {
            sFld = sFld.substring(sFld.lastIndexOf('custIdent') + 10);
            sFld = sFld.replace(/\$/g, '_');
        }
        else if (sFld.indexOf("CustIdentModalGlbl") != -1) {
            sFld = sFld.substring(sFld.lastIndexOf('CustIdentModalGlbl') + 19);
            sFld = sFld.replace(/\$/g, '_');
        }
        else if (sFld.indexOf("Glbl$") != -1) { // fields inside modal jquery window
            sFld = sFld.replace(/\$/g, '_');
        }
        else
            return '';
    }
    if (!sVal || sVal.toString().length == 0)
        return '';
    else
        return '"' + sFld + '":' + JSON.stringify(sVal);
}
function bnft_srchInputJSON(el, prefix) {
    switch (el.type.toUpperCase()) {
        case 'TEXT':
        case 'HIDDEN':
            if (prefix)
                return bnft_getFldJSON(el.name.substring(prefix.length), el.value);
            return bnft_getFldJSON(el.name, el.value);
        case 'RADIO':
        case 'CHECKBOX':
            if (el.checked) {
                if (prefix)
                    return bnft_getFldJSON(el.name.substring(prefix.length), el.value);
                return bnft_getFldJSON(el.name, el.value);
            }
            else
                return "";
        default:
            return "";
    }
}
function bnft_getJSON(el, prefix, notIn) {
    if (typeof el === 'undefined' || typeof el.tagName === 'undefined')
        return "";
    if (notIn)
        if (el.name && el.name.indexOf(notIn) != -1)
            return "";
    var srch = "";
    var fld;
    switch (el.tagName.toUpperCase()) {
        case 'INPUT':
            if (bnft_fld(el)) {
                fld = bnft_srchInputJSON(el, prefix);
                if (fld != '') {
                    if (srch != '')
                        srch += ',';
                    srch += fld;
                }
            }
            break;
        case 'TEXTAREA':
        case 'SELECT':
            if (prefix)
                fld = bnft_getFldJSON(el.name.substring(prefix.length), el.value);
            else
                fld = bnft_getFldJSON(el.name, el.value);
            if (fld != '') {
                if (srch != '')
                    srch += ',';
                srch += fld;
            }
            break;
        default:
            for (var i = 0; i < el.childNodes.length; i++) {
                fld = bnft_getJSON(el.childNodes[i], prefix, notIn);
                if (fld != '') {
                    if (srch != '')
                        srch += ',';
                    srch += fld;
                }
            }
            break;
    }
    return srch;
}
function getFldJSONsrch(srch, sFld, sVal, sType) {
    var currSrch = '"' + sFld + '":';
    if (!sVal || sVal.toString().length == 0) {// default value
        if (!sType)
            currSrch = currSrch + '""';
        else if (sType == 'string')
            currSrch = currSrch + '""';
        else if (sType == 'int')
            currSrch = currSrch + '0';
        else if (sType == 'bool')
            currSrch = currSrch + 'false';
        else
            currSrch = currSrch + '""';
    } else {// there is value
        if (!sType)
            currSrch = currSrch + JSON.stringify(sVal);
        else if (sType == 'string')
            currSrch = currSrch + JSON.stringify(sVal);
        else
            currSrch = currSrch + sVal;
    }
    if (srch == '')
        return currSrch;
    return srch + ',' + currSrch;
}
function getJQAJAX(sUrl, sSrch, bAsync, returnJson) {
    var ret = $.ajax({
        type: "POST",
        url: sUrl,
        data: sSrch.toString(),
        async: bAsync,
        mode: 'queue',
        contentType: "application/json",
        dataType: "json",
        success: function (msg, textStatus, jqXHR) {
            document.body.style.cursor = '';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.body.style.cursor = '';
            top.status = 'ajaxError from URL:' + sUrl;
        }
    });
    if (typeof ret.responseJSON != "undefined" && ret.responseJSON)
        return JSON.parse(ret.responseJSON.d);
    else if (typeof ret.responseText != "undefined" && ret.responseText != '')
        return JSON.parse(JSON.parse(ret.responseText).d);
    else return '';
}
function checkContextMenuAvailabilty(data, action) {
    var inst = $.jstree.reference(data.reference),
	obj = inst.get_node(data.reference);
    var objType = obj.type;
    if ((objType == "team") && (action == "create" || action == "create_root" || action == "remove_center"))
        return true;
    if ((objType == "depr") && (action == "editData"))
        return true;
    return false;
}
function getContextMenuLabel(data, action) {
    var inst = $.jstree.reference(data.reference),
	obj = inst.get_node(data.reference);
    var objType = obj.type;
    if (("depr,team".indexOf(objType) > -1) && (action == "create"))
        return "צור צוות חדש";
    if (("depr,team".indexOf(objType) > -1) && (action == "create_root"))
        return "צור מחלקה חדשה";
    if (("depr,team".indexOf(objType) > -1) && (action == "remove_center"))
    {
        if (obj.data && obj.data.toString().indexOf("fldRemove") > -1)
            return "החזר קישור למוקד";
        else
            return "מחר קישור למוקד";
    }
    return "חדש";
}
function getNewNodeText(type) {
    switch (type) {
        case 'team':
            return "צוות חדש";
            break;
        case 'depr':
            return "מחלקה חדשה";
            break;
        default:
            return "חדש";
    }
}
function reloadCenterCombo() {
    if ($get("fldSourceEnv").value != '') {
        var srch = 'fldSourceEnv=';
        srch = srch + $get("fldSourceEnv").value;
        reloadCombo("frmMngTeams", "fldSrchCenterID", srch);
    }
}
function reloadCombo(sFrm, sCombo, sFilter, sPrefix, sToCombo) {
    try {
        var result = getXMLAJAX('frmCombo.aspx', 'sFrm=' + sFrm + '&combo=' + sCombo + '&' + sFilter);
        var xml = (result.responseXML == null) ? loadXml(result.responseText) : result.responseXML;
        var fromCmb = xml.querySelector('select');
        var id;
        if (!sToCombo)
            id = fromCmb.getAttribute('id');
        else
            id = sToCombo;
        if (!sPrefix)
            sPrefix = '';
        var toCmb = $get(sPrefix + id);
        if (toCmb) {
            var comboValue = toCmb.value;
            toCmb.innerHTML = fromCmb.innerHTML;
            toCmb.value = comboValue;
        }
    } catch (e) {
        
    }
}
function getXMLAJAX(sUrl, sSrch, bAsync, returnJson) {
    if (arguments.length < 3)
        bAsync = false;
    document.body.style.cursor = 'wait';
        return $.ajax({
            type: "POST",
            url: sUrl,
            data: sSrch,
            async: bAsync,
            mode: 'queue',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'xml',
            success: function (msg, textStatus, jqXHR) {
                //if (bAsync && sUrl.toString().indexOf('frmGrid.aspx') >= 0) {
                //    var srch = sSrch.toString().split('&');
                //    var sFrm = srch[0].split('=')[1];
                //    var sFilter = sSrch.substr(sSrch.indexOf("]") + 2, sSrch.length);
                //    var sGrid = srch[1].split('=')[1];
                //    fAfterJQGRD(sFrm, sGrid, sFilter, jqXHR);
                //}
                document.body.style.cursor = '';
                //top.status="Loading ajax data success!";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                document.body.style.cursor = '';
              //  bnft_logErr('ajax', 'ajaxError from URL:' + sUrl, "content:" + XMLHttpRequest.responseText);
                top.status = 'ajaxError from URL:' + sUrl;
            }
        });
}
