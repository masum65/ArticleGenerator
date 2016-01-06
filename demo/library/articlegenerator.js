//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    27.04.2010,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2010                  #
//#################################################



//alert("loading JS-Libary: articlegenerator.js");

// ##########################################################################################

//---- Constructor ArticleGenerator() - OBJECT -


function ArticleGenerator() {
	//---Super Class------------------------
	//eval(CLASS(...));
	//---Attributes-------------------------
	this.tableFormat     = new TableFormat();
	this.rules			 = new Rules(); // Contains the Grammar Rules, updateGrammar() before applying
	this.grammarfiles	 = new GrammarFiles(); // Contains a Filelist loaded config.html
	this.grammar		 = new Grammar(); // Contains the generated Grammar-needs parsing the Rules()
	this.parsenode       = new ParseNode();
	this.wizzard         = new Wizzard();
	this.citations		 = new Citations();
	this.docgenerator	 = new DocGenerator();
	//this.bibtex          = "";
	this.formPath        = "";
	this.objectPath	 	 = "";
	this.mainEditGrammar = "paper";
	this.textGenerated   = "";
	this.textSource      = "";
	this.textDestination = "";
	this.textGrammar     = "";
	this.textClipboard   = "";
	this.countReplacement= 0;
	this.sectionGrammar  = "WORD";
	this.appendGrammar   = 0;  // 0=Load Grammar, 1=append rules to existing grammar
	//---Methods---------
    this.init        		= m_init_ArticleGenerator;
    this.initGrammar     	= m_initGrammar_ArticleGenerator;
  	this.setAppendGrammar	= m_set_append_grammar;
    this.append_RuleRecord  = m_append_RuleRecord;
    this.create_timedate_rule = m_create_timedate_rule;
    this.display     		= m_display_ArticleGenerator;
    this.edit        		= m_edit_ArticleGenerator;
    this.editSelected       = m_editSelected_ArticleGenerator;
    this.export_grammar 	= m_export_perl_grammar;
    this.getFormValue       = m_getFormValue; 	
    this.import_grammar 	= import_grammar_ArticleGenerator;
    this.onchange_update    = m_update_onchange_ArticleGenerator;
    this.parse        		= m_parse_ArticleGenerator;
    this.random_index		= m_random_index;
    this.replaceString 		= m_replace_string;
    this.setFormValue       = m_setFormValue;
    this.setTimeout         = m_setTimeout_ArticleGenerator;
    this.update_onchange    = m_update_onchange_ArticleGenerator;
    this.updateGrammar		= m_update_grammar; 

}

function m_init_ArticleGenerator(pFormPath,pObjectPath) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	this.formPath       = pFormPath;
	this.objectPath     = pObjectPath;
	//-----------------
	this.grammar.formPath       = pFormPath;
	this.grammar.objectPath   	= pObjectPath+".grammar"; //uses update_onchange
	//this.grammar.objectPath   = pObjectPath;
	this.grammar.assRules		= this.rules;
	//-----------------
	this.grammarfiles.assArticleGenerator = this;
	//-----------------
	this.wizzard.assRules		= this.rules;
	this.wizzard.assGrammar		= this.grammar;
	this.wizzard.assArticleGenerator = this;
	//-----------------
	this.rules.assGrammar		= this.grammar;
	this.rules.assCitations		= this.citations;
	this.rules.init_form(pFormPath,pObjectPath+".rules");
	// alert("Create Matrix");
	//-----------------
	this.citations.init_form(pFormPath,pObjectPath+".citations");
	this.citations.assRules = this.rules;
	this.citations.create(0,5);
	//-----------------
	this.docgenerator.formPath		= pFormPath;
	this.docgenerator.objectPath	= pObjectPath+".docgenerator"; //uses update_onchange
	this.docgenerator.assRules		= this.rules;
	this.docgenerator.assGrammar	= this.grammar;
	this.docgenerator.assCitations	= this.citations;
	this.docgenerator.create(0,2);
	//-----------------
	this.initGrammar()
    //-----------------
	//alert("ArticleGenerator.js:52 init() - this.rules.formPath="+this.rules.formPath);
};



function m_initGrammar_ArticleGenerator() {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	//-----------------
	this.rules.create(0,5);
	//this.rules.removeall()
	this.rules.add(this.create_timedate_rule());
	//-----------------
	// grammarfiles is a Matrix with vGrammarFileCount rows and two columns	
	this.grammarfiles.init();
	this.grammarfiles.create(0,3);
	//-----------------
	//this.grammarfiles[1][1]="Basic Grammar Definitions"; 	
	//this.grammarfiles[1][2]="basic";
	//this.grammarfiles[1][3]="";
	//-----------------
	//alert("ArticleGenerator.js:52 init() - this.rules.formPath="+this.rules.formPath);
};


function m_create_timedate_rule() {
	var vTimeDate = new MatrixColumn();
	vTimeDate.add("SYS_DATE_NOW");
	var vNow = new Date();
	var vMonth = vNow.getMonth()+1;
	vTimeDate.add(vNow.getDate()+"."+vMonth+"."+vNow.getFullYear());
	vTimeDate.add(1);
	vTimeDate.add("SYSTEM");
	vTimeDate.add("Current Date");

	return vTimeDate;
}

function m_setTimeout_ArticleGenerator(pCommand,pTimeout) {
    setTimeout(pCommand,pTimeout)
}

function m_export_perl_grammar(pValue) {
	var vContent = "Perl Export";
	vContent = this.rules.export_source(); 
	return vContent;
}


function m_set_append_grammar(pValue) { 
	this.appendGrammar = pValue;
}

function m_update_grammar() {
	//alert("ArticleGenerator.js:251 - update_grammar()");
	this.grammar.update();
}

function m_display_ArticleGenerator() {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	return this.rules.show();
};

function m_edit_ArticleGenerator() {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	return this.rules.edit();
};

function m_editSelected_ArticleGenerator() {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	//return this.grammar.edit_section_grammar(this.grammar.selectedID);
	return this.rules.edit();
};

function m_parse_ArticleGenerator(pString,pMin,pMax,pGrammarID) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	//pString = this.replaceString(pString,"langer","SCI_LANGER");
	var lvString = pString;
	var vSearchString = "";
	if (!pMin) {
	   //alert("pMin was not defined");
	   pMin = 0;
	};
	if (!pMax) {
	   //alert("pMax was not defined");
	   pMax = 10000;
	}
	
	this.rules.sort_length();
	for (var i=1; i<=this.rules.rows; i++) {
		//pString = this.replaceString(pString,this.rules[i][2],this.rules[i][1]);
		//if ()
		vSearchString = this.rules[i][2]; //not used
		if ((this.rules[i][2].indexOf("\n")<0) 
			&& (this.rules[i][2].length >= pMin) 
			&& (this.rules[i][2].length <= pMax)) { 
		//if ((this.rules[i][1].indexOf("\n")<0) && (this.rules[i][2].length >= pMin)) { 
			pString = lvString.replace(this.rules[i][2],this.rules[i][1]);
			lvString = pString;
		} else {
			//vSearchString = this.rules[i][2].replace("\n",'\n');
			//pString = lvString.replace(vSearchString,this.rules[i][1]);
			//lvString = pString;
		};
	};
	this.rules.sort();
	return pString;
};


function m_parse_oneline_rule(pRule) {
	//split into rule part and definition part
	
	//check if rule is in overwrite mode by checking 
	// if the first character is ">" then it is a overwrite definition
	// (1) GENERATING: The overwrite definition will remain 
	//     in the generatedText until all rule replacements are finalized
	// (2) PARSING: An overwrite definition as part of a parsing process
	//     is relevant for the word parsing >NON_TERM has to be recognized 
	//     as non-term symbol 
	
	return vGrammarNode;
}

function m_parse_overwrite_rule(pOverwriteRule) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	// an overwrite rule is a one-liner of the form
	//  .... >SCI_MY_RULE my definition of the rule
	//  .... >SCI_MY_RULE=1 my definition of the rule
	//  .... >SCI_MY_RULE+5 my definition of the rule
	// The numbers "=1","+5" define or increase the weight of the rule
	// overwrite rules remain in the document until the application of
	// grammar is finish
	
};



function m_replace_string(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	// alert("ArticleGenerator.js:400 - replaceString() \npSearch="+pSearch+"\n"+pString);
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (vN >= 0)
		{
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
}


function m_setFormValue(pFormInputName,pValue) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	vEvalStr = this.formPath+"."+pFormInputName+".value="+pValue+";";
	//vEvalStr = this.formPath+"."pFormInputName+".value="+this.objectPath+"."+pAttributeName+";";
	//alert("ArticleGenerator.js:68 - setFormText()\npText="+pText\n"+vEvalStr);

	eval(vEvalStr);

}

function m_update_onchange_ArticleGenerator(pRow,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	alert("articlegenerator.js:778 - m_update_onchange_ArticleGenerator()");
	this.rules.onchange_update(pRow,pCol);	
};


function m_getFormValue(pFormInputName) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	var vValue = "";
	var vEvalStr = "vValue ="+this.formPath+"."+pFormInputName+".value;";
	//vEvalStr = this.formPath+"."pFormInputName+".value="+this.objectPath+"."+pAttributeName+";";
	//alert("ArticleGenerator.js:68 - setFormText()\npText="+pText\n"+vEvalStr);

	eval(vEvalStr);
	// alert("ArticleGenerator.js:253 - m_getFormValue("+pFormInputName+")\nreturn "+vValue);
	return vValue;

}

function m_append_RuleRecord(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment) {
	this.rules.append_rule(pNONTERMsymbol,pTERMsymbol,pOperator,pWeight,pGrammarID,pComment)
}

						
//#################################################################
//# Method: import_grammar  
//#    used in Class: ArticleGenerator
//#                
//# Comment:                        
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function import_grammar_ArticleGenerator(pInputString,pGrammarID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("articlegenerator.js:import_grammar(pInputString,pGrammarID)-Call")
	//----Create Object/Instance of ArticleGenerator----
	//    var vMyInstance = new ArticleGenerator();
	//    vMyInstance.import_grammar(pInputString,pGrammarID);
	//-------------------------------------------------------
	return this.rules.import_grammar(pInputString,pGrammarID);
}
//----End of Method import_grammar Definition


function m_random_index(pMax) {
	// creates a random index "vReturnValue" with 0 <= vReturnValue < pMax 	
	var vReturnValue = Math.round(Math.random()*pMax-0.5);
	if (vReturnValue<0) {
		vReturnValue = 0;
	} else if (vReturnValue>=pMax) {
		vReturnValue = pMax-1;
	};

	return vReturnValue;
};


