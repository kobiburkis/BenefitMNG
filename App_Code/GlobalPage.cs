using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
/// <summary>
/// Summary description for GlobalPage
/// </summary>
public partial class GlobalPage : System.Web.UI.Page
{
    protected string connectionString;
    protected string environment;
    public GlobalPage()
    {
        connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MySQLServer"].ConnectionString;
        environment = System.Configuration.ConfigurationManager.AppSettings["Env"];
    }
    bool isAJAXFrm(string frmName)
    {
        switch (frmName)
        {
            case "frmCombo":
            case "frmGrid":
                return true;
        }
        return false;
    }
    string environmentFlag(string env)
    {
        switch (env)
        {
            case "1":
                return environment =="Local" ? "PreProdStatus" : "ws01_t_Status";
            case "2":
                return "db02_t_Status";
            case "3":
                return "bnSqlCluster";
        }
        return environment == "Local" ? "PreProdStatus" : "ws01_t_Status";
    }
    string environmentValue()
    {
        string sourceEnv = "1";
        if (!string.IsNullOrEmpty(Request.Form["sFrm"]))
        {
            if (!string.IsNullOrEmpty(Request.Form["fldSourceEnv"]))
                sourceEnv = Request.Form["fldSourceEnv"];
        }
        else
        {
            DropDownList fldSourceEnv = (DropDownList)Form.FindControl("fldSourceEnv");
            if (fldSourceEnv != null && fldSourceEnv.SelectedValue != string.Empty)
                sourceEnv = fldSourceEnv.SelectedValue;
        }
        return sourceEnv;
    }
    public void LoadCenters(DropDownList ctl)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable centers = new DataTable();
                using (var cmd = new SqlCommand("BenefitMng.dbo.usp_Mng_getComboValues", con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    string sourceEnv = environmentValue();
                    SqlParameter p = new SqlParameter("@fldSourceEnv", sourceEnv);
                    cmd.Parameters.Add(p);
                    p = new SqlParameter("@fldComboValues", "Centers");
                    cmd.Parameters.Add(p);
                    da.Fill(centers);
                }

                ctl.DataSource = centers;
                ctl.DataTextField = "fldCenterDesc";
                ctl.DataValueField = "fldCenterID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void LoadDepartments(DropDownList ctl)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable deps = new DataTable();
                using (var cmd = new SqlCommand("BenefitMng.dbo.usp_Mng_getComboValues", con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    string sourceEnv = environmentValue();
                    SqlParameter p = new SqlParameter("@fldSourceEnv", sourceEnv);
                    cmd.Parameters.Add(p);
                    p = new SqlParameter("@fldComboValues", "Deps");
                    cmd.Parameters.Add(p);
                    da.Fill(deps);
                }

                ctl.DataSource = deps;
                ctl.DataTextField = "fldDepartment";
                ctl.DataValueField = "fldDepartmentID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void LoadEnvironments(DropDownList ctl)
    {
        //ctl.Items.Insert((0, new ListItem("", "0"));
        ctl.Items.Insert(0, new ListItem("טסט", "1"));
        ctl.Items.Insert(1, new ListItem("פרה-פרוד", "2"));
        ctl.Items.Insert(2, new ListItem("ייצור", "3"));
    }
    public void LoadEnvironments(CheckBoxList ctl)
    {
        //ctl.Items.Insert((0, new ListItem("", "0"));
        ctl.Items.Insert(0, new ListItem("טסט", "1"));
        ctl.Items[0].Attributes["class"] = "lbl";
        ctl.Items.Insert(1, new ListItem("פרה-פרוד", "2"));
        ctl.Items[1].Attributes["class"] = "lbl";
        ctl.Items.Insert(2, new ListItem("ייצור", "3"));
        ctl.Items[2].Attributes["class"] = "lbl";
    }
    public void loadExcelTypes(DropDownList ctl)
    {
        ctl.Items.Insert(0, new ListItem("", "0"));
        ctl.Items.Insert(1, new ListItem("קליטת הודעות לקוח", "1"));
        ctl.Items.Insert(2, new ListItem("קליטת הודעות סוכנים", "2"));
        ctl.Items.Insert(3, new ListItem("קליטת תהליכים", "3"));
        ctl.Items.Insert(4, new ListItem("קליטת פניות לעדכון", "4"));
        ctl.Items.Insert(5, new ListItem("קליטת פניות למחיקה", "5"));
    }
    public void loadCenterTypes(DropDownList ctl)
    {
        ctl.Items.Insert(0, new ListItem("שירות", "0"));
        ctl.Items.Insert(1, new ListItem("שימור", "1"));
    }
    public void loadTorTypes(DropDownList ctl)
    {
        ctl.Items.Insert(0, new ListItem("", "0"));
        ctl.Items.Insert(1, new ListItem("משתמשים וירטואלים בלבד", "1"));
        ctl.Items.Insert(2, new ListItem("כל המשתמשים בצוות", "2"));
    }
    public void loadDoctorSourceID(DropDownList ctl)
    {
        ctl.Items.Insert(0, new ListItem("", "0"));
        ctl.Items.Insert(1, new ListItem("לקוחות", "1"));
        ctl.Items.Insert(2, new ListItem("משתמשים", "2"));
    }
    public void loadTigmulID(DropDownList ctl)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string tableID = "46";
                string query = "select fldValueID,fldValueDesc from BenefitMng.dbo.Mng_tblTables ";
                string where = "where fldValueID>0 and fldTableID = " + tableID + " and " + flag + " = 'D' ";
                query = query + where;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }
                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadPreserveTypeMrkzID(DropDownList ctl)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string tableID = "21";
                string query = "select fldValueID,fldValueDesc from BenefitMng.dbo.Mng_tblTables ";
                string where = "where fldValueID>0 and fldTableID = " + tableID + " and " + flag + " = 'D' order by fldValueDesc ";
                query = query + where;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadProblemID(DropDownList ctl,string fldCenterID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select pr.fldValueID as fldValueID ,pr.fldValueDesc as fldValueDesc ";
                string tables = " from benefitMng.dbo.Mng_tblProblemSub ps inner join benefitMng.dbo.Mng_tblCenterProblemSub c";
                tables += " on ps.fldProblemSubID = c.fldProblemSubID inner join benefitMng.dbo.Mng_tblTables pr ";
                tables += " on pr.fldTableID = 7 and pr.fldValueID = ps.fldProblemID and ps.fldProblemID = c.fldProblemID";
                string where = " where c.fldCenterID = " + fldCenterID + " and c.fldDisplayOnAdd>=1 and pr." + flag + " = 'D' and ps." + flag + " = 'D'";
                where += " and c." + flag + " = 'D'";
                string orderBy = " order by pr.fldValueDesc ";
                string groupBy = " group by pr.fldValueID, pr.fldValueDesc ";
                string query = select + tables + where + groupBy + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadProblemSubID(DropDownList ctl, string fldCenterID, string fldProblemID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select ps.fldProblemSubID as fldProblemSubID ,ps.fldProblemSub as fldProblemSub ";
                string tables = " from benefitMng.dbo.Mng_tblProblemSub ps inner join benefitMng.dbo.Mng_tblCenterProblemSub c ";
                tables += " on ps.fldProblemID=c.fldProblemID and ps.fldProblemSubID=c.fldProblemSubID ";
                string where = " where c.fldCenterID = " + fldCenterID + " and c.fldProblemID = "+ fldProblemID+" and c.fldDisplayOnAdd>=1 and c." + flag + " = 'D' and ps." + flag + " = 'D'";
                string orderBy = " order by ps.fldProblemSub ";
                string query = select + tables + where + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldProblemSub";
                ctl.DataValueField = "fldProblemSubID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadProblemDescID(DropDownList ctl, string fldCenterID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select fldValueID,fldValueDesc ";
                string tables = " from benefitMng.dbo.Mng_tblTables t inner join benefitMng.dbo.Mng_tblCenterProblemDesc c ";
                tables += " on fldValueID = fldProblemDescID ";
                string where = " where c.fldCenterID = " + fldCenterID + " and fldTableID=12 and c.fldDisplayOnAdd>=1 and t." + flag + " = 'D' and c." + flag + " = 'D'";
                string orderBy = " order by c.fldOrderID,fldValueOrderID,fldValueDesc ";
                string query = select + tables + where + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadPreservProcID(DropDownList ctl, string fldCenterID, string fldProblemDescID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select p.fldPreserveTypeID as fldPreserveTypeID,fldPreserveTypeDesc ";
                string tables = " from benefitMng.dbo.Mng_tblCenterPreserveType c inner join benefitMng.dbo.Mng_tblPreserveType p ";
                tables += " on c.fldPreserveTypeID=p.fldPreserveTypeID inner join benefitMng.dbo.Mng_tblPreserveTypeProblemDesc link ";
                tables += " on p.fldPreserveTypeID= link.fldPreserveTypeID ";
                string where = " where c.fldCenterID = " + fldCenterID + " and link.fldProblemDescID = " + fldProblemDescID + " and p.fldDisplayAdd>=1 and c." + flag + " = 'D' and p." + flag + " = 'D'";
                where += " and link." + flag + " = 'D'";
                string orderBy = " order by c.fldOrderID,fldPreserveTypeDesc ";
                string groupBy = " group by p.fldPreserveTypeID,fldPreserveTypeDesc,c.fldOrderID,c.fldCenterID ";
                string query = select + tables + where + groupBy + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldPreserveTypeDesc";
                ctl.DataValueField = "fldPreserveTypeID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadFixTypeID(DropDownList ctl, string fldCenterID, string fldPreservProcID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select fldValueID,fldValueDesc ";
                string tables = " from benefitMng.dbo.Mng_tblTables t inner join  benefitMng.dbo.Mng_tblCenterFixTypeID  p on t.fldValueID = p.fldFixTypeID ";
                string where = " where t.fldTableID = 113 and p.fldCenterID = " + fldCenterID + " and p.fldDisplayOnAdd>=1 and t." + flag + " = 'D' and p." + flag + " = 'D'";
                where += " and (p.fldPreservProcID = " + fldPreservProcID+ " or p.fldPreservProcID = 0 ) ";
                string orderBy = " order by p.fldOrderID,fldValueOrderID,fldValueDesc ";
                string groupBy = " group by fldValueID,p.fldOrderID,fldValueOrderID,fldValueDesc ";
                string query = select + tables + where + groupBy + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
    public void loadResultDiklaID(DropDownList ctl, string fldCenterID, string fldPreservProcID, string fldFixTypeID)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable dt = new DataTable();
                string sourceEnv = environmentValue();
                string flag = environmentFlag(sourceEnv);
                string select = "select fldValueID,fldValueDesc ";
                string tables = " from benefitMng.dbo.Mng_tblTables t inner join  benefitMng.dbo.Mng_tblCenterResultDikla  p on t.fldValueID = p.fldResultDiklaID ";
                string where = " where t.fldTableID = 40 and p.fldCenterID = " + fldCenterID + " and p.fldDisplayOnAdd>=1 and t." + flag + " = 'D' and p." + flag + " = 'D'";
                where += " and (p.fldPreservProcID = " + fldPreservProcID + " or p.fldPreservProcID = 0 )";
                where += " and (p.fldFixTypeID = " + fldFixTypeID + " or p.fldFixTypeID = 0 )";
                string orderBy = " order by p.fldOrderID,fldValueOrderID,fldValueDesc ";
                string groupBy = " group by fldValueID,p.fldOrderID,fldValueOrderID,fldValueDesc ";
                string query = select + tables + where + groupBy + orderBy;
                con.Open();
                using (var cmd = new SqlCommand(query, con))
                {
                    dt.Load(cmd.ExecuteReader());
                }

                ctl.DataSource = dt;
                ctl.DataTextField = "fldValueDesc";
                ctl.DataValueField = "fldValueID";
                ctl.DataBind();
                ctl.Items.Insert(0, new ListItem("", "0"));
            }
            catch (Exception ex)
            {
                // Handle the error
            }
        }
    }
}