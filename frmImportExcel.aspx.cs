using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmImportExcel : GlobalPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadEnvironments(fldSourceEnv);
        loadExcelTypes(fldImportExcelTypeID);
        loadCenterTypes(fldCenterTypeID);
        filesFolder.Value = "\\\\SERVER2012\\ImportExcel\\";
    }
}