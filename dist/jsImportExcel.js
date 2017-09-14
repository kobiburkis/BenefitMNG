function displayNeededFields() {
    var selectedType = $('#fldImportExcelTypeID').find(":selected").text();
    if (selectedType.indexOf('פניות') > -1)
        $get("trCenterType").style.dispaly = '';
    else
        $get("trCenterType").style.dispaly = 'none';
}

function setChosenFile() {
    var selectedFile = $('#fldFileNamesList').find(":selected").text();
    if (selectedFile != '') {
        var folder = $get("filesFolder").value;
        selectedFile = folder + selectedFile;
        $get("fileChosen").value = selectedFile;
    }
    else
        $get("fileChosen").value = '';
}

function onLoad() {
    fillFileList();
}
function fillFileList() {
    var fso = null;
    try {
        doAddComboOption(form1.fldFileNamesList, '', '', true);
        var folder = $get("filesFolder").value;
        fso = new ActiveXObject("Scripting.FileSystemObject");
        var e = new Enumerator(fso.GetFolder(folder).Files);
        for (; !e.atEnd() ; e.moveNext()) {

            var sName = new String(e.item().name);

            switch (sName.substring(sName.length - 4, sName.length)) {
                case '.xls':
                case '.csv':
                    doAddComboOption(form1.fldFileNamesList, sName, sName, false);
                    break;
            }
            switch (sName.substring(sName.length - 5, sName.length)) {
                case '.xlsx':
                    doAddComboOption(form1.fldFileNamesList, sName, sName, false);
                    break;
            }
        }
        //if (form1.cmbFile.options.length == 0) {
        //    form1.cmbFile.style.display = 'none';
        //    lblMsg.innerText = "לא נמצאו קבצים";
        //} else {
        //    form1.cmbFile.size = (form1.cmbFile.options.length < 10) ? 10 : form1.cmbFile.options.length;
        //}
    } catch (e) {
        top.status = e.description;
        if (fso == null)
            openMsg('הדפדפן אינו תומך ברכיבי ActiveX', 1);
    }
}
function doAddComboOption(cmb, sID, sVal, bChecked) {
    var opt = new Option(sID, sVal);
    opt.value = sID;
    opt.text = sVal;
    cmb[cmb.length] = opt;
    opt.selected = bChecked;
}