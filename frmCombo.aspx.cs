using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmCombo : GlobalPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "text/xml";
        if (!string.IsNullOrEmpty(Request.Form["combo"]))
        {
            string comboName = Request.Form["combo"];
            if (comboName == "fldSrchCenterID")
                LoadCenters(combo);
            if (comboName == "fldSrchDepartmentID")
                LoadDepartments(combo);
            combo.ID = Request.Form["combo"];
        }
        //Response.Write(combo.Items);
    }
}