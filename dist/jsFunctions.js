var integer_hand = {keypress: bnft_pressNum};
function addIntegerHandler(fieldsList)
{
    var list = fieldsList.split(',');
    for (var i = 0; i < list.length; i++) {
        var el = $get(list[i]);
        if (el)
            $addHandlers(el, integer_hand, el);
    }
}
function addMustClass(fieldsList) {
    var list = fieldsList.split(',');
    for (var i = 0; i < list.length; i++) {
        var el = $get(list[i]);
        if (el)
            el.classList.add("must");
    }
}
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
    $get("commonCtl_dialogText").innerText = text;
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
    $("#fldSourceEnv").data('pre', $("#fldSourceEnv").val());
    if ($("#fldSrchCenterID")[0])
        $("#fldSrchCenterID").data('pre', $("#fldSrchCenterID").val());
    if ($("#fldSrchDepartmentID")[0])
        $("#fldSrchDepartmentID").data('pre', $("#fldSrchDepartmentID").val());
    
    if ($('#rblScreenMode')[0]) {
        var checked = $('input[type=radio]:checked', '#rblScreenMode')[0].id;
        $("#rblScreenMode").data('pre', checked);
    }


}
function setPreValues() {
    var before_change;
    before_change = $("#fldSourceEnv").data('pre');
    $get("fldSourceEnv").value = before_change;
    if ($("#fldSrchCenterID")[0]) {
        before_change = $("#fldSrchCenterID").data('pre');
        $get("fldSrchCenterID").value = before_change;
    }
    if ($("#fldSrchDepartmentID")[0]) {
        before_change = $("#fldSrchDepartmentID").data('pre');
        $get("fldSrchDepartmentID").value = before_change;
    }
    
    if ($('#rblScreenMode')[0]) {
        before_change = $("#rblScreenMode").data('pre');
        $("#" + before_change).prop("checked", true)
    }

}
function setDisplayedNodes(inst, obj, loop) {
    if (loop == 0)
        setDisplayedNode(inst, obj);
    else { //loop through tree foor objID instances
        var idPrefix = obj.id.substring(0, obj.id.indexOf('*'));
        var parentsArray = inst._model.data['#'].children;
        for (var i = 0; i < parentsArray.length; i++) {
            var parentExt = '*' + parentsArray[i].substr(parentsArray[i].indexOf('_') + 1);
            var searchID = idPrefix + parentExt;
            var objSearch = inst.get_node(searchID);
            if (objSearch)
                setDisplayedNode(inst, objSearch);
        }

    }
}
function setDisplayedNode(inst, obj) {
    var objData = JSON.parse(obj.data);
    if (objData.fldDisplayAdd == "0") {//Delete Remove Attribute
        if (inst._model.data[obj.id].a_attr['class'].indexOf("nodeDeleted") == -1)
            inst._model.data[obj.id].a_attr['class'] = inst._model.data[obj.id].a_attr['class'] + " nodeDeleted";
        /*
        if (inst._model.data[obj.id].li_attr['class'] && inst._model.data[obj.id].li_attr['class'].indexOf("nodeDeleted") == -1)
            inst._model.data[obj.id].li_attr['class'] = inst._model.data[obj.id].li_attr['class'] + " nodeDeleted";
        else
            inst._model.data[obj.id].li_attr['class'] = "nodeDeleted";
           
        if ($get(obj.id))
            $get(obj.id).classList.add("nodeDeleted");
             */
        if ($get(obj.id + "_anchor"))
            $get(obj.id + "_anchor").classList.add("nodeDeleted");

    }
    else {
        
        if (inst._model.data[obj.id].a_attr['class'].indexOf("nodeDeleted") > -1)
            inst._model.data[obj.id].a_attr['class'] = inst._model.data[obj.id].a_attr['class'].replace("nodeDeleted", "");
        /*
        if (inst._model.data[obj.id].li_attr['class'].indexOf("nodeDeleted") > -1)
            inst._model.data[obj.id].li_attr['class'] = inst._model.data[obj.id].li_attr['class'].replace("nodeDeleted","");
            
        if ($get(obj.id))
            $get(obj.id).classList.remove("nodeDeleted");
            */
        if ($get(obj.id + "_anchor"))
            $get(obj.id + "_anchor").classList.remove("nodeDeleted");
    }
}
function setRemovedNodes(inst, obj, loop) {
    $get("commonCtl_treeDataChanged").value = "1";
    if (loop == 0)
        setRemovedNode(inst, obj);
    else { //loop through tree foor objID instances
        var idPrefix = obj.id.substring(0, obj.id.indexOf('*'));
        var parentsArray = inst._model.data['#'].children;
        for (var i = 0; i < parentsArray.length; i++) {
            var parentExt = '*' + parentsArray[i].substr(parentsArray[i].indexOf('_') + 1);
            var searchID = idPrefix + parentExt;
            var objSearch = inst.get_node(searchID);
            if (objSearch)
                setRemovedNode(inst, objSearch);
        }
        
    }
}
function setRemovedNode(inst, obj) {
    var objData = JSON.parse(obj.data);
    if (typeof (objData.fldRemove) != "undefined") {//Delete Remove Attribute
        delete objData.fldRemove;
        obj.data.pop();
        obj.data.push(JSON.stringify(objData));
        inst._model.data[obj.id].a_attr['class'] = "";
        inst._model.data[obj.id].li_attr['class'] = "";
        if ($get(obj.id))
            $get(obj.id).classList.remove("nodeDeleted");
        if ($get(obj.id + "_anchor"))
            $get(obj.id + "_anchor").classList.remove("nodeDeleted");
        
    }
    else {
        objData.fldRemove = "Y";
        obj.data.pop();
        obj.data.push(JSON.stringify(objData));
        inst._model.data[obj.id].a_attr['class'] = "nodeDeleted";
        inst._model.data[obj.id].li_attr['class'] = "nodeDeleted";
        if ($get(obj.id))
            $get(obj.id).classList.add("nodeDeleted");
        if ($get(obj.id + "_anchor"))
            $get(obj.id + "_anchor").classList.add("nodeDeleted");
    }
}
function getChangeNodeMsg(treeID, objID, objType) {
    var msg = "";
    switch (objType.toUpperCase()) {
        case "TEAM": return 'בוצע שינוי בצוות - האם לצאת ללא שמירה ?';
        case "PROBLEM": return 'בוצע שינוי במקור - האם לצאת ללא שמירה ?';
        case "PRESERVE": return 'בוצע שינוי בהליך שימור - האם לצאת ללא שמירה ?';
        default: return 'בוצעו שינויים - האם לצאת ללא שמירה';
    }
}
function checkClearSelectionNode(treeID, objID, objType) {
    if ($get("commonCtl_nodeDataChanged").value == "1") {
        var funcAfterYes = "clearSelectedNode('" + treeID + "','" + objID + "')";
        var funcAfterNo = "backToSelectedNode('" + treeID + "','" + objID + "')";
        var msg = getChangeNodeMsg(treeID, objID, objType);
        openMsg(msg, 2, funcAfterYes, funcAfterNo);
    }
    else if ($get("commonCtl_nodeDataChanged").value == "2") {
        if (!(checkExtraFieldsMust() && ((typeof checkSpecialExtraFields == 'undefined') || (typeof checkSpecialExtraFields != 'undefined' && checkSpecialExtraFields()))))
            backToSelectedNode(treeID,objID);
        else
            clearSelectedNode(treeID, objID);
    }
    else
        clearSelectedNode(treeID, objID);
}
function backToSelectedNode(treeID,objID)
{
    objID = objID.replace("_anchor", "");
    if (treeID.indexOf("other") < 0) { ///if select is on other tree - no action needed
        var selectedNode = $get("commonCtl_selectedNode").value;
        var selector = $("#" + treeID)[0];
        //if ($(selector).jstree("get_selected", true).length>0)
        //   $("#" + treeID).jstree("deselect_node", $(selector).jstree("get_selected", true)[0]).trigger("deselect_node.jstree");
        //$("#" + treeID).jstree(true).deselect_all();
        $("#" + treeID).jstree("deselect_node", $.jstree.reference(selector)._model.data[objID]).trigger("deselect_node.jstree");
        $("#" + treeID).jstree("select_node", $.jstree.reference(selector)._model.data[selectedNode]).trigger("select_node.jstree");
    }
    return false;
}
function clearSelectedNode(treeID, objID) {
    $get("commonCtl_nodeDataChanged").value = "0";
    $get("commonCtl_selectedNode").value = "";
    $get("ExtraFields").style.display = "none";
    if (treeID == 'centerTeamTree')
        clearTeamNode();
    if (treeID == 'centerProblemPreserveTree')
        clearPreserveProblemNode();
    return true;
}
function deselectAllNodes(treeID) {
    $("#" + treeID).jstree(true).deselect_all();
}
function selectNode(treeID, objId) {
    var selector = $("#" + treeID)[0];
    $("#" + treeID).jstree("select_node", $.jstree.reference(selector)._model.data[objId]).trigger("select_node.jstree");
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
function show_tree(treeID, json_data, types, search, dnd, plugins,openAll) {
    try {
        treeID = "#" + treeID;
        $(treeID).jstree("destroy");
        if (treeID.indexOf("other") > -1) {
            $(treeID).jstree({
                "core": {
                    "check_callback": function (op, node, par, pos, more) {
                        return true;
                    },
                    "data": json_data
                },
                "types": types,
                'search': search,
                'dnd': dnd,
                "plugins": plugins
            });

            $('#fldSearchValues').keyup(function () {
                $(treeID).jstree(true).show_all();
                $(treeID).jstree('search', $(this).val());
            });
        }
        else {
            $(treeID).jstree({
                "core": {
                    "check_callback": function (op, node, par, pos, more) {
                        if (more) {///Allows Reorder Of Nodes Where always_copy = true;
                            var alwaysCopyFlag = typeof centerTreeDND['always_copy'] == "undefined" || centerTreeDND['always_copy'] == false ? false : true;
                            more.origin.settings.dnd.always_copy = alwaysCopyFlag;
                            if (par.type == "#" && alwaysCopyFlag)
                                more.origin.settings.dnd.always_copy = false;
                            if (par.type != "#" && node.parent == par.id && alwaysCopyFlag)
                                more.origin.settings.dnd.always_copy = false;
                        }
                        return true;
                    },
                    "data": json_data
                },
                "types": types,
                "plugins": plugins,
                'dnd': dnd
            });
            if (openAll)
                $(treeID).on('ready.jstree', function () {
                    $(treeID).jstree("open_all");
                });
        }
    }
    catch (e) {
        openMsg("שגיאה בטעינת נתונים", 1);
        top.status = "Error In show_tree:" + e.message.toString();
    }
}
function getTargetEnv() {
    var targetEnv = '';
    $("#fldTargetEnv input[type=checkbox]:checked").each(function () {
        var currentValue = $(this).val();
        if (currentValue != '')
            targetEnv += currentValue + ",";
    });
    return targetEnv;
}
function checkMngMustFields()
{
    if ($get("fldMngNote").value == '') {
        $get("fldMngNote").style.backgroundColor = 'red';
        openMsg('חובה להזין הערה ל- MNG', 1)
        return false;
    }
    var targetEnv = getTargetEnv();
    if (targetEnv == '') {
        $get("fldMngNote").style.backgroundColor = '';
        $get("fldTargetEnv").style.border = 'solid 2px red';
        openMsg('חובה לבחור סביבת MNG', 1)
        return false;
    }
    $get("fldTargetEnv").style.border = '';
    $get("fldMngNote").style.backgroundColor = '';
    if ($get("commonCtl_treeDataChanged").value == "0") {
        openMsg('לא בוצעו שינויים לשמירה', 1)
        return false;
    }
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
    if ($get("commonCtl_nodeDataChanged").value != "0") {
        if (checkExtraFieldsMust() && ((typeof checkSpecialExtraFields == 'undefined') || (typeof checkSpecialExtraFields != 'undefined' && checkSpecialExtraFields()))) {
            var obj = $(treeID).jstree("get_selected", true);
            //Example: var newData = '{"fldSekerID":"1","fldTeamTorType":"2"}';
            var newData = getJsonDataFromFields('fstExtraFields');
            var data = '{' + newData + '}';
            if (obj[0].data) {
                obj[0].data.pop();
                obj[0].data.push(data);
            }
            else
                obj[0].data = JSON.stringify(data);
            dataChanged(0);
            $(treeID).jstree(true).setChangedNode(obj[0].id);
            if (obj[0].type == "preserve")
                propogateNodeData(treeID, obj[0].id, data);
            if (JSON.parse(obj[0].data).fldDisplayAdd)
            {
                if (obj[0].type == "preserve")
                    setDisplayedNodes($(treeID).jstree(true), obj[0], 1);
                else
                    setDisplayedNodes($(treeID).jstree(true), obj[0], 0);
            }           
        }
    }
    else
        clearSelectedNode(treeID, obj[0].id);
}
function propogateNodeData(treeID,objId,data)
{
    var idPrefix = objId.substring(0, objId.indexOf('*'));
    var parentsArray = $(treeID).jstree(true)._model.data['#'].children;
    for (var i = 0; i < parentsArray.length; i++) {
        var parentExt = '*' + parentsArray[i].substr(parentsArray[i].indexOf('_') + 1);
        var searchID = idPrefix + parentExt;
        var objSearch = $(treeID).jstree(true).get_node(searchID);
        if (objSearch && objSearch.id != objId) {
            objSearch.data.pop();
            objSearch.data.push(data);
            $(treeID).jstree(true).setChangedNode(objSearch.id);
        }
    }
}
function dataChanged(change) {
    $get("commonCtl_nodeDataChanged").value = change;
}
function getJsonDataFromFields(fieldSetID) {
    var data = bnft_getJSON($get(fieldSetID));
    return data;
}
function setJsonDataToFields(obj,fromNew,treeID) {
    //Exa    
    var jsonData = obj.data;
    var fields = JSON.parse(jsonData);
    if (obj.type != "dep") {
        $get("commonCtl_selectedNode").value = obj.id;
        $get("ExtraFields").style.display = "";
        $get("lblExtraDetailsSpec").innerText = obj.text;
        if ("team,dep".indexOf(obj.type) < 0)
            dispEditFields(obj.type);  //Every Frm Must have this function
        if ($get("trID") && $get("trID").style.display == "")//fieldID
        {
            if (obj.id.search(/j\d/i) > -1)
            {
                $get("fldFieldID").disabled = false;
            }
            else
            {
                var fieldID;
                if ((obj.id.indexOf('*') > 0))
                    fieldID = obj.id.substr(obj.id.indexOf('_') + 1, obj.id.indexOf('*') - obj.id.indexOf('_') - 1);
                else
                    fieldID = obj.id.substr(obj.id.indexOf('_')+1,obj.id.length-1);
                $get("fldFieldID").value = fieldID;
                $get("fldFieldID").disabled = true;
            }
        }
    }
    if (fromNew == 1) {
        dataChanged(2);
        deselectAllNodes(treeID);
        selectNode(treeID,obj.id);
    }
    if (fields && Object.keys(fields).length > 0) {
        var keys = Object.keys(fields);
        for (var i = 0, emp; i < keys.length; i++) {
            var field = $get(keys[i]);
            if (field)
                if (field.type == "checkbox") {
                    if (fields[keys[i]] == "1")
                        field.checked = true;
                }
                else {
                    if (fields[keys[i]] == "0")
                        field.value = "";
                    else
                        field.value = fields[keys[i]];
                }
        }
    }
}
function setExtraDataDiv(obj) {
    $get("commonCtl_selectedDataNode").value = obj.id;
    var srch = '';
    srch = getFldJSONsrch(srch, 'fldSourceEnv', $get("fldSourceEnv").value, 'string');
    srch = getFldJSONsrch(srch, 'fldNode', obj.id, 'string');
    srch = getFldJSONsrch(srch, 'fldNodeText', obj.text, 'string');
    var data = getJQAJAX("srvHarel.asmx/getNodeExtraData", '{' + srch + '}', false, 1);
    if (data && data.data && data.data.length == 1) {
        var html = data.data[0].fldHTML;
        if (html != '')
        {
            $get("divExtraData").style.display = '';
            $get("divExtraData").innerHTML = html;
        }
        else
        {
            $get("divExtraData").style.display = 'none';
            $get("divExtraData").innerHTML = '';
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
function bnft_getFldJSON(sFld, sVal) {
    if (sVal.toString().length == 0)
        return '';
    else {
        if (sVal== true)
            sVal = "1";
        if (sVal == false)
            sVal = "0";
        return '"' + sFld + '":' + JSON.stringify(sVal);
    }
}
function bnft_getJSON(el) {
    if (typeof el === 'undefined' || typeof el.tagName === 'undefined')
        return "";
    var srch = "";
    var fld;
    var fldJson;
    var fields = el.getElementsByClassName('fldTable');
    if (fields && fields.length > 0) {
        for (var i = 0; i < fields.length; i++) {
            fld = fields[i];
            fldJson = '';
            if (fld.parentElement.parentElement && fld.parentElement.parentElement.style.display == "") {
                switch (fld.tagName.toUpperCase()) {
                    case 'INPUT':
                    case 'SELECT': fldJson = bnft_getFldJSON(fld.id, fld.value);
                                   break;
                    case 'SPAN': if (fld.firstChild.type.toUpperCase() == "CHECKBOX")
                        fldJson = bnft_getFldJSON(fld.firstChild.id, fld.firstChild.checked);
                                 break;
                }
            }
            if (fldJson!='')
                srch +=  srch=="" ? fldJson : ',' + fldJson;
        }
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

    var selectedNode = $get("commonCtl_selectedNode").value;
    if (selectedNode != '')
        return true;
    if ($('#rblScreenMode')[0]) {
        var checked = $('input[type=radio]:checked', '#rblScreenMode').val();
        if (checked == "DeprCenterMode" && "dep" == objType)
            return true;
        if (checked == "DeprTeamMode" && "dep" == objType && action == "remove_center")
            return true;
    }
    if ("center" == objType && action != "remove_center")
        return true;
    if (("team,preserve".indexOf(objType)>-1) && (action == "create" || action == "create_root" || action == "remove_center"))
        return true;
    if (("preserve" == objType) && (action == "create" || action == "create_root"))
        return true;
    if (("problem" == objType) && (action == "remove_center"))
        return true;
    if ((objType == "dep") && (action == "editData"))
        return true;
    if (("dep,problem,preserve,".indexOf(objType) < 0) && (action == "extraData"))
        return true;
    if (("dep,team,".indexOf(objType) > -1) && (action == "duplicate"))
        return true;
    return false;
}
function getContextMenuLabel(data, action) {
    var inst = $.jstree.reference(data.reference),
	obj = inst.get_node(data.reference);
    var objType = obj.type;
    if (("dep,team".indexOf(objType) > -1) && (action == "create"))
        return "צור צוות חדש";
    if (("dep,team".indexOf(objType) > -1) && (action == "create_root"))
        return "צור מחלקה חדשה";
    if (("problem,preserve".indexOf(objType) > -1) && (action == "create"))
        return "צור הליך חדש";
    if (("problem,preserve".indexOf(objType) > -1) && (action == "create_root"))
        return "צור מקור חדש";
    if (("dep,team,problem,preserve,center".indexOf(objType) > -1) && (action == "remove_center"))
    {
        if (obj.data && obj.data.toString().indexOf("fldRemove") > -1)
            return "החזר קישור למוקד";
        else
            return "מחק קישור למוקד";
    }
    if (action == "duplicate")
        return "שכפל";
    return "חדש";
}
function getNewNodeText(type) {
    switch (type) {
        case 'team':
            return "צוות חדש";
            break;
        case 'dep':
            return "מחלקה חדשה";
            break;
        case 'problem':
            return "מקור חדש";
            break;
        case 'preserve':
            return "הליך חדש";
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
function reloadDepatmentCombo() {
    if ($get("fldSourceEnv").value != '') {
        var srch = 'fldSourceEnv=';
        srch = srch + $get("fldSourceEnv").value;
        reloadCombo("frmMngTeams", "fldSrchDepartmentID", srch);
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
function menuChangePage(url)
{
    if ($get("commonCtl_treeDataChanged") && $get("commonCtl_treeDataChanged").value == "1")
        openMsg('בוצעו שינויים בדף - האם לצאת ללא שמירה ?', 2, 'menuMoveToPage("'+url+'")');
    else 
        menuMoveToPage(url)
}
function menuMoveToPage(url) {
    window.location.replace(url);
}
function checkExtraFieldsMust() {
    var fields = $get('fstExtraFields').getElementsByClassName('must');
    var checkMust = true;
    if (fields && fields.length > 0)
    {
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].parentElement.parentElement && fields[i].parentElement.parentElement.style.display == "")//Check if the tr is displayed
            {
                if (fields[i].tagName.toUpperCase() == "INPUT")
                {
                    if (fields[i].value == "") {
                        fields[i].style.backgroundColor = 'red';
                        openMsg('שדה חובה', 1)
                        checkMust = false;
                    }
                    else
                        fields[i].style.backgroundColor = '';
                }
                if (fields[i].tagName.toUpperCase() == "SELECT") {
                    if (fields[i].selectedIndex <= 0) {
                        fields[i].style.backgroundColor = 'red';
                        openMsg('שדה חובה', 1)
                        checkMust = false;
                    }
                    else
                        fields[i].style.backgroundColor = '';
                }
            }
        }
        return checkMust;
    }
    return checkMust;
}
function checkIsNumbersSequence(field) {
    if (field.value == "")
        return true;
    var flag = true;
    var valuesArray = field.value.trim().split(",");
    for (i = 0; i < valuesArray.length; i++) {
        var num = valuesArray[i].trim();
        if (num == '0' || num =='') {
            flag = false;
            break;
        }
    }
    if (!flag)
    {
        field.style.backgroundColor = 'red';
        openMsg('השדה חייב להיות בפורמט של מספר או מספרים המופרדים ב , ', 1);
       
    }
    else
        field.style.backgroundColor = '';
    return false;
}