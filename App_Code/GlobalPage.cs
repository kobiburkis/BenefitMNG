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
    public GlobalPage()
    {
        connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MySQLServer"].ConnectionString;
    }
    public void LoadCenters(DropDownList ctl)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            try
            {
                DataTable centers = new DataTable();
                SqlDataAdapter adapter = new SqlDataAdapter("SELECT fldCenterID, fldCenterDesc FROM BenefitInput.dbo.tblCenter", con);
                adapter.Fill(centers);

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
    public void LoadEnvironments(DropDownList ctl)
    {
        //ctl.Items.Insert((0, new ListItem("", "0"));
        ctl.Items.Insert(0, new ListItem("טסט", "1"));
        ctl.Items.Insert(1, new ListItem("פרה-פרוד", "2"));
        ctl.Items.Insert(2, new ListItem("ייצור", "3"));
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
}