//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    27.04.2010,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2010                  #
//#################################################



//alert("loading JS-Libary: rules.js");



// ##########################################################################################

// Class: OOA ArticleGenerator

// ======  The OOA ArticleGenerator handles a list of objects

// and has display, edit and ArticleGenerators options 
// ##########################################################################################
// var HTML_Line greedy RegEx 		/(^<.+>)/;
// var HTML_Zeile NOT greedy RegEx	/(^<.+?>)/;
// ##########################################################################################
// Column Description
//    -1- NONTERM   
//    -2- Terminal   
//    -3- Weight   
//    -4- GrammarID   
//    -5- Comment or SYSTEM   

//---- Constructor ArticleGenerator() - OBJECT -

function Rules() {
	//---Super Class------------------------
	this.SuperClass = Matrix;
	this.SuperClass();
	//---Associations-----------------------
	this.assGrammar 		= -1;
	//---Attributes-------------------------
	this.name   = 'Rules';
	this.parsenode = new ParseNode();
	this.Call_onchange_update = "onchange_update";
	this.is_sorted			= false;
	this.assGrammar			= null;
	this.assCitations		= null;
	//---Methods---------
	this.init_form          	 = init_form_Rules;
	this.append_rule        	 = append_rule_Rules;
	this.commentline_prefix		 = commentline_prefix_Rules;
	this.convert2comment		 = convert2comment_Rules;
	this.convert2nonterm 		 = m_convert2nonterm;
	this.create_prefix			 = create_prefix_Rules;
	this.edit_row 				 = edit_row_Rules;
	this.editform2ruledef   	 = m_editform2ruledef;
	this.export_ruleline		 = export_line_Rules;
	this.export_source 			 = export_source_Rules;
	this.find_insert_pos		 = find_insert_pos_Rules;
	this.findColFromIndex   	 = findColFromIndex_Rules;
	this.findNonTerm			 = m_find_NonTerm_Rules;
	this.getGrammarIDs      	 = getGrammarIDs_Rules;
	this.handle_overwrite   	 = handle_overwrite_Rules;
	this.html_grammar	    	 = html_Grammar;
	this.import_grammar	 		 = import_grammar_Rules
	this.insert_missing_rule_for = insert_missing_rule_for_Rules;
	this.insert_rule			 = insert_rule_Rules;
	this.missing_nonterm    	 = missing_nonterm_Rules;
	this.nonterm2commalist 		 = m_nonterm2commalist;
	this.onchange_update    	 = m_onchange_update_Rules; //Insert Blan
	this.onchange_update_Super	 = onchange_update_Matrix; 
	this.parse_rule				 = parse_rule_Rules;
	this.remove_grammar	 		 = import_grammar_Rules
	this.ruledef2editform   	 = m_ruledef2editform;
	this.set_sorted				 = set_sorted_Rules;
	this.show_row				 = show_row_Rules;
	this.sort					 = sort_Rules;
	this.sort_super				 = this.sort;
	this.update_rule			 = update_rule_Rules;
	this.upperCaseSectionID  	 = upperCaseSectionID_Rules;
}


//#################################################################
//# Method: init_form  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function init_form_Rules (pFormPath,pObjectPath) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:init_form()-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.init_form();
	//-------------------------------------------------------
	//---Method Class:  "Rules" defined in rules.js---
	this.formPath       = pFormPath;
	this.objectPath     = pObjectPath;
}

//#################################################################
//# Method: set_sorted  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function set_sorted_Rules(pBoolean) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:set_sorted(pBoolean)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.set_sorted(pBoolean);
	//-------------------------------------------------------
	this.is_sorted = pBoolean;
	if (this.is_sorted) {
		this.findColFromIndex    = findColFromIndex_sorted_Rules;
	} else {
		this.findColFromIndex    = findColFromIndex_Rules;
	}
}
//----End of Method set_sorted Definition

//#################################################################
//# Method: getGrammarIDs  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function getGrammarIDs_Rules () {
	var vGrammarIDs = new Array("--ALL--");
	// alert("rules.js:56 - m_get_grammar_IDs()");
	for (var i=1; i<=this.rows; i++) {
		vSectionID = this[i][4].toUpperCase();
		if (vGrammarIDs.length==0) {
			vGrammarIDs.push(vSectionID)
		} else {
			var vFound = -1;
			for (var j=0; j<vGrammarIDs.length; j++) {
				if (vGrammarIDs[j] == vSectionID) {
					vFound = j;
				}
			}
			if (vFound<0) {
				vGrammarIDs.push(vSectionID)
			}
		};
	}
	return vGrammarIDs;
}
						
//#################################################################
//# Method: append_rule  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from m_append_RuleRecord in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function append_rule_Rules(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment) {
	// append RuleRecord parses "+", "-" and "=" for weights in the nonterm string;
	//alert("rules.js:179 - append_rule()");
	this.set_sorted(false);
	this.append_row();
	var vComment = "";
	if (pComment) {
		vComment = pComment;
	}
	var vRows = this.rows;
	if (pOperator == "-") {
		pWeight = -pWeight;
	};
	//this[vRows][1] = this.convert2nonterm(pNONTERMsymbol);
	this[vRows][1] = pNONTERMsymbol.replace(/ /g,"");
	this[vRows][2] = pTERMsymbol;
	this[vRows][3] = pWeight;							
	this[vRows][4] = pGrammarID;							
	this[vRows][5] = vComment;							
}

//#################################################################
//# Method: insert_rule  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from m_insert_ruleRecord in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function insert_rule_Rules(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment) {
	// append RuleRecord parses "+", "-" and "=" for weights in the nonterm string;
	//------RULES: Insert Operation-------------
	//alert("rules.js:210 - insert_rule()");
	var vIs_Sorted = this.is_sorted;
	this.append_rule(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment);
	var vInsert_Pos = this.rows;
	var vSwapIndex = this.find_insert_pos(pNONTERMsymbol);
	//alert("rules.js:217 - insert_rule() - BEFORE swap("+vSwapIndex+","+vInsert_Pos+") Objects ");
	if (vInsert_Pos != vSwapIndex) {
		this.swap(vInsert_Pos,vSwapIndex);
		vInsert_Pos = vSwapIndex
	};
	//alert("rules.js:217 - insert_rule() - AFTER swap Objects");
	//this.assGrammar.insert_grammar_index(vSwapIndex);
	this.is_sorted = vIs_Sorted;
	return vInsert_Pos;
}

//#################################################################
//# Method: insert_missing_rule_for  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from m_insert_ruleRecord in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function insert_missing_rule_for_Rules(pNONTERM,pGrammarID) {
	var vTerm = this.parsenode.nonterm2term(pNONTERM);
	//insert_rule(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment)
	var vInsertPos = this.insert_rule(pNONTERM,vTerm,"","",pGrammarID,"");
	//return the index where the record of the rule was inserted
	return vInsertPos;
}

//#################################################################
//# Method: missing_nonterm  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from m_append_RuleRecord in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function missing_nonterm_Rules (pStart,pEnd) {
	var vReturn = "";
	var vString = "";
	var vCR = "";
	var vStart = 1;
	var vEnd   = this.rows;
	if (pStart) vStart = pStart;
	if (pEnd)   vEnd   = pEnd;
	for (var i=vStart; i<=vEnd; i++) {
		vString = this.parsenode.missing_nonterm(this[i][2],this);
	 	if (vString != "") {
			vReturn += vCR + vString;
			vCR = "\n";
		}
	}
	vCR = "";
	//alert("rules.js:117 - vReturn="+vReturn);
	vReturn = this.parsenode.remove_double_lines(vReturn);
	return vReturn
}

//#################################################################
//# Method: handle_overwrite  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function handle_overwrite_Rules (pOverwriteLine) {
	var vLine = pOverwriteLine.substring(1, pOverwriteLine.length);
	var vReturnLine = pOverwriteLine;
	// alert("rules.js:51 - m_handle_overwrite_Rules()\n"+pOverwriteLine);
	var vReturnArray = this.parse_rule(pOverwriteLine);
	// vReturnArray = (">","NON_TERM","term definition","+",3,"OVERWRITE");
	//alert("rules.js:57\nhandle_overwrite('"+pOverwriteLine+"')");
	var vKeywords = vReturnArray[2];
	//var vKeywords = this.assGrammar.replace_nonterms(vReturnArray[2]);
	var vCitationCount = vReturnArray[4];
	if (vReturnArray[1] == "SYS_KEYWORDS") {
		//alert("rules.js:178 -  m_handle_overwrite()\n Search in Citations for Keywords and"+
		//	  "\n create "+ vCitationCount +" citations for the keywords\n "+ vKeywords);
		//vReturnLine = ">SYS_CITATION [[[3]]] [[[7]]] [[[2]]]"; 
		var vCiteTerm = "";
		with (this.assCitations) {
			//aTolerance = 10;
			search(vKeywords,10);
			vCiteTerm = create_citeID(vCitationCount);
			vReturnLine = ">SYS_CITATION"+ vCiteTerm;
		};
		this.update_rule("SYS_CITATION",vCiteTerm,"","1","SYSTEM");
	} 
	//if (vReturnArray[1].indexOf("LOOP_")>=0) {alert("rules.js:58\nupdate_rule('"+vReturnArray[1]+"','"+vReturnArray[2]+"','"+vReturnArray[3]+"','"+vReturnArray[4]+"','"+vReturnArray[5]+")")};
	this.update_rule(vReturnArray[1],vReturnArray[2],vReturnArray[3],vReturnArray[4],vReturnArray[5]);
	return vReturnLine;
}
						
//#################################################################
//# Method: parse_rule  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function parse_rule_Rules(pRuleLine) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:parse_rule(pRuleIndex)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.parse_rule(pRuleLine);
	//-------------------------------------------------------
	var vLine = pRuleLine.substring(1,pRuleLine.length);
	//alert("rules.js:61 - m_parse_rules()\n"+pRuleLine);
	var vReturnArray = new Array();
	var vNONTERMsymbol = "";
	var vNONTERM_Weight = "";
	var vTERMsymbol    = "";
	var vN = -1;
	var vDefaultWeight = 1;
	var vWeightString  = "";
	var vWeight	= 0;
	var vPlusEqual_Pos = 0;
	var vPlusEqual = "";
	var vSectionID = "OVERWRITE";
	//---- push an overwrite symbol to Array -----
	if (pRuleLine.charAt(0)==">") {
		vReturnArray.push(">");
		pRuleLine = pRuleLine.substring(1,pRuleLine.length);
	} else {
		vReturnArray.push("");
	};
	//---- find the the first Blank or Tab ----
	var vN = pRuleLine.indexOf(" ");
	//---- RuleLine contains a white space 
	if (vN >0) {
		//alert("rules.js:65 - m_parse_rule()\nCONTAINS BLANK\n" + pRuleLine);
		vNONTERM_Weight = pRuleLine.substring(0, vN);
		vTERMsymbol     = pRuleLine.substring(vN+1,pRuleLine.length);
	} else {
		vNONTERM_Weight = pRuleLine;
	};
	//alert("rules.js:83 - m_parse_rule()\nvTERMsymbol="+vTERMsymbol);
	//---- Check if NONTERM contains a "+" of "=" -------------------
	var vPlusEqual_Pos = vNONTERM_Weight.indexOf("+");
	if (vPlusEqual_Pos<0) {
		vPlusEqual_Pos = vNONTERM_Weight.indexOf("=");
	};
	if (vPlusEqual_Pos >0) {
			//------- Parse Integer behind "+" or "=" and store operator ----
			vPlusEqual 		= vNONTERM_Weight.charAt(vPlusEqual_Pos);
			vNONTERMsymbol 	= vNONTERM_Weight.substring(0,vPlusEqual_Pos);
			vWeightString 	= vNONTERM_Weight.substring(vPlusEqual_Pos+1,vNONTERM_Weight.length);
			vWeight 		= parseInt(vWeightString);
			//alert("vWeight="+vWeight+" vWeightString="+vWeightString);
	} else {
			vNONTERMsymbol 	= vNONTERM_Weight;
			vPlusEqual		= "=";
			vWeight 		= vDefaultWeight;
	};
	//vTERMsymbol    = vTERMsymbol.replace(/^[ |\t]+/,"");
	//alert("rules.js:102 - m_parse_rule()\nNONTERM='"+ vNONTERMsymbol +"'\nOperator/Value '"+vPlusEqual+vWeight+"'\nTERM='"+vTERMsymbol+"'");
	//this.append_RuleRecord(vNONTERMsymbol,vTERMsymbol,vWeight,pTitle);		
	//alert("rules.js:107 - m_parse_rule()\ncharAt(0) '"+vReturnArray[0]+"'\nNONTERM='"+ vNONTERMsymbol +"'\nOperator/Value '"+vPlusEqual+vWeight+"'\nTERM='"+vTERMsymbol);
	vReturnArray.push(vNONTERMsymbol);
	vReturnArray.push(vTERMsymbol);
	vReturnArray.push(vPlusEqual);
	vReturnArray.push(vWeight);
	vReturnArray.push(vSectionID);
	// vReturnArray = (">","NON_TERM","term definition","+",3,"OVERWRITE")
	return vReturnArray; 
}
//----End of Method parse_rule Definition

						
//#################################################################
//# Method: edit_row  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function edit_row_Rules(pRow) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:edit_row(pRow)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.edit_row(pRow);
	//-------------------------------------------------------
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	var vComment = "&nbsp;"
	var vCol = 0;
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr>";
	//alert("this[pRow][j][4]="+this[pRow][j][4]);
	vContentHTML += "<td  align='center' valign='top'>";
	vCol = 1;
	vContentHTML +=	this.create_inputtext(pRow,vCol,this[pRow][vCol]," size='18' ");
	vContentHTML += "\nVar"+pRow+"</td>\n<td  align='center' valign='top'>";				
	vCol = 3;
	vContentHTML += this.create_inputtext(pRow,vCol,this[pRow][vCol]," size='3' ");
	vContentHTML += "Weight"+pRow+"</td>\n<td  align='center' valign='top'>";				
	vCol = 4;
	vContentHTML += this.create_inputtext(pRow,vCol,this[pRow][vCol].toUpperCase()," size='12' ");
	vContentHTML += "Section-ID"+pRow+"</td>\n<td  align='center' valign='top'>";				
	vCol = 2;
	vContentHTML += this.create_textarea(pRow,vCol,this[pRow][vCol]," cols='80' rows='3' ");
	vCol = 5;
	vContentHTML += "<br/><b>Comment:</b><br/>\n";
	vContentHTML += this.create_textarea(pRow,vCol,this[pRow][vCol]," cols='80' rows='3' ");
	vContentHTML += "</td>\n</tr>\n";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	return vContentHTML; 
}
//----End of Method edit_row Definition

//#################################################################
//# Method: show_row  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################
function show_row_Rules(pRow) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr>";
	vContentHTML +="<td>" + pRow + "</td>";
	for (var j=1; j<=this.cols; j++) {
		//vContentHTML +="<td><nobr>" + this[pRow][j] + "</nobr></td>";
		vContentHTML +="<td>" + this[pRow][j] + "</td>";
	};
	vContentHTML +="</tr>";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	return vContentHTML; 
}
//----End of Method show_row Definition


//#################################################################
//# Method: sort  
//#    used in Class: Rules
//#                
//# Comment: This method is sorts the rule defs                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function sort_Rules() {
	//this.sort_super();
	//alert("rules.js:487 - sort_Rules()");
	this.quick_sort(qs_order_default_Matrix,qs_value_col_Matrix,1);
	this.set_sorted(true);
}
//----End of Method sort Definition

						
//#################################################################
//# Method: convert2comment  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function convert2comment_Rules(pLines) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:convert2comment(pLines)-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.convert2comment(pLines);
	//-------------------------------------------------------
	var vReturn = "#"+pLines.replace(/\n/g,"\n#");
	//vReturn = vReturn.replace(/#\n/g,"\n");
	return vReturn.replace(/\n#\n/g,"\n\n");	
}
//----End of Method convert2comment Definition

//#################################################################
//# Method: remove_grammar  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               17.1.2014             
//# last modifications    17.1.2014             
//#################################################################

function remove_grammar_Rules(pGrammarID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:remove_grammar(pGrammarID)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.remove_grammar(pGrammarID);
	//-------------------------------------------------------
	if (pGrammarID) {
		for (var i=this.rows; i>=1; i--) {
			//----- write the Non-terminal if it has the SectionID "pGrammarID"
			if (pGrammarID==this[i][4]) {
				this.remove(i);
			}
		};
	};
}
//----End of Method remove_grammar Definition
						
//#################################################################
//# Method: import_grammar  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from method in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function import_grammar_Rules (pInputString,pGrammarID) {
	 //alert("ArticleGenerator.js:587 - import_grammar_Rules()");
	this.set_sorted(false);
	//this.remove_grammar(pGrammarID);
	pInputString = pInputString.replace(/\t/g," ");
    var vImport = pInputString.split("\n");
	//alert("import.html:15 - vImport.length="+vImport.length);
	var vOutput = "";
	var vNORULE     = 0;
	var vONELINER   = 1;
	var vBLOCKSTART = 2;
	var vBLOCK1LINE	= 3;
	var vBLOCK		= 4;
	var vBLOCKEND   = 5;
	var vParseStatus = vNORULE;
	//----------------------------------
	var vNONTERM  = "";
	var vOperator = "";
	var vWeight   = "";
	var vTerm     = "";
	var vComment  = "";
	//----------------------------------
	var vCR   = "";
	var vCommentCR   = "";
	//for (var i=0; i<vImport.length; i++) {
	var i=0;
	while (i<vImport.length) {
	    //--- Only Commentlines are used for NONTERM 
		if (vParseStatus == vNORULE) {
			//if (vImport[i].replace(/[ \t]/,"") == "")
			if (vImport[i].replace(/\w/g,"")  == "") {
				vComment = "";
				vCommentCR = "";
			};
		}
	    //-----COMMENT---------------------------------------------------------
		if (vImport[i].charAt(0) == "#") {
			//----COMMENT: "#" in as first character in Line-----
			vOutput += vImport[i] + "\n";
			var vCommentLine = vImport[i].substr(1,vImport[i].length-1);
			if (vParseStatus == vNORULE) {
				vComment += vCommentCR + vCommentLine;
				vCommentCR = "\n";
			} else if (vParseStatus >= vBLOCK1LINE) {
				//---- Add inline Comments in the Def to Termial Def of Rule
				//vTerm += vCR + vCommentLine;
				//vCR = "\n";
				//---- extract inline Comments in the Term Def and add to vComment of Rule 
				vComment += vCommentCR + vCommentLine;
				vCommentCR = "\n";
			}
		//-----BLANK FIRST CHAR------------------------------------------------
		} else if (vImport[i].charAt(0) == " ") {
			if (vParseStatus > vBLOCKSTART) {
				vOutput += vImport[i] + "\n";
				vTerm += vCR + vImport[i];
				vCR = "\n";
			} else {
			 	vParseStatus = vNORULE;
				vCR = "";
			}
		//-----OVERWRITE------------------------------------------------------
		} else if (vImport[i].charAt(0) == ">") {
			if (vParseStatus > vBLOCKSTART) {
				vOutput += vImport[i] + "\n";
				vTerm += vCR + vImport[i];
				vCR = "\n";
			} else {
			 	alert("WARNING: Overwrite Variable used outside a NONTERM Definition!\n"
			 		   + vImport[i] +"\nOverwrite Definition was performed.\nrules.js:380");
			 	this.handle_overwrite(vImport[i]);   
			}
		//-----BLOCK END-------------------------------------------------------
		} else if (vImport[i].charAt(0) == "}") {
			//----BLOCKEND detected------
				//alert("WARNING: unexpected Blockend while importing grammar()\nLine: "+i+" is BLOCKEND\n"+ vImport[i] +"\nrules.js:400");
				vParseStatus = vBLOCKEND;
				this.append_rule(vNONTERM,vTerm,"+",vWeight,pGrammarID,vComment);
				vParseStatus = vNORULE;
				vTerm = "";
				vComment = "";
		//-----CHECK BLOCKSTART OR ONELINER------------------------------------
		} else {
			//---- Check if we are not part of a Block Definition of Rules ----
			if (vParseStatus == vNORULE) {
				var vNONTERM = this.parsenode.parse_nonterm(vImport[i]);
				if (vNONTERM != "") {
					//----check if e.g. my_test != MY_TEST ------------------------------------ 
					//---- we have NONTERM definition if vNONTERM == vNONTERM.toUpperCase() ---
					//alert(vNONTERM+" == "+ vNONTERM.toUpperCase()+"\nrules.js:1062");
					if (vNONTERM == vNONTERM.toUpperCase()) {
						//vParseStatus = vBLOCKSTART or vBOCK1LINE;
						vOperator = this.parsenode.parse_operator(vImport[i]);
						vWeight   = this.parsenode.parse_weight(vImport[i]);
						if (this.parsenode.check_nonterm_bracket(vImport[i]) < 1) {
							//---- ONE LINE DEFINTION ----------------
							vParseStatus = vBLOCK1LINE;
							vTerm     = this.parsenode.parse_term_onliner(vImport[i]);
							this.append_rule(vNONTERM,vTerm,vOperator,vWeight,pGrammarID,vComment);
							vParseStatus = vNORULE;
							vTerm = "";
							vComment = "";
							vCommentCR = "";
						} else {
							vParseStatus = vBLOCKSTART;
							var lvTerm = this.parsenode.parse_term_part(vImport[i]);
							//var lvTermReduced = lvTerm.replace(/\w/g,"");
							var lvTermReduced = lvTerm.replace(/[ \t]+/g,"");
							if (lvTermReduced  != "{") {
								alert("WARNING (Line "+i+"): Blockstart '"+lvTermReduced+"' contains parts of Definition!\n"
										+ "lvTerm='"+lvTerm+"'\n"+vImport[i] +"\nrules.js:421");
							};
							vParseStatus = vBLOCK;
						}
					} else {
						alert("WARNING (Line "+i+"): Unused line for '"+vNONTERM+"' detected during import of Grammar '"+pGrammarID+"'!\n"+vImport[i]
								+"\nrules.js:427");
					}
				} else {
					//-----EMPTY LINE FOUND outside a Rule Definition------
					var vLineTxt = "";
					if (i>0) {
						vLineTxt = "\n"+vImport[i-1];
					};
					//alert("Empty Grammar Line in Line "+i+"!"+vLineTxt+"\nrules.js:435");
				}
			} else {
				if (vImport[i].replace(/\w/g,"") != "") {
					var lvNONTERM_check = this.parsenode.parse_nonterm(vImport[i]);
					if ((lvNONTERM_check == lvNONTERM_check.toUpperCase()) && (lvNONTERM_check.indexOf("_")>0)) {
						alert("WARNING:(Line "+i+"): Seems to be a rule definition\n  '"+vImport[i]
							+"'\ninside a block - add a blank if possible!"
							+"\nrules.js:443");
					};
				};
				vOutput += vImport[i] + "\n";
				vTerm += vCR + vImport[i];
				vCR = "\n";
		
			}
		};
		i++;
	}; //--END While
	return vOutput;
}

//#################################################################
//# Method: commentline_prefix 
//#    used in Class: Rules
//#                
//# Comment: create a comment line for prefix
//#          e.g. for FORMAT_MYVAR a line "### FORMAT ####...." 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function commentline_prefix_Rules (pNONTERM_prefix) {
	var vHashes = " #############################################################";
	return "#### "+pNONTERM_prefix+ vHashes.substr(0,vHashes.length-pNONTERM_prefix.length)+"\n";
}
//#################################################################
//# Method: create_prefix 
//#    used in Class: Rules
//#                
//# Comment: create a comment line for prefix
//#          e.g. for FORMAT_MYVAR a line "### FORMAT ####...." 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function create_prefix_Rules (pNONTERM) {
	var vPrefix = pNONTERM.split(/_/)[0];
	//alert("vPrefix="+vPrefix+"\nrules.js:697");
	return vPrefix;
}

//#################################################################
//# Method: export_source  
//#    used in Class: Rules
//#                
//# Comment: This method is derived from method in ArticleGenerator                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function export_source_Rules(pSectionID) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//e.g. NON_TERM   single line text for non-term definition
	//     NON_TERM+3 single line text for non-term definition with weight
	//     NON_TERM   {
	//         multiline text 
	//         for non-term definition without weight definition
	//         i.e. weight 1
	//     }
	//     NON_TERM+2  {
	//         multiline text 
	//         for non-term definition with weight definition 2
	//     }
	// this.sort(); //too runtime expensive for big grammars
	//alert("export_source_Rules("+pSectionID+")\nrules.js:709");
	var vContentHTML = "";
	var vIndent = "   ";
	var vNONTERM_prefix = "___NO___RULE___";
	var vNONTERM_prefix_previous = "";
	var vCommentLine = this.commentline_prefix(vNONTERM_prefix);
	this.upperCaseSectionID();
	if (pSectionID) {
		for (var i=1; i<=this.rows; i++) {
			//----- write the Non-terminal if it has the SectionID "pSectionID"
			if (pSectionID==this[i][4]) {
				vNONTERM_prefix_previous = vNONTERM_prefix;
				vNONTERM_prefix = this[i][1].split(/_/)[0];
				if (this[i][5].indexOf(vCommentLine)>=0) this[i][5]="";
				if (vNONTERM_prefix_previous != vNONTERM_prefix) {
					//alert("vNONTERM_prefix_previous != vNONTERM_prefix\n"+vNONTERM_prefix_previous +"!="+ vNONTERM_prefix+"\nrules.js:724");
					vCommentLine = this.commentline_prefix(vNONTERM_prefix);
					vContentHTML += "\n\n" +vCommentLine;
				}
				vContentHTML += this.export_ruleline(i);
			}
		};
	} else {
		for (var i=1; i<=this.rows; i++) {
			//----- write perl Export Rule if it is not SYSTEM
			vNONTERM_prefix_previous = vNONTERM_prefix;
			vNONTERM_prefix = this[i][1].split(/_/)[0];
			if (vNONTERM_prefix_previous != vNONTERM_prefix) {
				vContentHTML += "\n\n" +this.commentline_prefix(this[i][1]);
			}
			vContentHTML += this.export_ruleline(i);
		};
	}
	//alert("rules.js:789 - export_source()");
	//vContentHTML = vContentHTML.replace(/\n[ |\t]+###/g,"\n###");
	return vContentHTML; 
}
//#################################################################
//# Method: export_line  
//#    used in Class: Rules
//#                
//# Comment:                
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function export_line_Rules(i) {
	//----- write the Non-terminal symbol array component [1]
	var vContentHTML = "";
	var vDoubleCheck = 30;
	var vi = 1; 
	var vBoolExport = true;
	var vComment = "";
	if (i>vDoubleCheck) vi=i-vDoubleCheck; 
	for (var c=vi; c<i; c++) {
		if ((this[i][1]==this[c][1]) && ((this[i][2]==this[c][2]))) {
			vBoolExport = false;
		}
	}
	if ((this[i][4] != "SYSTEM") && (vBoolExport)) {
		//---Export #-Comment------
		if (this[i][5] != "")  {
			vComment = this.convert2comment(this[i][5]);
			vPrefixTag = "### "+this.create_prefix(this[i][1])+" ###";
			if (vComment.indexOf(vPrefixTag)<0 ) {
				vContentHTML += this.convert2comment(this[i][5])+"\n";
			};
		}
		//--- Export Edit Comment for Wizzards -------------------
		//if (this[i][4] != "") {
		//	vContentHTML += this.convert2comment(" Edit "+this[i][1]+" of Grammar="+this[i][4])+"\n";
		//}
		//---Export NONTERM Sympbol------
		vContentHTML += this[i][1];
		if (this[i][3] > 1) {
			//--- weight multiplier is <> 1 in array component [3]
			vContentHTML += '+'+this[i][3]+" ";
		} else {
			vContentHTML += " ";
		};
		if (this[i][2].indexOf("\n")>=0) {
			//------- Multi-line definition in array component [2]
			var vCR_insert = "\n";
			if (this[i][2].indexOf("\n")== 0) {
				vCR_insert = "";
			}
			vContentHTML += ' {'+vCR_insert + this.editform2ruledef(this[i][2])+"\n"+'}'+"\n";
		} else {
			//------ Single-line definition in array component [2]
			vContentHTML += " "+this[i][2]+"\n";
		};
	};	
	return vContentHTML;
}
						
//#################################################################
//# Method: findColFromIndex  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function findColFromIndex_Rules(pSearch,pSearchColumn,pFromIndex) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:findColFromIndex(pSearch,pSearchColumn,pFromIndex)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.findColFromIndex(pSearch,pSearchColumn,pFromIndex);
	//-------------------------------------------------------
	var lvRuleFound = -1;
	for (var i=pFromIndex; i<=this.rows; i++) {
		if (this[i][pSearchColumn] == pSearch) {
			lvRuleFound = i;
			break;
		}
	};
	return lvRuleFound;

}
//----End of Method findColFromIndex Definition

						
//#################################################################
//# Method: findColFromIndex_sorted  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function findColFromIndex_sorted_Rules(pSearch,pSearchColumn,pFromIndex) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:865 - findColFromIndex_sorted("+pSearch+",pSearchColumn,pFromIndex)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.findColFromIndex_sorted(pSearch,pSearchColumn,pFromIndex);
	//-------------------------------------------------------
	var lvRuleFound = -1;
	var vLeft   = 1;
	var vRight  = this.rows;
	var i = Math.floor((vLeft+vRight)/2);
	var vCount = 0;
	while (vLeft+1 < vRight) {
		vCount++;
		i = Math.floor((vLeft+vRight)/2);
		//if (vCount>100)
		   //alert("this[i][pSearchColumn] > pSearch\n"+ this[i][pSearchColumn] +" > "+pSearch+"\nrules.js:877");
		   //alert(this[vLeft][pSearchColumn] +" < "+pSearch+" < "+this[vRight][pSearchColumn]+"\nrules.js:877");
		if (this[i][pSearchColumn] > pSearch) {
			//vRight = i-1;
			vRight = i;
		} else if (this[i][pSearchColumn] < pSearch) {
			//vLeft = i+1;
			vLeft = i;
		} else {
			vRight = vLeft;
		};
	}
	if (this[i][pSearchColumn] == pSearch) {
		lvRuleFound = i;
	};
	return lvRuleFound;
}
//----End of Method findColFromIndex_sorted Definition
						
//#################################################################
//# Method: find_insert_pos  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function find_insert_pos_Rules(pSearch,pSearchColumn) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:787 - find_insert_pos(pSearch,pSearchColumn,pFromIndex)-Call");
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.find_insert_pos(pSearch,pSearchColumn,pFromIndex);
	//-------------------------------------------------------
	var vLeft   = 1;
	var vRight  = this.rows;
	if (!pSearchColumn) {
		pSearchColumn=1;
	};
	var i = Math.floor((vLeft+vRight)/2);
	//var vCount = 0;
	while (vLeft < vRight) {
		//vCount++;
		//alert("Left("+vLeft+")="+this[i][pSearchColumn]+"\nRight("+vRight+")="+this[vRight][pSearchColumn] +"\nrules.js:866");
		i = Math.floor((vLeft+vRight)/2);
		if (this[i][pSearchColumn] > pSearch) {
			vRight = i-1;
		} else if (this[i][pSearchColumn] < pSearch) {
			vLeft = i+1;
		} else {
			vLeft = i;
			vLeft=vRight;
		}
	}
	return vLeft;
}
//----End of Method find_insert_pos Definition

//-----RULES-----------
function m_find_NonTerm_Rules(pNONTERMsymbol) {
	return this.findColFromIndex(pNONTERMsymbol,1,1);
}

function m_nonterm2commalist (pNONTERMsymbol) {
	var vReturnValue = "";
	var vComma = "";
	for (var i=1; i<=this.rows; i++) {
		if (this[i][1] == pNONTERMsymbol) {
			vReturnValue += vComma + this[i][2];
			vComma = ",";
		}
	};
	return vReturnValue;
}

function m_editform2ruledef(pFormText) {
	return pFormText
}

function editform2ruledef_indent_Rules(pFormText) {
	var vParseArray = pFormText.split(/[\n]/);
	for (var i=0; i< vParseArray.length; i++) {
		if (vParseArray[i].indexOf(">") == 0) {
		    //alert("rules.js:282\nOverwrite Definition '>' in line:\n"+vParseArray[i]);
		} else if (vParseArray[i].indexOf("?") == 0){
		    //alert("rules.js:282\nEnter Definition '?' in line:\n"+vParseArray[i]);
		} else if (vParseArray[i].indexOf("#") == 0){
		    //alert("rules.js:282\nComment line '#' in line:\n"+vParseArray[i]);
		} else {
		    if (vParseArray[i].charAt(0)!= " ") {
				vParseArray[i] = "  "+vParseArray[i];
			}
		};
	};
	return vParseArray.join("\n");
}

function m_ruledef2editform (pRuleText) {
	return pRuleText;
}

function X_m_ruledef2editform (pRuleText) {  //removes blanks not necessary
	var vParseArray = pRuleText.split(/[\n]/);
	for (var i=0; i< vParseArray.length; i++) {
		if (vParseArray[i].indexOf("  ") == 0) {
			vParseArray[i] = vParseArray[i].substring(2,vParseArray[i].length);
		} else 	if (vParseArray[i].indexOf(" ") == 0) {
			vParseArray[i] = vParseArray[i].substring(1,vParseArray[i].length);
		};
	};
	return vParseArray.join("\n");
}
//----End of Method m_ruledef2editform Definition

//#################################################################
//# Method: update_rule  
//#    used in Class: Rules
//#                
//# Comment: This method is sorts the rule defs                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function update_rule_Rules(pNONTERM,pTerm,pOperator,pWeight,pGrammarID,pComment) {
	this.set_sorted(false);
	var vComment = "";
	if (pComment) {
		vComment = pComment;
	}
	if (pNONTERM != "") {
		var vFoundIndex = this.findNonTerm(pNONTERM);
		if (vFoundIndex>0) {
			//alert("rules.js:238\npNONTERM='"+pNONTERM+"' found in line "+vFoundIndex+" with rules.nonterm="+this[vFoundIndex][1]);
			this[vFoundIndex][2] = pTerm;
			if (pOperator == "+") {
				this[vFoundIndex][3] = pWeight + parseInt(this[vFoundIndex][3]+"");
			} else {
				this[vFoundIndex][3] = pWeight;
			}
			this[vFoundIndex][4] = pGrammarID;		
			if (pComment) {
				this[vFoundIndex][5] = pComment;		
			}
		} else {
			//alert("ERROR: OVERWRITE WARNING\n\nMissing definition for NONTERM='"+pNONTERM+"'!\nPlease insert a definition for '"+pNONTERM+"' in your grammar\nrules.js:238");
			this.insert_rule(pNONTERM,pTerm,pOperator,pWeight,pGrammarID,pComment);
		}
	}
};

//---Depricated------
function m_update_rule(pNONTERM,pTerm,pOperator,pWeight,pGrammarID,pComment) {
	this.set_sorted(false);
	var vComment = "";
	if (pComment) {
		vComment = pComment;
	}
	if (pNONTERM != "") {
		var vFoundIndex = this.findNonTerm(pNONTERM);
		if (vFoundIndex>0) {
			//alert("rules.js:238\npNONTERM='"+pNONTERM+"' found in line "+vFoundIndex+" with rules.nonterm="+this[vFoundIndex][1]);
			this[vFoundIndex][2] = pTerm;
			if (pOperator == "+") {
				this[vFoundIndex][3] = pWeight + parseInt(this[vFoundIndex][3]+"");
			} else {
				this[vFoundIndex][3] = pWeight;
			}
			this[vFoundIndex][4] = pGrammarID;		
			if (pComment) {
				this[vFoundIndex][5] = pComment;		
			}
		} else {
			alert("ERROR: OVERWRITE WARNING\n\nMissing definition for NONTERM='"+pNONTERM+"'!\nPlease insert a definition for '"+pNONTERM+"' in your grammar\nrules.js:238");
			this.append_row();
			var vRows = this.rows;
			this[vRows][1] = pNONTERM.replace(/ /,"");
			this[vRows][2] = pTerm;
			this[vRows][3] = pWeight;							
			this[vRows][4] = pGrammarID;							
			this[vRows][5] = vComment;	
			// Grammarnode does not exist so create a new Node for appending
			lvGrammarNode = new GrammarNode();
			lvGrammarNode.nonterm = this[vRows][1];
			lvGrammarNode.add(this[vRows]);
			this.assGrammar.add(lvGrammarNode);
		}
	}
};

//#################################################################
//# Method: m_onchange_update 
//#    used in Class: Rules
//#                
//# Comment:                
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function m_onchange_update_Rules(pRow,pCol) {
	//---Method already Defined Class:  "Matrix" defined in matrix.js---
	if (pCol==1) {
		this.set_sorted(false);
	}
	var vContent = this.get_formvalue(pRow,pCol);
	vContent = this.editform2ruledef(vContent);
	//alert("m_update_onchange_Rules("+pRow+","+pCol+"):341\n"+vContent);
	this[pRow][pCol] = vContent;
	this.set_formvalue(pRow,pCol,vContent);
};
//----End of Method m_onchange_update Definition

						
//#################################################################
//# Method: upperCaseSectionID  
//#    used in Class: Rules
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function upperCaseSectionID_Rules() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("rules.js:upperCaseSectionID()-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.upperCaseSectionID();
	//-------------------------------------------------------
	var vSectionID = "";
	for (var i=1; i<=this.rows; i++) {
		vSectionID = this[i][4].toUpperCase();
		this[i][4] = vSectionID;
	}
}
//----End of Method upperCaseSectionID Definition


