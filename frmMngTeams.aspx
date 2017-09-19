<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmMngTeams.aspx.cs" Inherits="frmMngTeams" %>
<%@ Register TagPrefix="bnft" TagName="Header" Src="Header.ascx" %>
<%@ Register TagPrefix="bnft" TagName="HeaderImports" Src="HeaderImports.ascx" %>
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <title>דף ניהול צוותים</title>
  <bnft:HeaderImports runat="server" />
  <script type="text/javascript" src="dist/jsMngTeams.js"></script>
</head>
<body onload="onLoad();">
    <bnft:Header runat="server" />
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
  <div>
     <div id="Div1">
        <table class="content-header">  
           <tr>  
               <td><asp:Label CssClass="page-ttl" runat="server" ID="lblTtl" Text="ניהול צוותים"></asp:Label></td>
           </tr>
        </table>
       </div>
    <table>
        <tr runat="server" id="cntlPanel" style="margin-right:15px;">
            <td>
                <asp:Label CssClass="lbl" runat="server" ID="lblSourceEnv" Text="סביבת מקור:" />
             </td>
             <td>
                <asp:DropDownList id="fldSourceEnv" CssClass="fldTable" runat="server"  OnChange ="reloadCenterCombo();getTeamTrees();"></asp:DropDownList>              
            </td>
             <td>
                <asp:Label CssClass="lbl" runat="server" ID="lblSrchCenterID" Text="מוקד:" />
             </td>
             <td>
                <asp:DropDownList id="fldSrchCenterID" CssClass="fldTable" runat="server"  OnChange ="getTeamTrees();"></asp:DropDownList>              
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
                <asp:DropDownList runat="server" CssClass="fldTable" ID="fldTargetEnv"></asp:DropDownList>
            </td> 
            <td>
               <asp:Button ID="btnSaveTree" CssClass="btnH" UseSubmitBehavior="false" runat="server" Text="שמור שינויים" OnClientClick="return saveTreeData('#centerTeamTree');" />
            </td>     
        </tr>
           
        </table>
      <table>
        <tr>
            <td style="width:400px;">
               <div runat="server" class="myTreeLocation" id="centerTeamTree"></div>
            </td>
            <td style="vertical-align: central; padding-right: 50px; position: absolute">
                <table>
                    <tr>
                        <td>
                            <fieldset runat="server" id="fstExtraFields">
                            <div runat="server" id="ExtraFields" style="display: none">
                                <table class="content-fields" style="width:320px;border-spacing: 0 1em;" >
                                    <tr>
                                        <td colspan="2" style="border-bottom:#095da0 1px solid;width:250px;">
                                            <asp:Label CssClass="lbl" runat="server" ID="lblExtraDetails" Text="הגדרות נוספות לצוות:" />
                                            <asp:Label CssClass="lblTitle" runat="server" ID="lblExtraDetailsSpec" />
                                        </td>
                                    </tr>             
                                    <tr runat="server" id="trSekerID">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblSekerID" Text="מספר סקר : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldSekerID" onChange="dataChanged(1);" ></asp:TextBox>
                                        </td>
                                    </tr>
                                     <tr runat="server" id="trTeamTorType">
                                       <td style="width:125px;">
                                          <asp:Label CssClass="lbl" runat="server" ID="lblTeamTorType" Text="סוג צוות לתור צוותי: " />
                                           </td>
                                         <td>
                                          <asp:DropDownList CssClass="fldTable" runat="server" ID="fldTeamTorType" onChange="dataChanged(1);"></asp:DropDownList>
                                       </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td style="text-align: center">                                
                                         <asp:Button ID="btnSaveNode" CssClass="btnH btnH_small" UseSubmitBehavior="false" runat="server" Text="שמור" OnClientClick="return saveNodeData('#centerTeamTree');" />
                                      </td>
                                    </tr>
                                </table>
                            </div>
                          </fieldset>
                        </td>
                    </tr>
                </table>
            </td>
       </tr>
   </table>
   <div runat="server" id="OtherTeams" class="myTreeLocation" style="display:none">
       <asp:RadioButtonList ID="rblSearchTrees" runat="server" CssClass="radioBtn" onChange="getOtherTrees();">
         <asp:ListItem Value="TeamTree" Text="צוותים נוספים" />
         <asp:ListItem Value="DeprTree" Text="מחלקות נוספות" />
       </asp:RadioButtonList>
     <asp:Label CssClass="lblInner" runat="server" ID="lblSearchValues" Text="חיפוש : " />
        <asp:TextBox runat="server" ID="fldSearchValues" TextMode="Search"></asp:TextBox>
   </div>
    <div runat="server" class="myTreeLocation" id="otherTeamTree"></div>
    <asp:HiddenField runat="server" ID="selectedNode" />
    <asp:HiddenField runat="server" ID="nodeDataChanged" Value="0" />
    <asp:HiddenField runat="server" ID="treeDataChanged" Value="0" />
   </div>
    <div id="ctlDialog" title="הודעת מערכת" style="display:none">
      <table>
          <tr>
         <%--     <td><span id="dialogIcon" class="ui-icon"></span></td>--%>
              <td><asp:Label runat="server" CssClass="dialogText" ID="dialogText"></asp:Label> </td>
          </tr>
     </table>
</div>
</form>
</body>
</html>
 