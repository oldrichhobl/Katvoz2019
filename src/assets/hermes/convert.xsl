<?xml version="1.0" encoding="utf-8"  ?> 
<xsl:stylesheet   version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:svg="http://www.w3.org/2000/svg"    

>
<xsl:output method="html" encoding="utf-8" /> 

<xsl:param name = "param1" >Neni Parametr </xsl:param>

<xsl:variable name="today" select="//ORIGIN/DATE" />

 <!--                 nezobrazovane udaje                 -->
<xsl:template match="text()"/>
 
	 
<xsl:template match="/">
<xsl:for-each select="//REC[SPZ = $param1]" >   
<ion-card id="tabs-1">
<table  style="color:red !important;">
 <tr  style="color:red !important;"><td> Evč.: </td><td><xsl:value-of select="EVC"/></td></tr>
 <tr  style="color:red !important;"><td><text>Druh</text>:</td><td><xsl:value-of select="DZ/@k"/></td></tr>
 <tr class="mytable"><td><text>ZNV</text>:</td><td><xsl:value-of select="ZNV/@k"/></td></tr>
 <tr><td><text>Nástavba</text>:</td><td><xsl:value-of select="TUD/@k"/></td></tr>
 <tr><td><text>DPH</text>:</td><td><xsl:value-of select="DPH/@n"/></td></tr>
 <tr><td><text>Název</text>:</td><td><xsl:value-of select="NAZ"/></td></tr>
 
 <tr><td><text>dat.výroby</text>:</td><td><xsl:value-of select="CUD/@vyrb"/></td></tr>
 <tr><td><text>registrace</text>:</td><td><xsl:value-of select="CUD/@reg"/></td></tr>
 <tr><td><text>přijetí</text>:</td><td><xsl:value-of select="CUD/@pri"/></td></tr>
 <tr><td><text>vyřazení</text>:</td><td><xsl:value-of select="CUD/@vyrz"/></td></tr>
 
 <tr><td><text>org. zařazení</text>:</td><td><xsl:value-of select="AVOR/z[last()]/@k"/>:<xsl:value-of select="AVOR/z[last()]/@c"/></td></tr>
 <tr><td><text>úč. zařazení</text>:</td><td><xsl:value-of select="AVUC/z[last()]/@k"/>:<xsl:value-of select="AVUC/z[last()]/@c"/></td></tr>
 <tr><td><text>přijetí</text>:</td><td><xsl:value-of select="CUD/F_PRI/@n"/></td></tr>
 <tr><td><text>vyřazení</text>:</td><td><xsl:value-of select="CUD/F_VYRZ/@n"/></td></tr>
 <tr><td><text>Dat. zobrazení</text>:</td><td><xsl:value-of select="$today"/></td></tr>
 </table>
 
</ion-card> 



<ion-card id="tabs-2">
    <ion-card-content>
    <ion-card-title>Normy spotřeby</ion-card-title>
  <ion-grid  class="mytable">
     <ion-row>
       <ion-col><text> Kód </text></ion-col>
       <ion-col><text> --- </text></ion-col>
       <ion-col align="right"><text> spotřeba </text></ion-col>
       <ion-col align="right"><text> na </text></ion-col>
       
       <!-- td align="right"><text>Platnost od</text></td>
       <td align="right"><text>Platnost do</text></td  -->
       </ion-row>

     <xsl:for-each select="AVSN/*">
       <ion-row>
        <ion-col> <xsl:value-of select="DRH/@k"/> </ion-col> 
          <!-- <td> <xsl:value-of select="DRH/@n"/> </td> --> 
        <ion-col> <xsl:value-of select="@n"/> </ion-col> 
        <ion-col align="right"> <xsl:value-of select="@pln"/><xsl:value-of select="@j"/> / </ion-col> 
        <ion-col align="right"> <xsl:value-of select="@pmj"/><xsl:value-of select="@m"/> </ion-col> 
       
        <!--
        td align="right"> <xsl:value-of select="@od"/> </td> 
        <td align="right"> <xsl:value-of select="@do"/> </td  --> 
       </ion-row>
     </xsl:for-each>
  </ion-grid>

  </ion-card-content>
</ion-card>


<!-- sazby interni -->
<ion-card id="tabs-3">
    <ion-card-content>
    <ion-card-title>Sazby interní</ion-card-title>
  <table>
   <thead>
     <tr>
       <!-- td><text>Platnost od</text></td>
       <td><text>Platnost do</text></td  -->
       <td><text>Kód</text></td>
       <td><text>Název</text></td>
       <td><text>Sazba</text></td>
       <td><text>Měna</text></td>
       <td><text>Jednotka</text></td>
       </tr>
   </thead>
     <xsl:for-each select="SAZ_FAKT_I/SAZ">
     <xsl:sort select="substring(@do,7,4)"/> <!-- year sort -->
     <xsl:sort select="substring(@do,1,2)"/> <!-- month sort -->
     <xsl:sort select="substring(@do,4,2)"/> <!-- day sort -->
     <!-- letos platne -->
     <xsl:variable name="datedo" select="substring(@do,7,4)" />
     <xsl:choose>
     <xsl:when test="$datedo &gt; //ORIGIN/AKTROK">
       <tr class="plat">
        <!-- td> <xsl:value-of select="@od"/> </td> 
        <td> <xsl:value-of select="@do"/> </td  --> 
        <td> <xsl:value-of select="@k"/> </td> 
        <td> <xsl:value-of select="@n"/> </td> 
        <td align="right"> <xsl:value-of select="@s"/> </td> 
        <td> <xsl:value-of select="@m"/> </td> 
        <td> <xsl:value-of select="@j"/> </td> 
       </tr>
       </xsl:when>
       <xsl:otherwise>
       <!-- tr class="noplat">
        <td> <xsl:value-of select="@od"/> </td> 
        <td> <xsl:value-of select="@do"/> </td> 
        <td> <xsl:value-of select="@k"/> </td> 
        <td> <xsl:value-of select="@n"/> </td> 
        <td align="right"> <xsl:value-of select="@s"/> </td> 
        <td> <xsl:value-of select="@m"/> </td> 
        <td> <xsl:value-of select="@j"/> </td> 
       </tr  -->
       </xsl:otherwise>
       </xsl:choose>       
     </xsl:for-each>
  </table>
  <!-- tlacitko pro zobrazeni vsech sazeb 
  <p><a href="#" class="buttonvse noprint"><button><text>Všechny sazby</text></button></a></p>
   -->
 </ion-card-content>
</ion-card>





<ion-card id="tabs-6">
    <ion-card-content>
    <ion-card-title>Technické údaje</ion-card-title>
 <table id="RZI">
 <xsl:for-each select="RZI">
 <tr><td><text>Objem válců</text>:</td><td><xsl:value-of select="@obj_v"/></td>                <td><xsl:value-of select="@jom"/></td></tr>
 <tr><td><text>Hmotnost pohotovostní</text>:</td><td><xsl:value-of select="@hm_poh"/></td>     <td><xsl:value-of select="@jhv"/></td></tr>
 <tr><td><text>Hmotnost užitečná</text>:</td><td><xsl:value-of select="@hm_uzi"/></td>         <td><xsl:value-of select="@jhv"/></td></tr>
 <tr><td><text>Hmotnost celková</text>:</td><td><xsl:value-of select="@hm_celk"/></td>         <td><xsl:value-of select="@jhv"/></td></tr>
 <tr><td><text>Max.procento přeložení</text>:</td><td><xsl:value-of select="@max_preloz"/></td><td>%</td></tr>
 <tr><td><text>Součet n. tlaků</text>:</td><td><xsl:value-of select="@sum_tlak"/></td><td><xsl:value-of select="@jhv"/></td></tr>
 <tr><td><text>Počet náprav</text> :</td><td><xsl:value-of select="@poc_naprav"/></td>         <td> </td></tr>
 
 <tr><td><text>Speciální kapacita</text>:</td><td><xsl:value-of select="@spec_k"/><br/></td>   <td> </td></tr>
 <tr><td><text>Výkon</text>:</td><td><xsl:value-of select="@vyk"/></td>                        <td><xsl:value-of select="@jvm"/></td></tr>
 </xsl:for-each>
</table>
</ion-card-content>
</ion-card>


 
<ion-card id="tabs-7"> 
  <ion-card-content>
  <ion-card-title>Výbavy</ion-card-title>
  <table>
   <thead>
     <tr>
       <td><text>Název</text></td>
       <td><text>Výr. číslo</text></td>
       <td><text>Inv. číslo</text></td>
       <td><text>Datum od</text> </td>
       <td><text>Expirace</text></td>
      </tr>
   </thead>
     <xsl:for-each select="AVYB/*">
       <tr>
        <td> <xsl:value-of select="DRH/@n"/> </td> 
        <td> <xsl:value-of select="CIS"/> </td> 
        <td> <xsl:value-of select="INV"/> </td> 
        <td> <xsl:value-of select="DAT"/> </td> 
        <td> <xsl:value-of select="EXP"/> </td> 
       </tr>
     </xsl:for-each>
  </table>
</ion-card-content>
</ion-card>



<ion-card id="tabs-8">
   <p><text>Poznámky</text></p> 
     <xsl:for-each select="POZ/P">
        <div class="poznamky"><xsl:value-of select="E[@n='Typ']"/> : </div> 
        <div class="poznamky"><pre><xsl:value-of select="E[@n='Text']"/></pre></div> 
     </xsl:for-each>

</ion-card>


 
<ion-card id="tabs-9">

<table>
 <tr><td><text>Název či bližší určení vozidla</text>:</td><td><xsl:value-of select="NAZ"/></td></tr>
 <tr><td><text>Druhý klíč</text>:</td><td><xsl:value-of select="SEC"/></td></tr>
 <tr><td><text>Třetí klíč</text>:</td><td><xsl:value-of select="TER"/></td></tr>
 <tr><td><text>Info 1</text>:</td><td><xsl:value-of select="INFO1"/></td></tr>
 <tr><td><text>Info 2</text>:</td><td><xsl:value-of select="INFO2"/></td></tr>
</table>

</ion-card>

  </xsl:for-each>
 </xsl:template>


 </xsl:stylesheet>
