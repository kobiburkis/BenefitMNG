using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmMngFixDesc : GlobalPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadEnvironments(fldTargetEnv);
        LoadEnvironments(fldSourceEnv);
        LoadCenters(fldSrchCenterID);
    }
}