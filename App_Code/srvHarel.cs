using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for srvHarel
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class srvHarel : System.Web.Services.WebService
{

    public srvHarel()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    public DataSet execSP(DataSet ds, string tblDTName, string spName, params SqlParameter[] spParams)
    {
        try
        {
            DataTable table = new DataTable();
            table.TableName = tblDTName;
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MySQLServer"].ConnectionString))
            using (var cmd = new SqlCommand(spName, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                foreach (SqlParameter p in spParams)
                {
                    cmd.Parameters.Add(p);
                }
                da.Fill(table);
                ds.Tables.Add(table);
            }
            return ds;
        }
        catch (Exception ex)
        {
            DataTable table = new DataTable();
            table.TableName = "err";
            table.Columns.Add("ErrorNumber");
            table.Columns.Add("ErrorMsg");
            table.Rows.Add(ex.HResult, ex.Message);
            ds.Tables.Add(table);
            return ds;
        }

    }
    [WebMethod(EnableSession = true)]
    public string getNodeExtraData(string fldNode, string fldSourceEnv, string fldNodeText, string fldIsSrv)
    {
        DataSet ds = new DataSet();
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_getNodeExtraData",
                new SqlParameter("@fldSourceEnv", fldSourceEnv),
                new SqlParameter("@fldNodeText", fldNodeText),
                new SqlParameter("@fldNode", fldNode),
                new SqlParameter("@fldIsSrv", fldIsSrv)
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }
    [WebMethod(EnableSession = true)]
    public string getCenterType(string fldCenterID)
    {
        DataSet ds = new DataSet();
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_getCenterType",
                new SqlParameter("@fldCenterID", fldCenterID)
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }
    #region DepartmentsTeams
    [WebMethod(EnableSession = true)]
    public string departmentsData(string fldDepartmentID, string fldSourceEnv, string fldScreenMode, int fldOtherTeams)
    {
        DataSet ds = new DataSet();
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_getDepartmentDetails",
                new SqlParameter("@fldDepartmentID", fldDepartmentID),
                new SqlParameter("@fldSourceEnv", fldSourceEnv),
                new SqlParameter("@fldScreenMode", fldScreenMode),
                new SqlParameter("@fldOtherTeams", fldOtherTeams)
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }
    [WebMethod(EnableSession = true)]
    public string updateDeprTeamTree(int fldDepartmentID, string fldScreenMode, string fldTargetEnv, string fldMngNote, string doc)
    {
        DataSet ds = new DataSet();
        DataTable dt = (DataTable)JsonConvert.DeserializeObject(doc, (typeof(DataTable)));
        SqlParameter DataTblParam = new SqlParameter("@tblDepTeams", SqlDbType.Structured);
        DataTblParam.Value = dt;
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_saveDepartmentsTeamsTree",
                new SqlParameter("@fldDepartmentID", fldDepartmentID),
                new SqlParameter("@fldScreenMode", fldScreenMode),
                new SqlParameter("@fldTargetEnv", fldTargetEnv),
                new SqlParameter("@fldMngNote", fldMngNote),
                DataTblParam
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }

    #endregion
    #region ProblemPreserve
    [WebMethod(EnableSession = true)]
    public string getProblemPreserveData(string fldCenterID, string fldSourceEnv, int fldOtherValues)
    {
        DataSet ds = new DataSet();
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_getProblemPreserveDetails",
                new SqlParameter("@fldCenterID", fldCenterID),
                new SqlParameter("@fldSourceEnv", fldSourceEnv),
                new SqlParameter("@fldOtherValues", fldOtherValues)
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }
    [WebMethod(EnableSession = true)]
    public string updateProblemPreserveTree(int fldCenterID, string fldTargetEnv, string fldMngNote, string doc)
    {
        DataSet ds = new DataSet();
        DataTable dt = (DataTable)JsonConvert.DeserializeObject(doc, (typeof(DataTable)));
        SqlParameter DataTblParam = new SqlParameter("@tblProbPreserve", SqlDbType.Structured);
        DataTblParam.Value = dt;
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_saveProblemPreserveTree",
                new SqlParameter("@fldCenterID", fldCenterID),
                new SqlParameter("@fldTargetEnv", fldTargetEnv),
                new SqlParameter("@fldMngNote", fldMngNote),
                DataTblParam
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }

    #endregion
    #region FixDesc
    [WebMethod(EnableSession = true)]
    public string getFixDescData(string fldCenterID, string fldSourceEnv, int fldOtherValues, string fldProblemID, string fldProblemSubID, 
        string fldProblemDescID,string fldPreservProcID,string fldFixTypeID, string fldResultDiklaID, string fldIsSrv)
    { 
      DataSet ds = new DataSet();
        try
        {
            ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_getFixDesc",
                new SqlParameter("@fldCenterID", fldCenterID),
                new SqlParameter("@fldSourceEnv", fldSourceEnv),
                new SqlParameter("@fldOtherValues", fldOtherValues),
                new SqlParameter("@fldProblemID", fldProblemID),
                new SqlParameter("@fldProblemSubID", fldProblemSubID),
                new SqlParameter("@fldProblemDescID", fldProblemDescID),
                new SqlParameter("@fldPreservProcID", fldPreservProcID),
                new SqlParameter("@fldFixTypeID", fldFixTypeID),
                new SqlParameter("@fldResultDiklaID", fldResultDiklaID),
                new SqlParameter("@fldIsSrv", fldIsSrv)
                );
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //log(ex, null);
            return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
        }
    }
    [WebMethod(EnableSession = true)]
    public string updateFixDescTree(int fldCenterID, string fldTargetEnv, string fldMngNote, string doc, string fldProblemID, string fldProblemSubID,
       string fldProblemDescID, string fldPreservProcID, string fldFixTypeID, string fldResultDiklaID, string fldIsSrv)
    {
        {
            DataSet ds = new DataSet();
            DataTable dt = (DataTable)JsonConvert.DeserializeObject(doc, (typeof(DataTable)));
            SqlParameter DataTblParam = new SqlParameter("@tblFixDesc", SqlDbType.Structured);
            DataTblParam.Value = dt;
            try
            {
                ds = execSP(ds, "data", "BenefitMng.dbo.usp_Mng_saveFixDescTree",
                    new SqlParameter("@fldCenterID", fldCenterID),
                    new SqlParameter("@fldTargetEnv", fldTargetEnv),
                    new SqlParameter("@fldMngNote", fldMngNote),
                    new SqlParameter("@fldProblemID", fldProblemID),
                    new SqlParameter("@fldProblemSubID", fldProblemSubID),
                    new SqlParameter("@fldProblemDescID", fldProblemDescID),
                    new SqlParameter("@fldPreservProcID", fldPreservProcID),
                    new SqlParameter("@fldFixTypeID", fldFixTypeID),
                    new SqlParameter("@fldResultDiklaID", fldResultDiklaID),
                    new SqlParameter("@fldIsSrv", fldIsSrv),
                    DataTblParam
                    );
                return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
            }
            catch (Exception ex)
            {
                //log(ex, null);
                return Newtonsoft.Json.JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented);
            }
        }
    }
            #endregion
}
