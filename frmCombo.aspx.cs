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
            if (comboName == "fldProblemID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                loadProblemID(combo, fldCenterID);
            }
            if (comboName == "fldProblemSubID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                string fldProblemID = Request.Form["fldProblemID"];
                loadProblemSubID(combo, fldCenterID, fldProblemID);
            }
            if (comboName == "fldProblemDescID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                loadProblemDescID(combo, fldCenterID);
            }
            if (comboName == "fldPreservProcID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                string fldProblemDescID = Request.Form["fldProblemDescID"];
                loadPreservProcID(combo, fldCenterID, fldProblemDescID);
            }
            if (comboName == "fldFixTypeID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                string fldPreservProcID = Request.Form["fldPreservProcID"];
                loadFixTypeID(combo, fldCenterID, fldPreservProcID);
            }
            if (comboName == "fldResultDiklaID")
            {
                string fldCenterID = Request.Form["fldCenterID"];
                string fldPreservProcID = Request.Form["fldPreservProcID"];
                string fldFixTypeID = Request.Form["fldFixTypeID"];
                loadResultDiklaID(combo, fldCenterID, fldPreservProcID, fldFixTypeID);
            }
            combo.ID = Request.Form["combo"];
        }
        //Response.Write(combo.Items);
    }
}