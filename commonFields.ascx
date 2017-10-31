<%@ Control Language="C#" AutoEventWireup="true" CodeFile="commonFields.ascx.cs" Inherits="commonFields" %>
<asp:HiddenField runat="server" ID="selectedNode" />
<asp:HiddenField runat="server" ID="selectedDataNode" />
<asp:HiddenField runat="server" ID="nodeDataChanged" Value="0" />
<asp:HiddenField runat="server" ID="treeDataChanged" Value="0" />
  <div id="ctlDialog" title="הודעת מערכת" style="display:none">
      <table>
          <tr>
         <%--     <td><span id="dialogIcon" class="ui-icon"></span></td>--%>
              <td><asp:Label runat="server" CssClass="dialogText" ID="dialogText"></asp:Label> </td>
          </tr>
     </table>
</div>