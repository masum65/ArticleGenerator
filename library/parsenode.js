//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    27.04.2012,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2010                  #
//#################################################



//alert("loading JS-Libary: parsenode.js");



// ##########################################################################################

// Class: ParseNode
// ##########################################################################################
// var HTML_Line greedy RegEx 		/(^<.+>)/;
// var HTML_Zeile NOT greedy RegEx	/(^<.+?>)/;
// ##########################################################################################

// ##########################################################################################

//---- Constructor ArticleGenerator() - OBJECT -

function ParseNode() {
	//----------------------------------------
	//---Super Class--------------------------
	this.SuperClass = MatrixColumn;
	this.SuperClass();
	//---------------------------------------
	//---Attributes--------------------------
	this.section_RegEx 		= /\\section{[^}]+}/g;
	this.paragraphsplit 	= "\n";
	this.sentencesplit 		= ".|?|!|:";
	this.subsentencesplit 	= ",|;|-";
	this.indent_blanks		= "   "
	this.indent				= "\n"+this.indent_blanks;
	this.name = "ParseNode";
	this.minwordlength 		= 4;
	this.maxwordlength 		= 20;
	//---Methods---------
	this.convert2nonterm 			= m_convert2nonterm;
	this.convert_umlaute 			= convert_umlaute_ParseNode;
	this.line_is_nonterm_def 		= line_is_nonterm_def_ParseNode;
	this.parse_nonterm				= parse_nonterm_ParseNode;
	this.check_nonterm				= line_is_nonterm_def_ParseNode;
	this.parse_nonterm_bracket		= parse_nonterm_bracket_ParseNode;
	this.check_nonterm_bracket 		= check_nonterm_bracket_ParseNode;
	this.parse_operator				= parse_operator_ParseNode;
	this.parse_weight				= parse_weight_ParseNode;
	this.parse_term_part			= parse_term_onliner_ParseNode;
	this.parse_term_onliner			= parse_term_onliner_ParseNode;
	this.term_after_nonterm			= term_after_nonterm_ParseNode;
	this.get_overwrite_array		= m_get_overwrite_array;
	this.wordarray2grammar 			= m_wordarray2grammar;
	this.wordarray2undef_nonterm	= m_wordarray2undef_nonterm;
	this.nonterm2term               = nonterm2term_ParseNode;
	this.missing_nonterm            = missing_nonterm_ParseNode;
	this.sentencearray2grammar 		= m_sentencearray2grammar;
	this.sentencearray2nonterm		= m_sentencearray2nonterm;
	this.sentence_corrections		= m_sentence_corrections;
	this.remove_interpunction 		= remove_interpunction_ParseNode; // for words only
	this.remove_overwrite 		    = remove_overwrite_ParseNode; // for words only
	this.remove_double_lines		= remove_double_lines_ParseNode;
	this.remove_array_double_lines	= remove_array_double_lines_ParseNode;
	this.sentence_nonterm 			= m_sentence_nonterm;
	this.split2lines 				= m_split2lines;
	this.split2overwrite 			= m_split2overwrite;
	this.split2sentence 			= m_split2sentence;
	this.split2paragraph 			= m_split2paragraph;
	this.split2sections 			= m_split2sections;
	this.split_ruletext 			= split_ruletext_ParseNode;
	this.split2words 				= m_split2words;
	this.sectionheader2grammar		= m_sectionheader2grammar;
	this.sectionheader2nonterms		= m_sectionheader2nonterms;
	this.sections2grammar			= m_sections2grammar;
	this.sections2nonterms			= m_sections2nonterms;
	this.create_section_array		= m_create_section_array;
	this.replace_sentence_end_dot	= m_replace_sentence_end_dot;
	this.sentence_nonterm 			= m_sentence_nonterm;
	this.nonterm_enumerator			= m_sentence_nonterm;
	this.and2commalist				= m_and2commalist;
	this.and2etal					= m_and2etal;
	this.plural_checker				= m_plural_checker;
	//---------------------------------------	
}

						
//#################################################################
//# Method: convert_umlaute  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function convert_umlaute_ParseNode(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:convert_umlaute(pString)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.convert_umlaute(pString);
	//-------------------------------------------------------
	
	var vReturn = "";
	vReturn = pString.replace(/ä/,"ae");
	pString = vReturn;
	vReturn = pString.replace(/ö/g,"oe");
	pString = vReturn;
	vReturn = pString.replace(/ü/g,"ue");
	pString = vReturn;
	vReturn = pString.replace(/ß/g,"ss");
	pString = vReturn;
	vReturn = pString.replace(/Ä/g,"AE");
	pString = vReturn;
	vReturn = pString.replace(/Ö/g,"OE");
	pString = vReturn;
	vReturn = pString.replace(/Ü/g,"UE");

	return vReturn;

}
//----End of Method convert_umlaute Definition

						
//#################################################################
//# Method: remove_interpunction  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function remove_interpunction_ParseNode(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:remove_interpunction(pString)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.remove_interpunction(pString);
	//-------------------------------------------------------
	var vReturn = "";
	vReturn = pString.replace(/\./,"");
	pString = vReturn;
	vReturn = pString.replace(/,/g,"");
	pString = vReturn;
	vReturn = pString.replace(/:/g,"");
	pString = vReturn;
	vReturn = pString.replace(/,/g,"");
	pString = vReturn;
	vReturn = pString.replace(/\?/g,"");
	pString = vReturn;
	vReturn = pString.replace(/!/g,"");
	pString = vReturn;
	vReturn = pString.replace(/ /g,"");

	return vReturn;

}
//----End of Method remove_interpunction Definition

						
//#################################################################
//# Method: remove_overwrite  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function remove_overwrite_ParseNode(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:remove_overwrite(pString)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.remove_overwrite(pString);
	//-------------------------------------------------------
	var vReturn = "";
	var vCR = "\n";
	var vLineArray = this.split2lines(pString);
	for (var i=0; i<vLineArray.length; i++) {
		if (vLineArray[i].charAt(0) != ">") {
			vReturn += vCR + vLineArray[i]; 
			vCR = "\n";
		}
	}
	return vReturn;

}
//----End of Method remove_overwrite Definition
						
//#################################################################
//# Method: parse_nonterm  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function parse_nonterm_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:parse_nonterm(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.parse_nonterm(pWord);
	//-------------------------------------------------------
	//alert("parsenode.js:121 -  m_parse_nonterm()\n '=' found in "+pWord);
	var vPair = pWord.split(/[ \t]/);
	pWord = vPair[0];
	if (pWord.indexOf("+")>0) {
		var vPair = pWord.split(/\+/);
		pWord = vPair[0];
	} else if (pWord.indexOf("=")>0) {
		var vPair = pWord.split(/=/);
		pWord = vPair[0];
	} else if (pWord.indexOf("-")>0) {
		pWord = pWord.substr(0,pWord.indexOf("-"));
	};
	//return pWord;
	return pWord.replace(/\s/g,"");

}
//----End of Method parse_nonterm Definition

function X_parse_nonterm_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:parse_nonterm(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.parse_nonterm(pWord);
	//-------------------------------------------------------
	//alert("parsenode.js:121 -  m_parse_nonterm()\n '=' found in "+pWord);
	pWord = this.parse_nonterm_bracket(pWord);
	if (pWord.indexOf("+")>0) {
		var vPair = pWord.split(/\+/);
		pWord = vPair[0];
	} else if (pWord.indexOf("=")>0) {
		var vPair = pWord.split(/=/);
		pWord = vPair[0];
	} else if (pWord.indexOf(" ")>0) {
		var vPair = pWord.split(/[ \t]/);
		pWord = vPair[0];
	};
	//return pWord;
	return pWord.replace(/\s/g,"");

}
//----End of Method parse_nonterm Definition

					
//#################################################################
//# Method: parse_term_onliner  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function parse_term_onliner_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:parse_term_onliner()-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.parse_term_onliner();
	//-------------------------------------------------------
	var vIndex = pWord.indexOf(" ");
	var vReturn = "";
	if (vIndex >0) {
		vReturn = pWord.substr(vIndex+1,pWord.length-vIndex+1);
		//alert("parsenode.js:180 - parse_term_onliner\n'"+vReturn+"'");
	}
	return vReturn;
}
//----End of Method parse_term_onliner Definition

//#################################################################
//# Method: remove_double_lines  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function remove_double_lines_ParseNode (pString) {
	var vArray = pString.split(/\n/);
	vArray = this.remove_array_double_lines(vArray);
	return vArray.join("\n"); 
};

//#################################################################
//# Method: remove_array_double_lines  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function remove_array_double_lines_ParseNode (pArrayString) {
	var vPrevious = "";
	var vString = "";
	var vReturnArray = new Array();
	pArrayString.sort();
	for(var i=0;i<pArrayString.length;++i) {
		if (pArrayString[i]!= vPrevious) {
			vReturnArray.push(pArrayString[i]);
			vPrevious = pArrayString[i];
		}
	}
	return vReturnArray;
};
						
//#################################################################
//# Method: parse_weight   
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function parse_weight_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:parse_weight (pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.parse_weight (pWord);
	//-------------------------------------------------------
	var vWeight = 1;
	if ((pWord.indexOf("+")+pWord.indexOf("=")) >0) {
		var vPair = pWord.split(/=|\+/);
		if (vPair.length >1) {
			vWeight =parseInt(vPair[1]);
		}
	};
	return vWeight;
}
//----End of Method parse_weight  Definition

						
//#################################################################
//# Method: line_is_nonterm_def  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function line_is_nonterm_def_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:line_is_nonterm_def(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.line_is_nonterm_def(pWord);
	//-------------------------------------------------------
	if (pWord.length == 0) {
		pWord = " ";
	}
	var vReturn = ( (pWord.charAt(0) != " ") && 
	     			(pWord.charAt(0) != "}") && 
	     			(pWord.charAt(0) != "!") && 
	     			(pWord.charAt(0) != "*") && 
	     			(pWord.charAt(0) != "#") && 
	     			(pWord.charAt(0) != "?") && 
	     			(pWord.charAt(0) != ">") );
	return vReturn;

}
//----End of Method line_is_nonterm_def Definition

						
//#################################################################
//# Method: term_after_nonterm  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function term_after_nonterm_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:term_after_nonterm(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.term_after_nonterm(pWord);
	//-------------------------------------------------------
	var vReturn = "";
	if (this.line_is_nonterm_def(pWord)) {
		var vFound = pWord.indexOf(" ");
		if (vFound <=0) {
			vFound = pWord.indexOf("\t");
		};
		if (vFound >0) {
			vReturn = pWord.substr(vFound+1,pWord.length-vFound);
		}
	} else {
		//alert("Parsing Error: '"+pWord+"' is not a non-terminal definition in the Grammar!\nparsenode.js:393");
	}
	//pWord = vReturn.replace(/[ \t]/g,"");
	//return vReturn;
	return vReturn.replace(/[ \t]/g,"");
}
//----End of Method term_after_nonterm Definition
						
//#################################################################
//# Method: check_nonterm_bracket  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function check_nonterm_bracket_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:check_nonterm_bracket(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.check_nonterm_bracket(pWord);
	//-------------------------------------------------------
	//alert("parsenode.js:121 -  check_nonterm_bracket("+pWord+")\n '=' found in "+pWord);
	var vFound = -1;
	if (pWord == "") {
		pWord = " ";
	}
	if ( this.line_is_nonterm_def(pWord) )
	{
		//--- pWord is a non-terminal definition ---------------
		if (pWord.indexOf(" ")>1) {
			//--- the definition contains at least one blank ---
			var vSplitArray = pWord.split(/\s+/);
			if (vSplitArray.length > 1) {
				//---- the split array contain 2 entries -------
				if (vSplitArray[1].charAt(0) == "{") {
					//--- First character is "{" and -----------
					//--- necessary to avoid matching  e.g. \begin{itemize}
					vFound = pWord.indexOf("{");
				}
			}
		}
	};
	return vFound;

}
//----End of Method check_nonterm_bracket Definition

						
//#################################################################
//# Method: parse_nonterm_bracket  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function parse_nonterm_bracket_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:parse_nonterm_bracket(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.parse_nonterm_bracket(pWord);
	//-------------------------------------------------------
	//alert("parsenode.js:121 -  m_parse_nonterm()\n '=' found in "+pWord);
	var vReturn = pWord;
	var vFound = this.check_nonterm_bracket(pWord);
	if (vFound >0) {
		//var vPair = pWord.split(/=|\+/);
		var vPair = pWord.split("{");
		vReturn = vPair[0];
	}	
	return vReturn;
}
//----End of Method parse_nonterm_bracket Definition

						
//#################################################################
//# Method: parse_operator  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function parse_operator_ParseNode(pWord) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:parse_operator(pWord)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.parse_operator(pWord);
	//-------------------------------------------------------
	var vOperator = "";
	var vFound = pWord.indexOf("=");
	if (vFound >0) {
		vOperator = "=";
	};
	vFound = pWord.indexOf("+");
	if (vFound >0) {
		vOperator = "+";
	};
	vFound = pWord.indexOf("-");
	if (vFound >0) {
		vOperator = "-";
	};
	var vBlankPos = pWord.indexOf(" ");
	if ((vBlankPos>=0) && (vBlankPos<vFound)) {
		vOperator = "";
	}
	return vOperator;

}
//----End of Method parse_operator Definition


//#################################################################
//# Method: missing_nonterm  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function missing_nonterm_ParseNode (pText,pRules) {
	var vResults = pText.match(/[A-Z][A-Z]+_[A-Z_]+[A-Z]+/g);
	var vReturn = "";
	var vCR = "";
	var vTerm = "";
	var vFoundIndex = -1;
	//alert("missing_nonterm()\nparsenode.js:348\n"+pText);
 	if(vResults) {
 		for(i=0;i<vResults.length;++i) {
			//alert(vResults[i]);
			vFoundIndex = pRules.findNonTerm(vResults[i]);
			if (vFoundIndex<0) {
				//alert("Results["+i+"]="+vResults[i]+" NOT found!\nparsenode.js:353");
				vReturn += vCR + vResults[i] +" "+ this.nonterm2term(vResults[i]);
				vCR = "\n";
				//alert("parsnode.js:276 ("+i+") "+vReturn);
			} else {
				//alert("FOUND Results["+i+"]="+vResults[i]+" \nparsenode.js:353");
			}
 		}
	}
	return vReturn;
}

//#################################################################
//# Method: nonterm2term  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function nonterm2term_ParseNode (pNONTERM) {
	var vTerm = pNONTERM.replace(/_/g," ");
	return vTerm.toLowerCase();
}

function m_wordarray2undef_nonterm (pParseArray,pRules) {
	var vNonTerm = "";
	var vNonTermDefinition = "";
	var vCompareNonTerm = "";
	var vGrammarText = "";
	var vNewLine = "";
	var vLength = 0;
	var vFoundIndex = -1;
	var vRuleDefMissing = true;
	var vExportArray = new Array();
	for (var i=0; i<pParseArray.length; i++) {
		vCompareNonTerm = pParseArray[i];
		vLength = pParseArray[i].length;
		if ((vLength>=this.minwordlength) && (vLength<=this.maxwordlength)){
			vFoundIndex = vCompareNonTerm.indexOf("=");			
			vNonTerm = this.convert2nonterm(pParseArray[i]);
			if (vFoundIndex>0) {
				vCompareNonTerm = pParseArray[i].substring(0,vFoundIndex);
				vNonTerm = this.convert2nonterm(vCompareNonTerm);
			} else {
				vFoundIndex = vCompareNonTerm.indexOf("+");
				if (vFoundIndex>0) {
					vCompareNonTerm = pParseArray[i].substring(0,vFoundIndex);
					vNonTerm = this.convert2nonterm(vCompareNonTerm);
				};
			};
			//alert("parsenode.js:163 - m_wordarray2undef_nonterm()\nvNonTerm = "+vNonTerm+"\nvCompareNonTerm="+vCompareNonTerm);				
			if (vNonTerm == vCompareNonTerm) {
				//alert("parsenode.js:166 - m_wordarray2undef_nonterm()\nvNonTerm = "+vNonTerm+"\nvCompareNonTerm="+vCompareNonTerm);
				//--- Now we are sure that pParseArray[i] is a non-term
				vNonTermDefinition = pParseArray[i].toLowerCase(); 
				//vNonTermDefinition = vNonTermDefinition.search(/^[a-z]/g," "); 
				//--- Leave vNonTerm as it is and do not add "WRD_"
				//if (vNonTerm.indexOf("WRD_")==0) {
				//	vNonTerm = "WRD_" + this.convert2nonterm(vNonTerm);
				//};
				//--- check if vNonTerm is already defined in pRules
				vFoundIndex = pRules.findNonTerm(vNonTerm);
				if (vFoundIndex<0) {
					//alert("parsenode.js:70 m_wordarray2gramma()\nWRD_"+vNonTerm+" "+vNonTermDefinition);
					//vGrammarText += vNewLine + vNonTerm + " "+vNonTermDefinition;
					//vNewLine = "\n";
					vRuleDefMissing = true;
					for (var j=0; j<vExportArray.length; j++) {
						if (vExportArray[j].indexOf(vNonTerm+" ")>=0) {
							vRuleDefMissing = false;
						}
					};
					if (vRuleDefMissing) {
						vNonTermDefinition = vNonTermDefinition.replace(/[_]+/g," "); 
						vExportArray.push(vNonTerm + " "+vNonTermDefinition);
					};
				};
			};
		};
	};
	vExportArray.sort();
	vGrammarText = vExportArray.join("\n");
	return vGrammarText;
};

function m_wordarray2grammar (pParseArray) {
	var vNonTerm = "";
	var vNonTermDefinition = "";
	var vGrammarText = "";
	var vNewLine = "";
	var vLength = 0;
	for (var i=0; i<pParseArray.length; i++) {
		vLength = pParseArray[i].length;
		if ((vLength>=this.minwordlength) && (vLength<=this.maxwordlength)){
			vNonTerm = this.convert2nonterm(pParseArray[i]);
			vNonTermDefinition = this.remove_interpunction(pParseArray[i]);
			//--- check if vNonTermDefinition  is not a Non-Terminal Symbol of the Grammar
			if (vNonTerm != vNonTermDefinition) {
				//top.vArticleGenerator.append_RuleRecord("WRD_"+vNonTerm,vNonTermDefinition,1,"words");
				//alert("parsenode.js:70 m_wordarray2gramma()\nWRD_"+vNonTerm+" "+vNonTermDefinition);
				vGrammarText += vNewLine+"WRD_"+vNonTerm + " "+vNonTermDefinition;
				vNewLine = "\n";
			};
		};
	};
	return vGrammarText;
};


function m_sentence_corrections (pString) {
	var vGrammarText = pString.replace(/^\s+/,"");
	if (!(vGrammarText.indexOf("\n") == 0)) {
	    vGrammarText = "\n"+vGrammarText;
	}
	return vGrammarText.replace(/\n/g,this.indent);;
}


function X_m_split2sentence (pString) {
 	return pString.split(/\. |\.\n|\.\t/);
}

function m_split2sentence (pString) {
    var vString = pString.replace(/e\.g\./g,"__e__g__");
    vString = vString.replace(/z\.B\./g,"__z__B__");
	//pString = vString.replace(/e\.g\./g,"#_e_#_g_#");
	//var vArray =  pString.split(/. |.\n|.\t/);
	// for (var i=0; i< vArray.length; i++) {
// 		vArray[i] = vArray[i].replace(/#_z_#_B_#/g,"z.B.");
// 		vArray[i] = vArray[i].replace(/#_e_#_g_#/g,"e.g.");
// 	};
 	return vString.split(/\. |\.\n|\.\t/);
}

function m_sentencearray2grammar (pParseArray,pSectionID) {
	var vNonTerm = "";
	var vNonTermDefinition = "";
	var vGrammarText = "";
	var vNewLine = "";
	var vLengthTest = "";
	var vSectionDef = "SEN_"+pSectionID+" {\n"; 
	for (var i=0; i<pParseArray.length; i++) {
			vNonTerm = "SEN_"+pSectionID+"_"+this.sentence_nonterm(i);
			vNonTermDefinition =  this.sentence_corrections(pParseArray[i]);
			vNonTermDefinition = vNonTermDefinition.replace(/__e__g__/g,"e.g.");
			vNonTermDefinition = vNonTermDefinition.replace(/__z__B__/g,"z.B.");
			vLengthTest = vNonTermDefinition.replace(/\s/g,"");
			if (vLengthTest.length>0) {
				//---Sentence NONTERM Definition -----
				vGrammarText += vNewLine + vNonTerm + " {"+ vNonTermDefinition +". \n}";
				vNewLine = "\n";
				//---Section NONTERM Definition ------
				vTextHead = pParseArray[i].replace(/^\n/,"");
				vCRpos = vTextHead.indexOf("\n"); 
				if (vCRpos<0) {
					vCRpos = vTextHead.length;
				}
				vSectionDef += "  ### Def: SEN_"+pSectionID+"_"+this.sentence_nonterm(i)+" ### " + vTextHead.substring(0,vCRpos) +"\n";
				vSectionDef += "  "+vNonTerm+"\n";
			}
	};
	vSectionDef += "}\n";
	vSectionDef = this.sentencearray2nonterm(pParseArray,pSectionID);
	return vSectionDef + vGrammarText;
};

function m_sentencearray2nonterm (pParseArray,pSectionID) {
	var vTextHead = "";
	var vGrammarText = "SEN_"+pSectionID+" {\n"; 
	var vCRpos = 0;
	for (var i=0; i<pParseArray.length; i++) {
			vTextHead = pParseArray[i].replace(/^\n/,"");
			//vTextHead = vTextHead.replace(/\t/g,"");
			//vTextHead = vTextHead.replace(/ /g,"");
			//vCRpos = pParseArray[i].indexOf("\n");
			vCRpos = vTextHead.indexOf("\n"); 
			if (vCRpos<0) {
				vCRpos = vTextHead.length;
			}
			vGrammarText += "  ### Def: SEN_"+pSectionID+"_"+this.sentence_nonterm(i)+" ### " + vTextHead.substring(0,vCRpos) +"\n";
			vGrammarText += "  SEN_"+pSectionID+"_"+this.sentence_nonterm(i) + "\n";
	};
	vGrammarText += "}\n";
	return vGrammarText;
};

function m_sentence_nonterm(pNr) {
	var vCharString = "AZ";
	var vModulo = vCharString.charCodeAt(1) - vCharString.charCodeAt(0) + 1;
	var vReturnValue = "";
	var vCharCode = 0;
	var vRest = 0;
	while (pNr >= 0) {
		vRest = pNr % vModulo; 
		vCharCode = vCharString.charCodeAt(0) + vRest;
		//alert("vModulo="+vModulo+"\nvCharCode="+vCharCode+"\nvRest="+vRest+"\npNr="+pNr);
		//vCharCode = 65 + vRest;
		vReturnValue = String.fromCharCode(vCharCode) + vReturnValue;
		pNr = pNr-vRest;
		if (pNr>0) {
			pNr = Math.round( pNr / vModulo )-1;
		} else {
			pNr = -1;
		};
	};
	while (vReturnValue.length < 3) {
		vReturnValue = "_"+vReturnValue;
	}
	//alert("parsenode.js:67 - m_sentence_nonterm()\n"+vReturnValue);
	return vReturnValue;
}


function m_convert2nonterm (pString) {
	var vReturn = this.convert_umlaute(pString);
	vReturn = vReturn.toUpperCase();
// 	pString = vReturn;
// 	vReturn = pString.replace(/\\/g,"");
// 	pString = vReturn;
// 	vReturn = pString.replace(/{/g,"_");
// 	pString = vReturn;
// 	vReturn = pString.replace(/}/g,"");
// 	pString = vReturn;
// 	vReturn = pString.replace(/\w/g,"");
// 	pString = vReturn;
// 	vReturn = this.remove_interpunction(pString);
	//vReturn = this.convert_umlaute(vReturn);
	vReturn = vReturn.replace(/{/g,"_");
	vReturn = vReturn.replace(/\W/g,"");
	//alert("parsenode.js:158\nm_convert2nonterm ("+pString+")\nreturn "+vReturn);
	return vReturn;

}

						
//#################################################################
//# Method: split_ruletext  
//#    used in Class: ParseNode
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function split_ruletext_ParseNode(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("parsenode.js:split_ruletext(pString)-Call")
	//----Create Object/Instance of ParseNode----
	//    var vMyInstance = new ParseNode();
	//    vMyInstance.split_ruletext(pString);
	//-------------------------------------------------------
	var vSplitArray = this.split2lines(pString);
	var vReturnArray = new Array();
	var vReplaceString = "";
	var vCR = "";
	var vContainsOverwrite = false;
	for (var i=0; i<vSplitArray.length; i++) {
		if (vSplitArray[i].charAt(0)==">") {
			vContainsOverwrite = true;
			if (vReplaceString != "") {
			   vReturnArray.push(vReplaceString);
			};
			vReturnArray.push(vSplitArray[i]);
			vReplaceString = "";
			vCR = "";
		} else {
			vReplaceString += vCR + vSplitArray[i]; 
			vCR = "\n";
		}
	};
	//alert("parsenode.js:823 - vReplaceString="+vReplaceString);
	vReturnArray.push(vReplaceString);			
	return vReturnArray;

}
//----End of Method split_ruletext Definition

function m_split_ruletext(pString) {
}


function m_split2overwrite (pString) {
	var vSplitArray = this.split2lines(pString);
	var vReturnArray = new Array();
	var vReplaceString = "";
	var vCR = "";
	for (var i=0; i<vSplitArray.length; i++) {
		if (vSplitArray[i].charAt(0)==">") {
			if (vReplaceString != "") {
				vReturnArray.push(vReplaceString);
			};
			vReturnArray.push(vSplitArray[i]);
			vReplaceString = "";
			vOverwriteLine = 1;
			vCR = "";
		} else {
			vReplaceString += vCR + vSplitArray[i]; 
			vCR = "\n";
			vOverwriteLine = 0;
		}
	};
	vReturnArray.push(vReplaceString);			
	return vReturnArray;
}

function m_get_overwrite_array (pString) {
	var vRegEx = /\n>.+?\n/;
	var vReturnArray = vRegEx.exec(pString);
	if (vReturnArray== null) {
		vReturnArray = new Array();
	};
	return vReturnArray;
}



function m_split2words (pString) {
	return pString.split(/[ |\n|\t|,]+/);
}

function m_split2lines (pString) {
	return pString.split(/[\n]/);
}

function m_replace_sentence_end_dot (pString) {
	var vReturn = "";
	// var vSenEnd = "SEN_END";
	vReturn = pString.replace(/\. /,vSenEnd+" ");
	pString = vReturn;
	vReturn = pString.replace(/\.\n/,vSenEnd+"\n");
	pString = vReturn;
	vReturn = pString.replace(/\.\t/,vSenEnd+"\t");
	return  pString.split(/\. |\.\n|\.\t/);
}


function m_split2paragraph (pString) {
	return pString.split(/\n\s+\n/);
}

function m_split2sections (pString) {
	return pString.split(this.section_RegEx);	
}

function m_create_section_array (pString,pParseArray) {
	var vReturnArray = new Array();
	var vSection = "";
	var vBegin 	= 0;
	var vEnd	= 0;
	for (var i=0; i< pParseArray.length-1; i++) {
		vBegin 	= pString.indexOf(pParseArray[i]) + pParseArray[i].length;
		vEnd    = pString.indexOf(pParseArray[i+1]);
		vSection =  pString.substring(vBegin,vEnd);
		vReturnArray.push(vSection);
	};
	//alert("pasenode.js:277 - m_create_section_array()\nvReturnArray[0]="+vReturnArray[0]);
	return vReturnArray;	
}


function m_sectionheader2grammar (pString) {
	var vNonTerm = "";
	var vNonTermDefinition = "";
	var vNewLine = "";
	var vParseArray = this.split2sections(pString);
	var vSectionArray = this.create_section_array(pString,vParseArray);
	//alert("pasenode.js:280 - m_sections2grammar()\nvParseArray.length="+vParseArray.length+"\nvSectionArray.length="+vSectionArray.length);
	//------------------------------------------------------
	var vGrammarText = "";
	//------------------------------------------------------
	for (var i=1; i<vParseArray.length; i++) {
			vNonTerm = this.convert2nonterm(vSectionArray[i-1]);
			vGrammarText += vNewLine + "HEADER_"+ vNonTerm + " "+vSectionArray[i-1];
			vNewLine = "\n";
	};
	return vGrammarText;
}

function m_sectionheader2nonterms (pString) {
	var vNonTerm = "";
	var vParseArray = this.split2sections(pString);
	var vSectionArray = this.create_section_array(pString,vParseArray);
	//alert("pasenode.js:280 - m_sections2grammar()\nvParseArray.length="+vParseArray.length+"\nvSectionArray.length="+vSectionArray.length);
	//------------------------------------------------------
	var vGrammarText = "";
	//------------------------------------------------------
	for (var i=1; i<vParseArray.length; i++) {
			vNonTerm = this.convert2nonterm(vSectionArray[i-1]);
			vGrammarText += "###### "+vSectionArray[i-1]+"#####\n";
			vGrammarText += "HEADER_"+ vNonTerm + " \n";
			vGrammarText += "##################################\n\n";
	};
	return vGrammarText;
}


function m_sections2grammar (pString) {
	var vNonTerm = "";
	var vNonTermDefinition = "";
	var vNewLine = "";
	var vParseArray = this.split2sections(pString);
	var vSectionArray = this.create_section_array(pString,vParseArray);
	//alert("pasenode.js:280 - m_sections2grammar()\nvParseArray.length="+vParseArray.length+"\nvSectionArray.length="+vSectionArray.length);
	//------------------------------------------------------
	var vGrammarText = "SEC_INTRO_HEADER {\n ";
	vGrammarText += vParseArray[0].replace(/\n/g,"\n ");
	vGrammarText += "\n}\n";
	//------------------------------------------------------
	for (var i=1; i<vParseArray.length; i++) {
			vNonTerm = this.convert2nonterm(vSectionArray[i-1]);
			vGrammarText += vNewLine + "SEC_"+ vNonTerm + " {\n";
			vGrammarText += " "+vSectionArray[i-1].replace(/\n\n/,"\n");
			vGrammarText += vParseArray[i].replace(/\n/g,"\n ");
			vGrammarText += "\n}";
			vNewLine = "\n";
	};
	return vGrammarText;
}

function m_sections2nonterms (pString) {
	var vNonTerm = "";
	var vParseArray = this.split2sections(pString);
	var vSectionArray = this.create_section_array(pString,vParseArray);
	//alert("pasenode.js:280 - m_sections2grammar()\nvParseArray.length="+vParseArray.length+"\nvSectionArray.length="+vSectionArray.length);
	//------------------------------------------------------
	var vGrammarText = "SEC_INTRO_HEADER \n\n";
	//------------------------------------------------------
	for (var i=1; i<vParseArray.length; i++) {
			vNonTerm = this.convert2nonterm(vSectionArray[i-1]);
			vGrammarText += "###### "+vSectionArray[i-1]+"#####\n";
			vGrammarText += "SEC_"+ vNonTerm + " \n";
			vGrammarText += "##################################\n\n";
	};
	return vGrammarText;
}

function m_and2commalist (pContent,pSplitString) {
	var vReturnValue = "";
	var vContentArray = pContent.split(pSplitString);
	if (vContentArray.length <= 1) {
		vReturnValue = pContent;
	} else {
		var vLastElement = vContentArray.pop(); 
		vReturnValue = vContentArray.join(", ");
		vReturnValue + " and "+vLastElement;
	};
	return vReturnValue;
}

function m_and2etal (pContent,pSplitString) {
	var vReturnValue = "";
	var vContentArray = pContent.split(pSplitString);
	if (vContentArray.length <= 2) {
		vReturnValue = pContent; 
	} else {
		vReturnValue = vContentArray[0] +" et.al.";
	}
	return vReturnValue
}

function m_plural_checker (pContent,pSplitString) {
	var vReturnValue = false;
	var vContentArray = pContent.split(pSplitString);
	if (vContentArray.length >1) {
		vReturnValue = true; 
	}
	return vReturnValue;
}
