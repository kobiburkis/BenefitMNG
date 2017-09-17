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
        if (!Page.IsPostBack)
        {
            LoadEnvironments(fldSourceEnv);
            loadExcelTypes(fldImportExcelTypeID);
            loadCenterTypes(fldCenterTypeID);
            filesFolder.Value = "\\\\SERVER2012\\ImportExcel\\";
        }
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        // Before attempting to save the file, verify
        // that the FileUpload control contains a file.
        if (Upload.HasFile)
            // Call a helper method routine to save the file.
            SaveFile(Upload.PostedFile);   
    }

    void SaveFile(HttpPostedFile file)
    {
        // Specify the path to save the uploaded file to.
        string savePath = "\\\\SERVER2012\\ImportExcel\\";

        // Get the name of the file to upload.
        string fileName = Upload.FileName;

        // Create the path and file name to check for duplicates.
        string pathToCheck = savePath + fileName;

        // Create a temporary file name to use for checking duplicates.
        string tempfileName = "";

        // Check to see if a file already exists with the
        // same name as the file to upload.        
        if (System.IO.File.Exists(pathToCheck))
        {
            int counter = 2;
            while (System.IO.File.Exists(pathToCheck))
            {
                // if a file with this name already exists,
                // prefix the filename with a number.
                tempfileName = counter.ToString() + fileName;
                pathToCheck = savePath + tempfileName;
                counter++;
            }

            fileName = tempfileName;

           
        }
        else
        {
  
        }

        // Append the name of the file to upload to the path.
        savePath += fileName;

        // Call the SaveAs method to save the uploaded
        // file to the specified directory.
        Upload.SaveAs(savePath);

    }
}