//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    27.04.2013,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2010                  #
//#################################################



//alert("loading JS-Libary: grammar.js");



// ##########################################################################################

// Class: OOA ArticleGenerator

// ======  The OOA ArticleGenerator handles a list of objects

// and has display, edit and ArticleGenerators options 
// ##########################################################################################



// ##########################################################################################

//---- Constructor Grammar() - OBJECT -
function Grammar() {
	//---Super Class------------------------
	this.SuperClass = MatrixColumn;
	this.SuperClass();
	//---Attributes-------------------------
	this.name = "Grammar";
	this.formPath        = "";
	this.objectPath	 	 = "";
	this.selectedID 	 = "";
	this.assRules		 = null;
	this.promptNotFound  = true;
	//---Methods----------------------------
	this.findColFromIndex 		= findColFromIndex_sorted_Grammar;
	//this.findNonTerm 			= m_find_NonTerm_GRAM;
	this.findNonTerm 			= findNonTerm_Grammar;
	this.find_insert_pos		= find_insert_pos_Grammar;
	this.find_or_create			= find_or_create_Grammar;
	this.insert_grammar_index 	= insert_grammar_index_Grammar;
	this.html_grammar			= html_Grammar;
	this.html_section_grammar	= html_section_Grammar;
    this.edit      				= edit_Grammar;
    this.edit_section_grammar	= editSection_Grammar;
    this.edit_row 				= edit_row_Grammar;
    this.edit_simple_row 		= edit_simple_row_Grammar;
    this.show      				= show_Grammar;
    this.show_row 				= show_row_Grammar;
    this.sort					= sort_Grammar;
    this.row_compare			= m_grammar_compare; 
    // this.row_compare is not inherited because method of Matrix see matrix.js:50
    //this.create_textarea 		= create_textarea_Matrix;
    //this.create_inputtext		= create_inputtext_Matrix;
    this.onchange_update		= m_onchange_update_Grammar;
    this.update					= update_Grammar;

    //alert("grammar.js:48 - Grammar() -  this.length="+this.length);
}
//--------------------------------------------------------------------
// The Grammar consists of GrammarNodes
// All GrammarNodes contain all rules with the same non-term symbol
// The following rules belong to the same GrammarNode
// WRD_PROVIDES provides
// WRD_PROVIDES yields
// WRD_PROVIDES delivers
// The non-term symbol of this GrammarNode is WRD_PROVIDES
// The GrammarNode provides 3 different options to replace the non-term
// symbol WRD_PROVIDES.
//--------------------------------------------------------------------
// var HTML_Line greedy RegEx 		/(^<.+>)/;
// var HTML_Zeile NOT greedy RegEx	/(^<.+?>)/;
//--------------------------------------------------------------------

function GrammarNode() {
	//---Super Class------------------------
	this.SuperClass = MatrixColumn;
	this.SuperClass();
	//-------------------------------------
	//---Attributes-----------------------
	//this.nonterm ="Non-terminal Symbol";
    this.nonterm 			="row3col1";
    this.expand_string 		= "";
    this.post_string		= "";
    this.eval_expand_string = 0;
    this.assRules = -1;
	//-------------------------------------
	//---Methods--------------------------
    this.expand    = m_expand_Grammarnode;
    this.handle_overwrite = m_handle_overwrite_GrammarNode;
	//-------------------------------------
}

function m_expand_Grammarnode() {
	var vReturnValue = "";
	if (this.length == 0) {
		vReturnValue = this.expand_string;
	} else {
		for (var i=1; i<=this.length; i++) {
			vReturnValue += this[i].expand();	
		};
	};
	return vReturnValue;
}

function m_handle_overwrite_GrammarNode(pRuleString) {
	if (pRuleString.charAt(0)==">") {
		if (pRuleString.match(/[A-Z][A-Z_\d\+|=]*\w+{/)) {
			alert("ERROR Overwrite Def.:\nMulti-line Overwrite Definitions are not allowed!\ngrammar.js:101 -  m_handle_overwrite_GrammarNode()");
		} else {
			alert("Parse Rule Line\ngrammar.js:103 - m_handle_overwrite_GrammarNode()");
			
		}
	} else {
		alert("This is not an overwrite rule \ngrammar.js:103 - m_handle_overwrite_GrammarNode()");
			
	}
}

function m_sort1_grammar() {
	this.sort_row(this.grammar_compare,1);
}

function m_sort2_grammar() {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pRows="+pRows+", pCols"+pCols)
	//Bubblesort for rows
	for (var i=1; i<this.length; i++) {
		for (var j=i+1; j<this.length; j++) {
			if (this.grammar_compare(i,j)) {
				//alert("Swap "+i+" and "+j);
				this.swap(i,j)
			}
		}
	};
	//alert("matrix.js:73 - m_append_col() this.cols="+this.cols);
}


//-----GRAMMAR-----------
function m_find_GRAM_col_from_index(pSearch,pFromIndex) {
	var lvRuleFound = -1;
	for (var i=pFromIndex; i<=this.length; i++) {
		if (this[i].nonterm == pSearch) {
			lvRuleFound = i;
			//break;
		}
	};
	return lvRuleFound;
}

						
//#################################################################
//# Method: findColFromIndex_sorted  
//#    used in Class: Grammar
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function findColFromIndex_sorted_Grammar(pSearch,pFromIndex) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("grammar.js:findColFromIndex_sorted(pSearch,pSearchColumn,pFromIndex)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.findColFromIndex_sorted(pSearch,pSearchColumn,pFromIndex);
	//-------------------------------------------------------
	var lvRuleFound = -1;
	var vLeft   = 1;
	//var vRight  = this.rows;
	var vRight  = this.length;
	//alert("vLeft="+vLeft+" vRight="+vRight+"\ngrammar.js:176");
	var i = Math.floor((vLeft+vRight)/2);
	while (vLeft < vRight) {
		i = Math.floor((vLeft+vRight)/2);
		//alert("vLeft="+this[vLeft].nonterm +" vRight="+this[vRight].nonterm+ "\ngrammar.js:179");
		if (this[i].nonterm > pSearch) {
			vRight = i-1;
		} else if (this[i].nonterm < pSearch) {
			vLeft = i+1;
		} else  {
			vRight = vLeft;
		};
		if (this[i].nonterm == pSearch) {
			lvRuleFound = i;
		}
	}
	return lvRuleFound;
}
//----End of Method findColFromIndex_sorted Definition

						
//#################################################################
//# Method: find_insert_pos  
//#    used in Class: Grammar
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function find_insert_pos_Grammar(pSearch) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("grammar.js:find_insert_pos(pSearch,pSearchColumn)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.find_insert_pos(pSearch,pSearchColumn;
	//-------------------------------------------------------
	var lvRuleFound = -1;
	var vLeft   = 1;
	//var vRight  = this.rows;
	var vRight  = this.length;
	//alert("vLeft="+vLeft+" vRight="+vRight+"\ngrammar.js:176");
	var i = Math.floor((vLeft+vRight)/2);
	while (vLeft < vRight) {
		i = Math.floor((vLeft+vRight)/2);
		//alert("vLeft="+this[vLeft].nonterm +" vRight="+this[vRight].nonterm+ "\ngrammar.js:179");
		if (this[i].nonterm > pSearch) {
			vRight = i;
		} else if (this[i].nonterm < pSearch) {
			vLeft = i;
		} else {
			vLeft= i;
			vRight = vLeft;
		}
	}
	return vLeft;
}
//----End of Method find_insert_pos Definition

						
//#################################################################
//# Method: insert_grammar_index  
//#    used in Class: Grammar
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function insert_grammar_index_Grammar(pRuleIndex) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("grammar.js:insert_grammar_index(pRuleIndex)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.insert_grammar_index(pRuleIndex);
	//-------------------------------------------------------
	var vNONTERM_rules = this.assRules[pRuleIndex][1];
	var i = this.find_insert_pos(vNONTERM_rules);
	var vNONTERM_search= this[i].nonterm;
	if (vNONTERM_search == vNONTERM_rules) {
		// append to existing GrammarNode for existing NONTERM
		// if the replacement is not existing
		//alert("grammar.js:388 - update_Grammar()-Call\nOLD Non-Term="+vNONTERM_rules+"\n lenght="+this.grammar.length);
		this[i].add(this.assRules[pRuleIndex]);
	} else {
		// Grammarnode does not exist so create a new Node for appending
		lvGrammarNode = new GrammarNode();
		lvGrammarNode.nonterm = vNONTERM_rules;
		lvGrammarNode.add(this.assRules[i]);
		this.add(lvGrammarNode);
		this.swap(this.length,i);
		//alert("grammar.js:270 - insert_grammar_index()-Call\nNEW Non-Term="+vNONTERM_rules+"\n lenght="+this.grammar.length);
	};

}
//----End of Method insert_grammar_index Definition

//#################################################################
//# Method: add_missing  
//#    used in Class: Grammar
//#                
//# Comment:                        rules.js
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function add_missing_Grammar(pNON_TERM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("grammar.js:add_missing(pNON_TERM)-Call")
	//----Create Object/Instance of Rules----
	//    var vMyInstance = new Rules();
	//    vMyInstance.add_missing(pNON_TERM);
	//-------------------------------------------------------
	var pRuleIndex = this.assRules.insert_missing_rule_for(pNON_TERM,"MISSING");
	var i = this.find_insert_pos(vNONTERM_rules);
	var vNONTERM_search= this[i].nonterm;
	if (vNONTERM_search == vNONTERM_rules) {
		// append to existing GrammarNode for existing NONTERM
		// if the replacement is not existing
		//alert("grammar.js:388 - update_Grammar()-Call\nOLD Non-Term="+vNONTERM_rules+"\n lenght="+this.grammar.length);
		this[i].add(this.assRules[pRuleIndex]);
	} else {
		// Grammarnode does not exist so create a new Node for appending
		lvGrammarNode = new GrammarNode();
		lvGrammarNode.nonterm = pNON_TERM;
		lvGrammarNode.add(this.assRules[pRuleIndex]);
		alert("grammar.js:314 - add_missing()-Call\nNEW Non-Term="+pNON_TERM+"\n length="+this.length);
		this.add(lvGrammarNode);
		this.swap(this.length,i);
		alert("grammar.js:317 - add_missing()-Call\nNEW Non-Term="+pNON_TERM+"\n length="+this.length);
	};

}
//----End of Method insert_grammar_index Definition

						
//#################################################################
//# Method: findNonTerm  
//#    used in Class: Grammar
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function findNonTerm_Grammar(pSearch) {
	var lvRuleFound = -1;
	var vLeft   = 0;
	//var vRight  = this.rows;
	var vRight  = this.length+1;
	//alert("vLeft="+vLeft+" vRight="+vRight+"\ngrammar.js:294");
	var i = Math.floor((vLeft+vRight)/2);
	while (vLeft+1 < vRight) {
		i = Math.floor((vLeft+vRight)/2);
		//alert("vLeft="+this[vLeft].nonterm +" vRight="+this[vRight].nonterm+ "\ngrammar.js:298");
		if (this[i].nonterm > pSearch) {
			vRight = i;
		} else if (this[i].nonterm < pSearch) {
			vLeft = i;
		} else  {
			vRight = vLeft;
		}
	};
	if (this[i].nonterm == pSearch) {
		lvRuleFound = i;
		//alert("Found "+pSearch + " at ID="+lvRuleFound+" and\nvLeft="+this[vLeft].nonterm +"\ngrammar.js:298");
	} else if (this.promptNotFound) {
		this.promptNotFound = confirm("Non-terminal Symbol '"+pSearch+"' not found\nDo you get further prompts on undefined NONTERM symbols?\ngrammar.js:356");
		//alert("Non-terminal Symbol '"+pSearch+"' not found\ngrammar.js:314");
	}
	return lvRuleFound;
}
//----End of Method findNonTerm Definition

//#################################################################
//# Method: find_or_create  
//#    used in Class: Grammar
//#                
//# Comment:                        
//#
//# created               8.1.2014             
//# last modifications    8.1.2014             
//#################################################################

function find_or_create_Grammar(pSearch) {
	var lvRuleFound = -1;
	var vLeft   = 1;
	//var vRight  = this.rows;
	var vRight  = this.length;
	//alert("vLeft="+vLeft+" vRight="+vRight+"\ngrammar.js:294");
	var i = Math.floor((vLeft+vRight)/2);
	while (vLeft < vRight) {
		i = Math.floor((vLeft+vRight)/2);
		//alert("vLeft="+this[vLeft].nonterm +" vRight="+this[vRight].nonterm+ "\ngrammar.js:298");
		if (this[i].nonterm > pSearch) {
			vRight = i-1;
		} else if (this[i].nonterm < pSearch) {
			vLeft = i+1;
		} else {
			vRight = vLeft;
		}
	}
	//alert("lvRuleFound="+lvRuleFound+" vLeft="+this[vLeft].nonterm +" pSearch="+pSearch +"\ngrammar.js:298");
	//if (lvRuleFound < 0) {
	if (this[i].nonterm != pSearch) {
		var vGrammarPos = vLeft;
		var lvGrammarNode = new GrammarNode();
		lvGrammarNode.nonterm = pSearch;
		//i = this.assRules.insert_rule_Rules(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment)
		var vRulePos = this.assRules.insert_missing_rule_for(pSearch,"MISSING");
		lvGrammarNode.add(this.assRules[vRulePos]);
		this.add(lvGrammarNode);
		this.swap(this.length,vGrammarPos);
	} else {
		lvRuleFound = i;
	}
	//return lvRuleFound;
	return vGrammarPos;
}
//----End of Method find_or_create Definition


function XX_findNonTerm_Grammar(pNONTERM) {
	var vReturn = -1;
	var i = this.find_insert_pos(pNONTERM);
	var vNONTERM_search= this[i].nonterm;
	if (vNONTERM_search == pNONTERM) {
		vReturn = i;
		alert("findNonTerm("+pNONTERM+")="+i+"\ngrammar.js:295");
	};
	return vReturn;
}
//----End of Method findNonTerm Definition


//-----GRAMMAR-----------
function m_find_NonTerm_GRAM(pNONTERMsymbol) {
	return this.findColFromIndex(pNONTERMsymbol,1);
}


//-----GRAMMAR-----------
function m_grammar_compare(i,j) {
    //---this Function is used as parameter pFunction in sort_Grammar(pFunction)  ----
	var vReturnValue = 0;
	if (this[i].nonterm.length < this[j].nonterm.length) {
		vReturnValue = 1;
	};
	return vReturnValue;
	
}

//-----GRAMMAR-----------
function sort_Grammar() {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pRows="+pRows+", pCols"+pCols)
	//Bubblesort for rows
	var vSortNodeMax = this[1];
	for (var i=1; i<this.length; i++) {
		for (var j=i+1; j<this.length; j++) {
			if (this.row_compare(i,j)) {
				//alert("Swap "+i+" and "+j);
				this.swap(i,j)
			}
		}
	};
	//alert("grammar.js:184 - sort_Grammar() pCol="+pCol);
}


//-----GRAMMAR-----------
function html_Grammar(pFunction) {
	//---Method Class:  "Matrix" defined in matrix.js---
	this.show_row = pFunction;
	var vContentHTML = "";
	//alert("grammar.js:186 html_Grammar()\n Name: "+this.name);
	vContentHTML +="<table border=2>";
	//---TABLE ROWS---
	for (var i=1; i<=this.length; i++) {
		vContentHTML += this.show_row(i)
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("matrix.js:92 show_Grammar()\n Name: "+this.name);
	return vContentHTML; 
}

//-----GRAMMAR-----------
function html_section_Grammar(pFunction,pSection) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("grammar.js:202 html_section_Grammar()\n Name: "+this.name);
	this.show_row = pFunction;
	var vContentHTML = "";
	//alert("matrix.js:92 show_Grammar()\n Name: "+this.name);
	vContentHTML +="<table border=2>";
	//---TABLE ROWS---
	for (var i=1; i<=this.length; i++) {
	    //if (i<5) alert("SECTION='"+this[i][1][4]+"'");
	    if (this[i][1][4] == pSection) { 
			vContentHTML += this.show_row(i)
		}
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("matrix.js:92 show_Grammar()\n Name: "+this.name);
	return vContentHTML; 
}


//-----GRAMMAR-----------
function show_Grammar() {
	//---Method Class:  "Matrix" defined in matrix.js---
	return this.html_grammar(show_row_Grammar); 
}

function show_row_Grammar(pRow) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr><td><b><font color=red>["+pRow+"]</font> "+ this[pRow].nonterm +"</b><ul>";
	for (var j=1; j<=this[pRow].length; j++) {
		vContentHTML +="<li>(W"+this[pRow][j][3]+") "+ this[pRow][j][2] + "</li>";
	};
	vContentHTML +="</ul></td></tr>";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	return vContentHTML; 
}

function m_onchange_update_Grammar(pRow,pCol) {
	//---Method already Defined Class:  "Matrix" defined in matrix.js---
	var vContent = this.assRules.get_formvalue(pRow,pCol);
	//var vContent = "Predefined";
	vContent = this.assRules.editform2ruledef(vContent);
	//alert("m_update_onchange_Grammar("+pRow+","+pCol+"):251\n"+vContent);
	var Row_Array = pRow.split("R");
	var vRow 	= parseInt(Row_Array[0]);
	var vEnum 	= parseInt(Row_Array[1]);
	var vCol 	= parseInt(pCol);
	this[vRow][vEnum][vCol] = vContent;
	this.assRules.set_formvalue(pRow,pCol,vContent);
};

function edit_row_Grammar(pRow) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	var vLineMax = 4;
	var vLine = 3;
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr><td><b><font color=red>["+pRow+"]</font> "+ this[pRow].nonterm +"</b><ul>";
	for (var j=1; j<=this[pRow].length; j++) {
		//vContentHTML +="<li>(W"+this[pRow][j][3]+") "+ this[pRow][j][2] + "</li>";
		//alert("this[pRow][j][4]="+this[pRow][j][4]);
		var vString = this[pRow][j][2];
		var vArray = vString.split(/\n/);
		vLine = vArray.length;
		//alert(vLine);
		if (vLine > vLineMax) {
			vLine = vLineMax;
		};		
		vContentHTML +="<li>(W"+
				this.create_inputtext(pRow+"R"+j,3,this[pRow][j][3]," size='5' ")+")\n ID:"+				
				this.create_inputtext(pRow+"R"+j,4,this[pRow][j][4]," size='15' ")+" <br/>\n " +
				this.create_textarea(pRow+"R"+j,2,this[pRow][j][2]," cols='80' rows='"+vLine+"' ") +
				"  </li> \n";

	};
	vContentHTML +="</ul></td></tr>";
	//alert("matrix.js:126 edit_row_Grammar()\n Name: "+this.name);
	//alert("matrix.js:126 edit_row_Grammar()\n"+vContentHTML);
	return vContentHTML; 
}

function edit_simple_row_Grammar(pRow) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	var vLineMax = 4;
	var vLine = 3;
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr><td><b>"+ this[pRow].nonterm +"</b> ("+this[pRow][1][4]+")<table>";
	for (var j=1; j<=this[pRow].length; j++) {
		//vContentHTML +="<li>(W"+this[pRow][j][3]+") "+ this[pRow][j][2] + "</li>";
		//alert("this[pRow][j][4]="+this[pRow][j][4]);
		var vString = this[pRow][j][2];
		var vArray = vString.split(/\n/);
		vLine = vArray.length;
		//alert(vLine);
		if (vLine > vLineMax) {
			vLine = vLineMax;
		};	
		if (vLine > 1) {
		  	vContentHTML +="<tr><td valign='top'> Def"+j+" </td><td valign='top'>" +
				this.create_textarea(pRow,2,this[pRow][j][2]," cols='80' rows='"+vLine+"' ") +
				"</td></tr>   \n";
		} else {
		  	vContentHTML +="<tr><td valign='top'> Def"+j+" </td><td valign='top'>" +
				this.create_inputtext(pRow,2,this[pRow][j][2]," size='80' ") +
				"</td></tr>   \n";
		};
		//} else {
		//    vContentHTML +="<tr><td valign='top'> Def"+j+" </td><td valign='top'>"+
		//	    this.create_inputtext(pRow,2,this[pRow][j][2]," size='80' ") +
		//		"</td></tr>   \n";
		//};
	};
	vContentHTML +="</table></td></tr>";
	//alert("matrix.js:126 edit_row_Grammar()\n Name: "+this.name);
	//alert("matrix.js:126 edit_row_Grammar()\n"+vContentHTML);
	return vContentHTML; 
}

function edit_Grammar() {

	//---Method Class:  "Matrix" defined in matrix.js---
	return this.html_grammar(edit_row_Grammar); 
}

function editSection_Grammar(pSection) {
    var vHTML = "----";
    //alert("grammar.js:276 - edit_section_Grammar("+pSection+")");
	//---Method Class:  "Matrix" defined in matrix.js---
	vHTML = this.html_grammar(edit_row_Grammar);
	//alert(vHTML);
	if (pSection != "") {
	      vHTML = this.html_section_grammar(edit_simple_row_Grammar,pSection);
	}
    return vHTML;
}	
	

//#################################################################
//# Method: update_Grammar  
//#    used in Class: Grammar
//#                
//# Comment: This method is updates the Grammar from Rules                 
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function update_Grammar() {	
	var lvRow = i;
	var lvNONTERM = "";
	var lvNONTERM_old = "";
	var lvGrammarIndex = 0;
	var lvReplaceFound = -1;
	var lvGrammarNode;
	if (!this.assRules.is_sorted) {
		this.assRules.sort();
	}
	this.removeall();
	for (var i=1; i<=this.assRules.rows; i++) {
		// if the NONTERM symbol is already in this.grammar append record
		// otherwise create a new record
		lvNONTERM_old = lvNONTERM;
		lvNONTERM 	= this.assRules[i][1];
		if (lvNONTERM_old == lvNONTERM) {
			// append to existing GrammarNode for existing NONTERM
			// if the replacement is not existing
			//alert("grammar.js:388 - update_Grammar()-Call\nOLD Non-Term="+lvNONTERM+"\n lenght="+this.grammar.length);
			this[lvGrammarIndex].add(this.assRules[i]);
		} else {
			// Grammarnode does not exist so create a new Node for appending
			if (lvNONTERM_old > lvNONTERM) {
				alert("WARNING: lvNONTERM_old > lvNONTERM\n'"+lvNONTERM_old+"' > '"+lvNONTERM+"'\ngrammar.js:617");
			}
			lvGrammarIndex += 1;
			lvGrammarNode = new GrammarNode();
			lvGrammarNode.nonterm = lvNONTERM;
			lvGrammarNode.add(this.assRules[i]);
			this.add(lvGrammarNode);
			//alert("grammar.js:397 - update_Grammar()-Call\nNEW Non-Term="+lvNONTERM+"\n lenght="+this.grammar.length);
		};
	};
}
//----End of Method update Definition
