function displayNeededFields() {
    var selectedType = $('fldImportExcelTypeID').find(":selected").text();
    if (selectedType.indexOf('פניות') > -1)
        $get("trCenterType").style.dispaly = '';
    else
        $get("trCenterType").style.dispaly = 'none';
}
