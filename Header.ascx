﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Header.ascx.cs" Inherits="Header" %>
  <link rel="stylesheet" href="dist/themes/default/menu.css" />
      <table class="menuMain">
          <tr>
              <td>
                    <ul class="menu cf">
                        <li>
                           <img title="BenefitMNG Ver 1.0" src="dist/themes/default/benefit_logo.png"/> 
                        </li>
                       <li>
                        <a href="#">טבלאות מערכת</a>
                        <ul class="submenu">
                            <li><a href="javascript:menuChangePage('frmMngTeams.aspx');">ניהול מחלקות וצוותים</a></li>
                            <li><a href="javascript:menuChangePage('frmMngProblemPreserve.aspx');">עידכון מקור והליך</a></li>
                            <li><a href="javascript:menuChangePage('frmMngFixDesc.aspx');">עידכון תיעוד מובנה</a></li>
                            <li><a href="#">עידכון טבלאות</a></li>
                        </ul>
                      </li>
                      <li><a href="javascript:menuChangePage('frmImportExcel.aspx');">יבוא קבצים</a></li>
                    </ul>
                  </td>
              </tr>
      </table>		
