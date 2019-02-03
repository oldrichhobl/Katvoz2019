<?xml version="1.0" encoding="utf-8"  ?> 
<xsl:stylesheet   version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/TR/REC-html40"  

>
<xsl:output method="html" encoding="utf-8" /> 

<xsl:param name = "param1" >Neni Parametr </xsl:param>

<xsl:variable name="today" select="//ORIGIN/DATE" />

 <!--                 nezobrazovane udaje                 -->
<xsl:template match="text()"/>
 
	 
 <xsl:template match="/">
  <xsl:for-each select="//REC[SPZ = $param1]" >
   <hr/>
     <H1><xsl:value-of select="SPZ"/></H1>
   <hr/>
   
<div id="tabs-1">
<table>
 <tr><td><text>Evč.</text>:</td><td><xsl:value-of select="EVC"/></td></tr>
 <tr><td><text>Druh</text>:</td><td><xsl:value-of select="DZ/@k"/></td></tr>
 <tr><td><text>ZNV</text>:</td><td><xsl:value-of select="ZNV/@k"/></td></tr>
 <tr><td><text>Nástavba</text>:</td><td><xsl:value-of select="TUD/@k"/></td></tr>
 <tr><td><text>DPH</text>:</td><td><xsl:value-of select="DPH/@n"/></td></tr>
 <tr><td><text>Název</text>:</td><td><xsl:value-of select="NAZ"/></td></tr>
 
 <tr><td><text>datum výroby</text>:</td><td><xsl:value-of select="CUD/@vyrb"/><br/></td></tr>
 <tr><td><text>datum registrace</text>:</td><td><xsl:value-of select="CUD/@reg"/></td></tr>
 <tr><td><text>datum přijetí</text>:</td><td><xsl:value-of select="CUD/@pri"/><br/></td></tr>
 <tr><td><text>datum vyřazení</text>:</td><td><xsl:value-of select="CUD/@vyrz"/><br/></td></tr>
 
 <tr><td><text>organizační zařazení</text>:</td><td><xsl:value-of select="AVOR/z[last()]/@k"/>:<xsl:value-of select="AVOR/z[last()]/@c"/><br/></td></tr>
 <tr><td><text>účetní  zařazení</text>:</td><td><xsl:value-of select="AVUC/z[last()]/@k"/>:<xsl:value-of select="AVUC/z[last()]/@c"/></td></tr>
 <tr><td><text>způsob přijetí</text>:</td><td><xsl:value-of select="CUD/F_PRI/@n"/></td></tr>
 <tr><td><text>způsob vyřazení</text>:</td><td><xsl:value-of select="CUD/F_VYRZ/@n"/></td></tr>
 <tr><td><text>Datum zobrazení</text>:</td><td><xsl:value-of select="$today"/></td></tr>
 </table>
   
  
  </xsl:for-each>
 </xsl:template>


 </xsl:stylesheet>
