//#################################################
//# ArticleGenerator                              #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public Licence                            #
//#################################################

//alert("loading JS-Libary: objectgenerate.js");
//-------------------------------------------------
function CLASS(pParentClass) {
	return pParentClass;
}
//-------------------------------------------------
//----Object Generation----------------------------
//-------------------------------------------------
var vURL_Object       = new URL_Object();
var vArticleGenerator = new ArticleGenerator();
var vFormGenerator    = new FormGenerator();
//-------------------------------------------------

//-------------------------------------------------
//----Object Init----------------------------------
//-------------------------------------------------
vArticleGenerator.init('top.main.document.fInputForm','top.vArticleGenerator');
// alert("vArticleGenerator.formPath="+vArticleGenerator.formPath);
// parameter of init is the formPath to edit form of the Caesar Keys
//-------------------------------------------------