<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmImportExcel.aspx.cs" Inherits="frmImportExcel" %>
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
<body>
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
                    <td><asp:Label CssClass="lbl" runat="server" ID="lblImportExcelTypeID" Text="סוג קליטה" /></td>
                    <td><asp:DropDownList id="fldImportExcelTypeID" Width="175px" runat="server" OnChange ="displayNeededFields();"></asp:DropDownList></td>
                </tr>
                <tr id="trCenterType" style="display:none">
                     <td><asp:Label CssClass="lbl" runat="server" ID="lblCenterTypeID" Text="סוג מוקד" /></td>
                    <td><asp:DropDownList id="fldCenterTypeID" Width="175px" runat="server"></asp:DropDownList></td>
                </tr>
            </table>
           
                    
       </div>
    </div>
    </form>
</body>
</html>
