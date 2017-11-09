<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmMngFixDesc.aspx.cs" Inherits="frmMngFixDesc" %>
<%@ Register TagPrefix="bnft" TagName="Header" Src="Header.ascx" %>
<%@ Register TagPrefix="bnft" TagName="HeaderImports" Src="HeaderImports.ascx" %>
<%@ Register TagPrefix="bnft" TagName="CommonFields" Src="commonFields.ascx" %>
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8">
    <title>דף ניהול מקור/הליך</title>
    <bnft:HeaderImports runat="server" />
    <script type="text/javascript" src="dist/jsMngFixDesc.js"></script>
</head>
<body onload="onLoad();">
    <bnft:Header runat="server" />
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div>
            <div id="Div1">
                <table class="content-header">
                    <tr>
                        <td>
                            <asp:Label CssClass="page-ttl" runat="server" ID="lblTtl" Text="ניהול תיעוד מובנה"></asp:Label></td>
                    </tr>
                </table>
                       <table>
        <tr runat="server" id="cntlPanel" style="margin-right:15px;">
            <td>
                <asp:Label CssClass="lbl" runat="server" ID="lblSourceEnv" Text="סביבת מקור:" />
             </td>
             <td>
                <asp:DropDownList id="fldSourceEnv" CssClass="fldTable" runat="server"  OnChange ="reloadCenterCombo();"></asp:DropDownList>              
            </td>   
               <td style="direction: ltr;">
              <asp:Label CssClass="lbl" runat="server" ID="lblSrchCenterID" Text=":מוקד" />
           </td>
           <td>
                <asp:DropDownList id="fldSrchCenterID" CssClass="fldTable" runat="server"  OnChange ="setFilterParams();"></asp:DropDownList>              
            </td>
            <td>
               <asp:Label CssClass="lbl" runat="server" ID="lblMngNote" Text="הערה ל-MNG:" />
            </td>
            <td>
               <asp:TextBox runat="server" ID="fldMngNote" CssClass="fldTable" Text="בדיקה"></asp:TextBox>
            </td>
            <td>
               <asp:Label CssClass="lbl" runat="server" ID="lblTargetEnv" Text="סביבת יעד:" />
            </td>
            <td>
                 <asp:CheckBoxList ID="fldTargetEnv" runat="server">
                </asp:CheckBoxList>
            </td> 
            <td>
               <asp:Button ID="btnSaveTree" CssClass="btnH" UseSubmitBehavior="false" runat="server" Text="שמור שינויים" OnClientClick="return saveTreeData('#centerProblemPreserveTree');" />
            </td>     
        </tr>
        </table>
           <table style="margin-right: 30px;margin-top: 30px;">
                    <tr runat="server" id="trSrvParams" style="display:none;">
                        <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblProblemID" Text="נושא:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldProblemID" CssClass="fldTable" runat="server" OnChange="reloadProblemSubCombo();getFixDescTrees();"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblProblemSubID" Text="תת נושא:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldProblemSubID" CssClass="fldTable" runat="server" OnChange="getFixDescTrees();"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr runat="server" id="trPrsParams" style="display:none;">
                         <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblProblemDescID" Text="מקור:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldProblemDescID" CssClass="fldTable" runat="server" OnChange="reloadPreservProcCombo();"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblPreservProcID" Text="הליך:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldPreservProcID" CssClass="fldTable" runat="server" OnChange="reloadFixTypeCombo();reloadResultDiklaCombo();"></asp:DropDownList>
                        </td>
                         <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblFixTypeID" Text="סוג טיפול:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldFixTypeID" CssClass="fldTable" runat="server" OnChange="reloadResultDiklaCombo();"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Label CssClass="lbl" runat="server" ID="lblResultDiklaID" Text="תוצאת שיחה:" />
                        </td>
                        <td>
                            <asp:DropDownList ID="fldResultDiklaID" CssClass="fldTable" runat="server" OnChange=""></asp:DropDownList>
                        </td>
                    </tr>
                </table>
           <table>
            <tr>
             <td style="width:400px;">
               <div runat="server" class="myTreeLocation" id="centerFixDescTree"></div>
             </td>
                 <%-- Extra Data Div --%>
                <td style="width: 300px;position: absolute;padding-right: 500px;">
                 <div runat="server"  class="content-fields" id="divExtraData" style="display:none"></div>
                </td>   
                </tr>
               </table>
            </div>
              <%-- Other Tree Params Div --%>
            <div runat="server" id="OtherFixDescs" class="myTreeLocation" style="display:none">
             <asp:Label CssClass="lbl" runat="server" ID="lblOtherTreeType" Text="תיעודים נוספים: " />
             <br />
                <asp:Label CssClass="lblInner" runat="server" ID="lblSearchValues" Text="חיפוש : " />
             <asp:TextBox runat="server" ID="fldSearchValues" TextMode="Search"></asp:TextBox>
            </div>
            <div runat="server" class="myTreeLocation" id="otherFixDescTree"></div>
            <bnft:CommonFields runat="server" ID="commonCtl" />
            <asp:HiddenField runat="server" ID="IsSrv"  Value=""/>
        </div>
    </form>
</body>
</html>
