﻿using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

public partial class frmMngTeams : GlobalPage
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        
        LoadCenters(fldSrchCenterID);
        LoadEnvironments(fldTargetEnv);
        LoadEnvironments(fldSourceEnv);
        loadTorTypes(fldTeamTorType);
    }

  
    
}