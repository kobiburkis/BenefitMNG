<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmImportExcel.aspx.cs" EnableEventValidation="false" Inherits="frmImportExcel" %>
<%@ Register TagPrefix="bnft" TagName="Header" Src="Header.ascx" %>
<%@ Register TagPrefix="bnft" TagName="HeaderImports" Src="HeaderImports.ascx" %>
<!DOCTYPE html>

<html dir="rtl">
<head runat="server">
  <meta charset="utf-8">
  <title>ייבוא אקסל</title>
  <bnft:HeaderImports runat="server" />
  <script type="text/javascript" src="dist/jsImportExcel.js"></script>
</head>
<body onload="onLoad();">
    <bnft:Header runat="server" />
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <div>
      <div id="Div1">
        <table class="content-header">  
           <tr>  
               <td><asp:Label CssClass="page-ttl" runat="server" ID="lblTtl" Text="יבוא אקסל מערכתי"></asp:Label></td>
           </tr>
        </table>
       </div>
        <div runat="server" id="excelParams">
            <table>
                <tr>
                    <td><asp:Label CssClass="lbl" runat="server" ID="lblSourceEnv" Text="סביבת מקור:" /></td>
                    <td><asp:DropDownList id="fldSourceEnv" CssClass="fldTable" runat="server"></asp:DropDownList></td>
                </tr>
                <tr>
                    <td><asp:Label CssClass="lbl" runat="server" ID="lblImportExcelTypeID" Text="סוג קליטה:" /></td>
                    <td><asp:DropDownList id="fldImportExcelTypeID" Width="175px" CssClass="fldTable" runat="server" OnChange ="displayNeededFields();"></asp:DropDownList></td>
                </tr>
                <tr id="trCenterType" style="display:none">
                     <td><asp:Label CssClass="lbl" runat="server" ID="lblCenterTypeID" Text="סוג מוקד:" /></td>
                    <td><asp:DropDownList id="fldCenterTypeID" Width="175px" CssClass="fldTable" runat="server"></asp:DropDownList></td>
                </tr>
                <tr>
                   <td><asp:Label CssClass="lbl" runat="server" ID="lblFileName" Text="קובץ לקליטה:"/></td>
                   <td><asp:DropDownList id="fldFileNamesList" CssClass="fldTable" runat="server" Width="250px" OnChange ="setChosenFile();"></asp:DropDownList></td>                                            
                 </tr>
            </table>
            <asp:HiddenField runat="server" ID="filesFolder" />
            <asp:HiddenField runat="server" ID="fileChosen" Value="" />
                 
    <asp:FileUpload ID="Upload" runat="server" />
    <asp:Button ID="Button1" runat="server" Text="Upload"  OnClick="Button1_Click"/>

       </div>
     <div id="ctlDialog" title="הודעת מערכת" style="display:none">
      <table>
          <tr>
         <%--     <td><span id="dialogIcon" class="ui-icon"></span></td>--%>
              <td><asp:Label runat="server" CssClass="dialogText" ID="dialogText"></asp:Label> </td>
          </tr>
     </table>
</div>
    </div>
    </form>
</body>
</html>
