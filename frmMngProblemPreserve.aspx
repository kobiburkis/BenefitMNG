<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmMngProblemPreserve.aspx.cs" Inherits="frmMngProblemPreserve" %>
<%@ Register TagPrefix="bnft" TagName="Header" Src="Header.ascx" %>
<%@ Register TagPrefix="bnft" TagName="HeaderImports" Src="HeaderImports.ascx" %>
<%@ Register TagPrefix="bnft" TagName="CommonFields" Src="commonFields.ascx" %>
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <title>דף ניהול מקור/הליך</title>
  <bnft:HeaderImports runat="server" />
  <script type="text/javascript" src="dist/jsMngProblemPreserve.js"></script>
</head>
<body onload="onLoad();">
    <bnft:Header runat="server" />
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <div>
       <div id="Div1">
        <table class="content-header">  
           <tr>  
               <td><asp:Label CssClass="page-ttl" runat="server" ID="lblTtl" Text="ניהול מקור/הליך פנייה"></asp:Label></td>
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
                <asp:DropDownList id="fldSrchCenterID" CssClass="fldTable" runat="server"  OnChange ="getProblemPreserveTrees();"></asp:DropDownList>              
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
                <%--<asp:DropDownList runat="server" CssClass="fldTable" ID="fldTargetEnv"></asp:DropDownList>--%>
                  <asp:CheckBoxList ID="fldTargetEnv" runat="server">
                </asp:CheckBoxList>
            </td> 
            <td>
               <asp:Button ID="btnSaveTree" CssClass="btnH" UseSubmitBehavior="false" runat="server" Text="שמור שינויים" OnClientClick="return saveTreeData('#centerProblemPreserveTree');" />
            </td>     
        </tr>
<%--        <tr>
            <td colspan="7">
               <asp:RadioButtonList ID="rblCenterTree" runat="server" CssClass="radioBtn" onChange="getProblemPreserveTrees();">
                <asp:ListItem Value="MainTree" Text="מקור/הליך" />
                <asp:ListItem Value="CenterTree" Text="מקור/הליך לפי מוקד" />
               </asp:RadioButtonList>
            </td>
        </tr>
         <tr id="trSrchCenter" runat="server" style="display:none">
        
        </tr>--%>
        </table>
        <table>
        <tr>
            <td style="width:400px;">
               <div runat="server" class="myTreeLocation" id="centerProblemPreserveTree"></div>
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
                                            <asp:Label CssClass="lbl" Width="125px" runat="server" ID="lblExtraDetails" Text="הגדרות נוספות:"  />
                                            <asp:Label CssClass="lblTitle" runat="server" ID="lblExtraDetailsSpec" />
                                        </td>
                                    </tr>                 
                                     <tr runat="server" id="trPreserveTypeMrkzID" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblPreserveTypeMrkzID" Text="הליך מרכז : " />
                                        </td>
                                        <td>
                                           <asp:DropDownList CssClass="fldTable" runat="server" ID="fldPreserveTypeMrkzID" onChange="dataChanged(1);" ></asp:DropDownList>
                                        </td>
                                    </tr>
                                     <tr runat="server" id="trPreserveTigmulID" style="display:none">
                                       <td style="width:125px;">
                                          <asp:Label CssClass="lbl" runat="server" ID="lblPreserveTigmulID" Text="הליך שימור לתגמול: " />
                                           </td>
                                         <td>
                                          <asp:DropDownList CssClass="fldTable" runat="server" ID="fldPreserveTigmulID" onChange="dataChanged(1);"></asp:DropDownList>
                                       </td>
                                    </tr>  
                                    <tr runat="server" id="trDisplayAdd" style="display:none">
                                       <td style="width:125px;">
                                          <asp:Label CssClass="lbl" runat="server" ID="lblDisplayAdd" Text="הצג בהוספה: " />
                                           </td>
                                         <td>
                                          <asp:CheckBox CssClass="fldTable" runat="server" ID="fldDisplayAdd" onChange="dataChanged(1);"></asp:CheckBox>
                                       </td>
                                    </tr>  
                                    <tr runat="server" id="trDaysDiff" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblDaysDiff" Text="ימים לתחילת טיפול : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldDaysDiff" onChange="dataChanged(1);" ></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr runat="server" id="trSLA" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblSLA" Text="SLA : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldSLA" onChange="dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>  
                                     <tr runat="server" id="trSLA2" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblSLA2" Text="SLA 2 : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldSLA2" onChange="dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>   
                                     <tr runat="server" id="trCMIndication" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblCMIndication" Text="CMIndication : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldCMIndication" onChange="dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>  
                                     <tr runat="server" id="trCMActionCode" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblCMActionCode" Text="CMActionCode : " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldCMActionCode" onChange="dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>   
                                     <tr runat="server" id="trDoctorSourceID" style="display:none">
                                       <td style="width:125px;">
                                          <asp:Label CssClass="lbl" runat="server" ID="lblDoctorSourceID" Text="גורם מקושר: " />
                                           </td>
                                         <td>
                                          <asp:DropDownList CssClass="fldTable" runat="server" ID="fldDoctorSourceID" onChange="dataChanged(1);"></asp:DropDownList>
                                       </td>
                                    </tr> 
                                     <tr runat="server" id="trDoctorEmplDepartmentIDs" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblDoctorEmplDepartmentIDs" Text="מחלקות/קודי זיהוי: " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldDoctorEmplDepartmentIDs" onChange="checkIsNumbersSequence(this);dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>  
                                     <tr runat="server" id="trDoctorSourceID2" style="display:none">
                                       <td style="width:125px;">
                                          <asp:Label CssClass="lbl" runat="server" ID="lblDoctorSourceID2" Text="גורם מקושר 2: " />
                                           </td>
                                         <td>
                                          <asp:DropDownList CssClass="fldTable" runat="server" ID="fldDoctorSourceID2" onChange="dataChanged(1);"></asp:DropDownList>
                                       </td>
                                    </tr> 
                                     <tr runat="server" id="trDoctorEmplDepartmentIDs2" style="display:none">
                                        <td style="width:125px;" >
                                           <asp:Label CssClass="lbl" runat="server" ID="lblDoctorEmplDepartmentIDs2" Text="מחלקות/קודי זיהוי 2: " />
                                        </td>
                                        <td>
                                           <asp:TextBox CssClass="fldTable" runat="server" ID="fldDoctorEmplDepartmentIDs2" onChange="checkIsNumbersSequence(this);dataChanged(1);" ></asp:TextBox>
                                       </td>
                                    </tr>        
                                    <tr>
                                      <td></td>
                                      <td style="text-align: center">                                
                                         <asp:Button ID="btnSaveNode" CssClass="btnH btnH_small" UseSubmitBehavior="false" runat="server" Text="שמור" OnClientClick="return saveNodeData('#centerProblemPreserveTree');" />
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
   <div runat="server" id="OtherValuesSearch" class="myTreeLocation" style="display:none">
       <asp:RadioButtonList ID="rblSearchTrees" runat="server" CssClass="radioBtn" onChange="getOtherTrees();">
         <asp:ListItem Value="ProblemTree" Text="מקורות נוספים" />
         <asp:ListItem Value="PreserveTree" Text="הליכים נוספים" />
       </asp:RadioButtonList>
        <asp:Label CssClass="lblInner" runat="server" ID="lblSearchValues" Text="חיפוש : " />
        <asp:TextBox runat="server" ID="fldSearchValues" TextMode="Search"></asp:TextBox>
   </div>
    <div runat="server" class="myTreeLocation" id="otherValuesTree"></div>
  
   </div>
   <bnft:CommonFields runat="server" ID="commonCtl" />
    </div>
    </form>
</body>
</html>
