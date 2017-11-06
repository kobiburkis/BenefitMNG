<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmMngTeams.aspx.cs" Inherits="frmMngTeams" %>
<%@ Register TagPrefix="bnft" TagName="Header" Src="Header.ascx" %>
<%@ Register TagPrefix="bnft" TagName="HeaderImports" Src="HeaderImports.ascx" %>
<%@ Register TagPrefix="bnft" TagName="CommonFields" Src="commonFields.ascx" %>
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <title>דף ניהול מחלקות/צוותים</title>
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
               <td><asp:Label CssClass="page-ttl" runat="server" ID="lblTtl" Text="ניהול מחלקות וצוותים"></asp:Label></td>
           </tr>
        </table>
       </div>
      <%-- fields For Control Filter --%>
   <table>
        <tr runat="server" id="cntlPanel" style="margin-right:15px;">
            <td>
                <asp:Label CssClass="lbl" runat="server" ID="lblSourceEnv" Text="סביבת מקור:" />
             </td>
             <td>
                <asp:DropDownList id="fldSourceEnv" CssClass="fldTable" runat="server"  OnChange ="reloadDepatmentCombo();getTeamTrees();"></asp:DropDownList>              
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
               <%-- <asp:DropDownList runat="server" CssClass="fldTable" ID="fldTargetEnv"></asp:DropDownList>--%>
                 <asp:CheckBoxList ID="fldTargetEnv" runat="server">
                </asp:CheckBoxList>
            </td> 
            <td>
               <asp:Button ID="btnSaveTree" CssClass="btnH" UseSubmitBehavior="false" runat="server" Text="שמור שינויים" OnClientClick="return saveTreeData('#centerTeamTree');" />
            </td>     
        </tr>
        </table>
      <asp:RadioButtonList ID="rblScreenMode" runat="server" CssClass="radioBtn" onChange="getTeamTrees();">
         <asp:ListItem Value="DeprTeamMode" Selected="True" Text="ניהול מחלקות/צוותים"/>
         <asp:ListItem Value="DeprCenterMode" Text="ניהול מחלקות לגורם המשך" />
       </asp:RadioButtonList>
       <%-- fields For Control Filter --%>
      <table style="margin-right:25px;">
       <tr>
           <td>
               <asp:Label CssClass="lbl" runat="server" ID="lblSrchDepartmentID" Text="מחלקה:" />
           </td>
           <td>
               <asp:DropDownList ID="fldSrchDepartmentID" CssClass="fldTable" runat="server" OnChange="getTeamTrees();"></asp:DropDownList>
           </td>
       </tr>
     </table>
   <table>
        <tr>
            <%-- Tree Div --%>
            <td style="width:400px;">
               <div runat="server" class="myTreeLocation" id="centerTeamTree"></div>
            </td>
            <%-- Update Fields Table --%>
            <td style="vertical-align: central; padding-right: 50px; position: absolute;width:300px;">
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
            <%-- Extra Data Div --%>
           <td style="width: 300px;position: absolute;padding-right: 500px;">
            <div runat="server"  class="content-fields" id="divExtraData" style="display:none"></div>
         </td>         
       </tr>
   
      
   </table>
       <%-- Other Tree Params Div --%>
   <div runat="server" id="OtherTeams" class="myTreeLocation" style="display:none">
     <asp:Label CssClass="lbl" runat="server" ID="lblOtherTreeType" />
       <br />
     <asp:Label CssClass="lblInner" runat="server" ID="lblSearchValues" Text="חיפוש : " />
     <asp:TextBox runat="server" ID="fldSearchValues" TextMode="Search"></asp:TextBox>
   </div>
    <div runat="server" class="myTreeLocation" id="otherTeamTree"></div>
   <bnft:CommonFields runat="server" ID="commonCtl" />
   </div>
  
</form>
</body>
</html>
 