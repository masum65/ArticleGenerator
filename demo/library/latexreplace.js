//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    27.04.2010,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2010                  #
//#################################################

//alert("loading JS-Libary: latexreplace.js");

function LatexReplacement (pPreNonTerm,pRegBegin,pRegMiddle,pRegEnd) {
	//---------------------------------------
	//---Attributes--------------------------
	this.pre_nonterm 	= pPREnonterm;
	this.reg_begin 		= pRegBegin;
	this.reg_middle		= pRegMiddle;
	this.reg_end 		= pRegEnd;
	//---------------------------------------
	//---Methods-----------------------------
	this.replace 		= m_replace_latex;
	//---------------------------------------
}

function m_replace_latex (pString,pPreNonTerm,pRegBegin,pRegMiddle,pRegEnd) {
	var vRegExp = new RegExp(pRegExp);
	// var derSatz = "Auf der Mauer, auf der Lauer sitzt 'ne kleine Wanze.";
	//var Suche = /der (\w*)(.*)/;
	var vResultArray = vRegExp.exec(derSatz);
	alert("parsenode.js:62 - m_replace_latex()\nOriginaltext:\n" + Ergebnis.input);
	// document.write("<p>Treffer des Gesamtausdrucks: '<i>" + Ergebnis[0] +
  	// "<\/i>' an der Position " + Ergebnis.index + "<\/p>");
	// document.write("<p>Die Treffer der Teilausdrücke im Einzelnen:<\/p>");
	for (var i = 1; i < vResultArray.length; i++) {
  		document.write("<li>'<i>" + vResultArray[i] + "<\/i>'<\/li>");
	};

}
