//#################################################################
//# Javascript Class: DocGenerator()
//#   Class Filename: docgenerator.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               4.1.2014             
//# last modifications    4.1.2014             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class DocGenerator() 
// Call the constructor for creating an instance of class DocGenerator
// by the following command in HTML-file that imports this class
// var vMyInstance = new DocGenerator();
//---------------------------------------------------------------------

function DocGenerator () {
	//--------------------------------------
	//---Super Class------------------------
	this.SuperClass = Matrix;
	this.SuperClass();
	//--------------------------------------

	//---Associations-----------------------
	this.assGrammar		 = null;
	this.assRules		 = null;
	this.assCitations	 = null;
	this.assWizzard		 = null;
	//---Attributes-------------------------
	this.aInitText  = "";
	this.aText 	    = "";
	this.aErrorText = "";
	this.aCount  	= 0;
	this.aCycle  	= 0;
	this.aCycleMax 	= 100;
	this.aLoopMax   = 50;
	this.aIndexPart = 0;
	this.aIndexNT   = 0;
	this.aCiteReplacements = 0;
	this.aCitations	 		= new Array();
	this.aFoundNonterms	 	= new Array();
	this.aFoundNontermIDs	= new Array();
	this.aMust_Update_Grammar = false;
	//---Methods----------------------------
	this.init						= init_DocGenerator;
	this.init_apply					= init_apply_DocGenerator;
	this.init_nonterm				= init_nonterm_DocGenerator;
	this.add_textpart	 			= add_textpart_DocGenerator;
	this.apply_grammar				= apply_grammar_DocGenerator;
	this.apply_grammarnode			= apply_grammarnode_DocGenerator;
	this.apply_nonterm				= apply_nonterm_DocGenerator;
	this.apply_counter				= apply_counter_DocGenerator;
	this.count_noncounter_nonterms	= count_noncounter_nonterms_DocGenerator;
	this.create_textpart		 	= create_textpart_DocGenerator;
	this.determine_overwrite	 	= determine_overwrite_DocGenerator;
	this.determine_rule			 	= determine_rule_DocGenerator;
	this.expand_overwrite		 	= expand_overwrite_DocGenerator;
	this.export_text			 	= export_text_DocGenerator;
	this.export_with_overwrite	 	= export_with_overwrite_DocGenerator;
	this.find_citations			 	= find_citations_DocGenerator;
	this.find_nonterms			 	= find_nonterms_DocGenerator;
	this.get_current_nonterm	 	= get_current_nonterm_DocGenerator;
	this.insert_textpart		 	= insert_textpart_DocGenerator;
	this.insert_overwrite_return 	= insert_overwrite_return_DocGenerator;
	this.load_text				 	= load_text_DocGenerator;
	this.loop_replacement_direct 	= loop_replacement_direct_DocGenerator;
	this.loop_rule				 	= loop_rule_DocGenerator;
	this.next_cycle				 	= next_cycle_DocGenerator;
	this.random_rule			 	= random_rule_DocGenerator;
	this.remove_ignore_lines	 	= remove_ignore_lines_DocGenerator;
	this.remove_ignore_space	 	= remove_ignore_space_DocGenerator;
	this.replace_citations		 	= replace_citations_DocGenerator;
	this.replace_nonterms		 	= replace_nonterms_DocGenerator;
	this.replace_string			 	= replace_string_DocGenerator;
	this.select_rule	 		 	= select_rule_DocGenerator;
	this.show_citations			 	= show_citations_DocGenerator;
	this.show_nonterms			 	= show_nonterms_DocGenerator;
	this.sort_nonterms			 	= sort_nonterms_DocGenerator;
	this.split_overwrite		 	= split_overwrite_DocGenerator;
	this.split_overwrite		 	= split_overwrite_DocGenerator;
	
	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of DocGenerator, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'DocGenerator'
// the function name is extended with '_DocGenerator'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       DocGenerator.my_method()
// The method definitions are as follows
//   function my_method_DocGenerator(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "DocGenerator()" defined as JS functions 
//---------------------------------------------------------------------
						
//#################################################################
//# Method: init  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function init_DocGenerator(pInitText) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:init()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.init();
	//-------------------------------------------------------
	//this.aInitText = "*STARTNODE_SECTIONS";
	if (pInitText) {
		this.aInitText = pInitText;
	};
	//this.load_text(this.aInitText);
	this.removeall();
	this.add_textpart(this.aInitText);
	this.assCitations.init_generation();
	this.aErrorText = "";
}
//----End of Method init Definition

						
//#################################################################
//# Method: init_nonterm  
//#    used in Class: DocGenerator
//#                
//# Comment: Call after Cylce                       
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function init_nonterm_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:init_nonterm()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.init_nonterm();
	//-------------------------------------------------------
	var vString = this.export_text();
	this.aIndexNT = 0;
	this.aMust_Update_Grammar = false;
	//this.aErrorText = "";
	this.find_nonterms(vString);	
}
//----End of Method init_nonterm Definition


						
//#################################################################
//# Method: init_apply  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function init_apply_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:init_apply()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.init_apply();
	//-------------------------------------------------------
	//this.load_text(this.aInitText);
	//this.init_nonterm();
	this.assCitations.init_generation();
	this.aCount = 0;
	this.aCycle = 0;
}
//----End of Method init_apply Definition

	
				
//#################################################################
//# Method: load_text  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function load_text_DocGenerator(pInitText) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:load_text(pInitText)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.load_text(pInitText);
	//-------------------------------------------------------
	this.removeall();
	if (pInitText != "") {
		var vOverwriteArray = this.assRules.parsenode.split2overwrite(pInitText);	
		for (var j=0; j<vOverwriteArray.length; j++) {
			this.add_textpart(vOverwriteArray[j]);
		};
		//this.init_nonterm();
	} else {
		this.init();
	}
}
//----End of Method load_text Definition

						
//#################################################################
//# Method: split_overwrite  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function split_overwrite_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:split_overwrite(pTerm)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.split_overwrite(pTerm);
	//-------------------------------------------------------
	//return this.assRules.parsenode.split2lines(pString);
	return this.assRules.parsenode.split2overwrite(pString);
}
//----End of Method split_overwrite Definition

//#################################################################
//# Method: insert_overwrite_return  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################
function insert_overwrite_return_DocGenerator(pString) {
	 return pString;
}

function X_insert_overwrite_return_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:insert_overwrite_return(pTerm)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.insert_overwrite_return(pTerm);
	//-------------------------------------------------------
	var vRegEx_NONTERM = /([^\n]>[A-Z][A-Z]+_[A-Z_]+[A-Z]+)/g;
 	var vReturn = pString.replace(vRegEx_NONTERM,"\n(Vorher) "+RegExp.$1+" (Nachher)");
  	//return pString.replace(vRegEx_NONTERM,"\n"+RegExp.$1);
  	if (vReturn != pString) {
  		alert("BEFORE="+pString+"\n\nAFTER="+vReturn+"\ndocgenerator.js:268");
  	}
	return vReturn;
}
//----End of Method insert_overwrite_return Definition
				
//#################################################################
//# Method: determine_overwrite  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function determine_overwrite_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:determine_overwrite(pTerm)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.determine_overwrite(pTerm);
	//-------------------------------------------------------
	this.removeall();
	var vOverwriteArray = this.assRules.parsenode.split2overwrite(pString);	
	for (var j=0; j<vOverwriteArray.length; j++) {
		this.add_textpart(vOverwriteArray[j]);
	};
}
//----End of Method determine_overwrite Definition

						
//#################################################################
//# Method: create_textpart  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function create_textpart_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:create_textpart(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.create_textpart(pString);
	//-------------------------------------------------------
	var vReturn = new MatrixColumn();
	vReturn.add(pString);
	vReturn.add(0); //Application Counter of Part
	return vReturn;
}
//----End of Method create_textpart Definition

//#################################################################
//# Method: get_current_nonterm  
//#    used in Class: DocGenerator
//#                
//# Comment: get current nonterm, that was use for replacement                      
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function get_current_nonterm_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:get_current_nonterm()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.get_current_nonterm();
	//-------------------------------------------------------
	var vReturn = "----undefined----";
	if (this.aIndexNT< this.aFoundNonterms.length) {
		this.aCount++;
		vReturn = this.aFoundNonterms[this.aIndexNT];
	}
	//alert("docgenerator.js:354 - get_current_nonterm('"+vReturn+"')-Call");
	return vReturn
}
//----End of Method get_current_nonterm Definition

						
//#################################################################
//# Method: add_textpart  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function add_textpart_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:add_textpart(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.add_textpart(pString);
	//-------------------------------------------------------
	this.add(this.create_textpart(pString));
}
//----End of Method add_textpart Definition

						
//#################################################################
//# Method: insert_textpart  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function insert_textpart_DocGenerator(pString,pi) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:insert_textpart(pString,pi)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.insert_textpart(pString,pi);
	//-------------------------------------------------------
	this.add(this.create_textpart(pString),pi);
}
//----End of Method insert_textpart Definition

						
//#################################################################
//# Method: find_nonterms  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function find_nonterms_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:find_nonterms(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.find_nonterms(pString);
	//-------------------------------------------------------
	this.aFoundNonterms = pString.match(/[A-Z][A-Z]+_[A-Z_]+[A-Z]+/g);
	if (this.aFoundNonterms) {
		this.aFoundNonterms.sort();
		this.aFoundNontermIDs	= new Array();
		this.aIndexNT   = 0;
		var vFound = -1;
		var vNonterm = ""; //this.aFoundNonterms[this.aIndexNT];
		this.aFoundNonterms = this.assRules.parsenode.remove_array_double_lines(this.aFoundNonterms);
		for (var i=0; i<this.aFoundNonterms.length; i++) {
			vNonterm = this.aFoundNonterms[i];
			vFound = this.assGrammar.findNonTerm(vNonterm);
			//alert("Found vNONTERM="+vNonterm+"\n at ID="+vFound+
			//		" in Grammar="+this.assGrammar[vFound].nonterm+
			//		"\ndocgenerator.js:324");
			if (vFound<1) {
				this.aMust_Update_Grammar = true;
				this.aFoundNontermIDs.push(vFound);
			} else {
				this.aFoundNontermIDs.push(vFound);
			};
		};
		this.sort_nonterms();
	} else {
		this.aFoundNonterms = new Array();
	};
}
//----End of Method find_nonterms Definition
						
//#################################################################
//# Method: replace_nonterms  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function replace_nonterms_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:find_nonterms(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.find_nonterms(pString);
	//-------------------------------------------------------
	var vFoundNonterms = pString.match(/[A-Z][A-Z]+_[A-Z_]+[A-Z]+/g);
	var vFoundNontermIDs	= new Array();
	var vLoopCount = 0
	while ((vFoundNonterms) && (vLoopCount < 20)) {
		vLoopCount++;
		vFoundNonterms.sort();
		var vIndexNT   = 0;
		var vFound = -1;
		var vNonterm = ""; //this.aFoundNonterms[this.aIndexNT];
		vFoundNonterms = this.assRules.parsenode.remove_array_double_lines(this.aFoundNonterms);
		for (var i=0; i<vFoundNonterms.length; i++) {
			vNonterm = vFoundNonterms[i];
			vFound = this.assGrammar.findNonTerm(vNonterm);
			//alert("Found vNONTERM="+vNonterm+"\n at ID="+vFound+
			//		" in Grammar="+this.assGrammar[vFound].nonterm+
			//		"\ndocgenerator.js:324");
			if (vFound<1) {
			   alert("docgenerator.js:491 - replace_nonterms\nGrammarNode for '"+vNonterm+"' does not exist!")
			} else {
			    vGrammarNode = this.assGrammar[vFound];
				pString = this.apply_grammarnode_DocGenerator(pString,vGrammarNode) 
			};
		};
		vFoundNonterms = pString.match(/[A-Z][A-Z]+_[A-Z_]+[A-Z]+/g);
	};
	return pString;
}
//----End of Method find_nonterms Definition

//#################################################################
//# Method: sort_nonterms  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function sort_nonterms_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:sort_nonterms(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.sort_nonterms(pString);
	//-------------------------------------------------------
	this.aFoundNonterms.sort(sortLength);
}
//----End of Method sort_nonterms Definition

function sortLength(a,b) { 
	//return a.length-b.length;  // from short to long
	return b.length-a.length;  // from long to short
}

//#################################################################
//# Method: count_noncounter_nonterms  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function count_noncounter_nonterms_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:count_noncounter_nonterms(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.count_noncounter_nonterms(pString);
	//-------------------------------------------------------
	var vCount = 0;
	var vNONTERM = "";
	for (var i=0; i<this.aFoundNonterms.length;i++) {
		vNONTERM = this.aFoundNonterms[i];
		if (vNONTERM.indexOf("COUNT_")!=0) {
			vCount++;
		}
	}
    return vCount;

}
//----End of Method count_noncounter_nonterms Definition


//#################################################################
//# Method: show_nonterms  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function show_nonterms_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:show_nonterms(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.show_nonterms(pString);
	//-------------------------------------------------------
	var vOuptut = "<table border=1>";
	for (var i=0; i<this.aFoundNonterms.length;i++) {
		var vNONTERM = this.aFoundNonterms[i];
		var vID = "Grammar-ID="+this.aFoundNontermIDs[i];
		//alert("vNONTERM="+vNONTERM+"\ndocgenerator.js:340");
		vOuptut += "<tr><td>"+i+"</td><td>"+vNONTERM+"</td></td><td>"+vID+"</td></tr>";
	}
	vOuptut += "</table>";
    return vOuptut;

}
//----End of Method show_nonterms Definition

//#################################################################
//# Method: show_citations  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               6.1.2014             
//# last modifications    6.1.2014             
//#################################################################

function show_citations_DocGenerator(pString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:show_citations(pString)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.show_citations(pString);
	//-------------------------------------------------------
	var vOuptut = "<table border=1>";
	for (var i=0; i<this.aCitations.length;i++) {
		var vCITE = "[[["+this.aCitations[i]+"]]]";
		var vCOUNT = "Count Used="+this.assCitations[this.aCitations[i]][5];
		//alert("vCITE="+vCITE+"\ndocgenerator.js:340");
		vOuptut += "<tr><td>"+i+"</td><td>"+vCITE+"</td></td><td>"+vCOUNT+"</td></tr>";
	}
	vOuptut += "</table>";
    return vOuptut;

}
//----End of Method show_citations Definition

//#################################################################
//# Method: apply_grammar  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function apply_grammar_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:465 - apply_grammar(pIndexCount)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.apply_grammar(pIndexCount);
	//-------------------------------------------------------
	this.aIndexNT = 0;
	this.find_nonterms(this.export_with_overwrite());
	while (this.aIndexNT< this.aFoundNonterms.length) {
		if (this.aErrorText == "") {
			this.apply_nonterm();
		} else {
			//alert("ERROR: Application of Grammar terminated!\ndocgenerator.js:484");
			break;
		};
	};
	this.find_citations();
	this.replace_citations();
	this.expand_overwrite();
	if (this.aErrorText == "") {
		//alert("Next Cylce - docgenerator.js:482");
		top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/applyendcycle.html'",100);	
	} else {
		//alert(this.aErrorText);
		alert("ERROR: Document Generation terminated! docgenerator.js:486\n\n"+this.aErrorText);
		top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/applygrammar.html'",100);	
	};
}
//----End of Method apply_grammar Definition

					
//#################################################################
//# Method: apply_nonterm  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################
function apply_nonterm_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:435 apply_nonterm("+this.aFoundNonterms[this.aIndexNT]+")-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.apply_nonterm();
	//-------------------------------------------------------
	if (this.aIndexNT< this.aFoundNonterms.length) {
		this.aCount++;
		//alert("docgenerator.js:390 - apply_nonterm()-Call");
		var vNONTERM = this.aFoundNonterms[this.aIndexNT];
		//alert("docgenerator.js:392 - apply_nonterm()-Call - BEFORE findNonTerm");
		var lvFound = this.assGrammar.findNonTerm(vNONTERM);
		//alert("docgenerator.js:394 - "+vNONTERM+"["+this.aIndexNT+"] found at ID="+lvFound+"\napply_nonterm()-Call - AFTER findNonTerm");
		if (lvFound>0) {
			if (vNONTERM.indexOf("COUNT_")!=0) {
				var vGrammarNode = this.assGrammar[lvFound];
				//alert("docgenerator.js:397 - apply_nonterm()-Call\nNONTERM="+vGrammarNode.nonterm);
				vReturn = 1;
				for (var i=1; i<=this.rows; i++) {
					//--Before and After Overwrite no insert of new line CR 
					if (this[i][1].charAt(0) == ">") {
						// handle Overwrite
						this[i][1] = this.assRules.handle_overwrite(this[i][1]);
					} else {
						// apply the Grammarnode for vNONTERM
						this[i][1] = this.apply_grammarnode(this[i][1],vGrammarNode);
					}
				};
			} else {
				//alert(vNONTERM + " is not applied!\ndocgenerator.js:624");
			}
		} else {
			this.aErrorText += "GRAMMAR ERROR: "+vNONTERM+" is not part of the Grammar. "
				+ "Please insert a Rule for "+vNONTERM+"!\ndocgenerator.js:531\n-----------\n";
			alert(this.aErrorText);
		};
		this.expand_overwrite();
		//alert("this.count_noncounter_nonterms()="+this.count_noncounter_nonterms()+"\ndocgenerator.js:601");
		if (this.count_noncounter_nonterms()<=1) {
			this.apply_counter();
		}
		this.aIndexNT++;
	} else {
		//alert("docgenerator.js:310 - All Non-Terminals are Replaced - next Cycle?");
		this.next_cycle();
	}
}
//----End of Method apply_nonterm Definition


function X_apply_nonterm_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:435 apply_nonterm("+this.aFoundNonterms[this.aIndexNT]+")-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.apply_nonterm();
	//-------------------------------------------------------
	if (this.aIndexNT< this.aFoundNonterms.length) {
		//alert("this.aIndexNT="+this.aIndexNT+"\ndocgenerator.js:638");
		this.aCount++;
		//alert("docgenerator.js:390 - apply_nonterm()-Call");
		var vNONTERM = this.aFoundNonterms[this.aIndexNT];
		//alert("docgenerator.js:392 - apply_nonterm()-Call - BEFORE findNonTerm");
		var lvFound = this.assGrammar.findNonTerm(vNONTERM);
		//alert("docgenerator.js:394 - "+vNONTERM+" found at ID="+lvFound+"\napply_nonterm()-Call - AFTER findNonTerm");
		if (lvFound>0) {
			var vGrammarNode = this.assGrammar[lvFound];
			//alert("docgenerator.js:397 - apply_nonterm()-Call\nNONTERM="+vGrammarNode.nonterm);
			vReturn = 1;
			for (var i=1; i<=this.rows; i++) {
				//--Before and After Overwrite no insert of new line CR 
				if (this[i][1].charAt(0) == ">") {
					// handle Overwrite
					this[i][1] = this.assRules.handle_overwrite(this[i][1]);
				} else {
					// apply the Grammarnode for vNONTERM
					this[i][1] = this.apply_grammarnode(this[i][1],vGrammarNode);
				}
			};
		} else {
			this.aErrorText += "GRAMMAR ERROR: "+vNONTERM+" is not part of the Grammar. "
				+ "Please insert a Rule for "+vNONTERM+"!\ndocgenerator.js:713\n";
		};
		//alert("this.aIndexNT="+this.aIndexNT+"\ndocgenerator.js:715");
		this.expand_overwrite();
		//alert("this.aIndexNT="+this.aIndexNT+"\ndocgenerator.js:717");
		this.aIndexNT++;
		//alert("this.aIndexNT="+this.aIndexNT+"\ndocgenerator.js:719");
	} else {
		//alert("docgenerator.js:721 - All Non-Terminals are Replaced - next Cycle?");
		this.next_cycle();
	}
}
//----End of Method apply_nonterm Definition

					
//#################################################################
//# Method: apply_counter  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function apply_counter_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:741 apply_counter("+this.aIndexNT+","+this.aFoundNonterms[this.aIndexNT]+")-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.apply_counter();
	//-------------------------------------------------------
	if (this.aIndexNT< this.aFoundNonterms.length) {
		this.aCount++;
		//alert("docgenerator.js:390 - apply_counter()-Call");
		var vNONTERM = this.aFoundNonterms[this.aIndexNT];
		//alert("docgenerator.js:392 - apply_counter()-Call - BEFORE findNonTerm");
		var lvFound = this.assGrammar.findNonTerm(vNONTERM);
		//alert("docgenerator.js:394 - "+vNONTERM+" found at ID="+lvFound+"\napply_counter()-Call - AFTER findNonTerm");
		if (lvFound>0) {
			var vGrammarNode = this.assGrammar[lvFound];
			//alert("docgenerator.js:397 - apply_counter()-Call\nNONTERM="+vGrammarNode.nonterm);
			vReturn = 1;
			for (var i=1; i<=this.rows; i++) {
				//--Before and After Overwrite no insert of new line CR 
				if (this[i][1].charAt(0) == ">") {
					// handle Overwrite
					this[i][1] = this.assRules.handle_overwrite(this[i][1]);
				} else {
					// apply the Grammarnode for vNONTERM
					this[i][1] = this.apply_grammarnode(this[i][1],vGrammarNode);
				}
			};
		} else {
			this.aErrorText += "GRAMMAR ERROR: "+vNONTERM+" is not part of the Grammar. "
				+ "Please insert a Rule for "+vNONTERM+"!\ndocgenerator.js:531\n";
		};
		this.expand_overwrite();
		this.aIndexNT++;
	} else {
		//alert("docgenerator.js:310 - All Non-Terminals are Replaced - next Cycle?");
		this.next_cycle();
	}
}
//----End of Method apply_counter Definition
						
//#################################################################
//# Method: next_cycle  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               12.1.2014             
//# last modifications    12.1.2014             
//#################################################################

function next_cycle_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:next_cycle()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.next_cycle();
	//-------------------------------------------------------
	var vText = this.export_text();
	this.find_nonterms(vText);
	this.aIndexNT = 0;
	this.aCount++;
	this.aCycle++;
	if (this.aFoundNonterms.length == 0) {
		//alert("WARNING: No more non-terminal Symbols for replacement - docgenerator.js:508");
		//alert("CITATIONS: Replace Citations now - docgenerator.js:508");
		this.replace_citations();
		if (this.aErrorText == "") {
			top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/applyendcycle.html'",100);	
		} else {
			alert("ERROR: Application of Grammar terminated!\ndocgenerator.js:573");
			top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/applygrammar.html'",100);	
		}
 	};
}
//----End of Method next_cycle Definition


						
//#################################################################
//# Method: apply_grammarnode  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function apply_grammarnode_DocGenerator(pString,pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:apply_grammarnode(pString,pGrammarNode)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.apply_grammarnode(pString,pGrammarNode);
	//-------------------------------------------------------
	var vFoundNonTerm = -1;
	var vReturnString 	= "";
	var vOverwriteRule 	= "";
	var vBackupReturn   = "";
	var vSearch = pGrammarNode[1][1];
	var vSearchLength = vSearch.length;
	var vCR = -1;
	var vReturnRule = "";
	var vCountLoop = 1;
	//alert("docgenerator.js:219 - m_replace_grammar()\nvSearch="+vSearch+"\npString="+pString); 
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(vSearch);
		var vRandom = 0;
		vReturnRule = "";
		var k = 0;
		//---vN is the position of the vSearch in pString ------------------
		//---"while" allows multiple replacements of vSearch in pString ----
		while (vN >= 0)
		{
			vSearchLength = vSearch.length;
			//alert("docgenerator.js:230\nvSearch="+vSearch+" found in\n"+pString);
			vReturnRule = this.determine_rule(pGrammarNode);
			//---shift the first part to vReturnString
			if (vN > 0) {
				//------OVERWRITE-------
				if (pString.charAt(vN-1)==">") {
					//alert("docgenerator.js:196 - Overwrite Found \n"+pString);
					//---- Overwrite Rules are identified in apply_grammarnode() ---
					//---- This Overwrite Check has found  a non-terminal symbol
					//---- vSearch with leading ">" i.e. Overwrite Rule
					vN--; 
					//---- copy ">" to vReturnRule by vN--
					vReturnRule = pString.substring(vN,pString.length);
					vCR = vReturnRule.indexOf("\n");
					if (vCR>0) {
						vReturnRule = pString.substring(vN,vCR+1);
					};
					//---We must replace the whole Overwrite-Def including 
					//---the terminal definition, so vSearchLength is length of Overwrite-Def
					vSearchLength = vReturnRule.length;
					vReturnRule = this.assRules.handle_overwrite(vReturnRule);		
					//--- vN is now located under ">" i.e. pString.charAt(vN) = ">"
					if (vN > 0) {  
						if (pString.charAt(vN-1)=="\n") {
							//---- Check if ">" is at the beginning of the line
							alert("docgenerator.js:681 - Overwrite Rule found at the beginning of pString!\n"+ vReturnRule);
						} else {
							//alert("docgenerator.js:683 - INLINE Overwrite Rule at column "+vN+" found!\nNew line CR is inserted for Overwrite-Def\n"+ pString.substring(vN-1,vN+vSearchLength)+"\nLine: '"+pString+"'");
							vReturnRule = "\n" + vReturnRule;
						}
					} else {
						//vReturnRule = "\n" + vReturnRule;
						alert("docgenerator.js:692 - INLINE Overwrite Rule at column "+vN+" found!\n NONTERM='"+ pString.substring(vN-1,vN+vSearchLength)+"'\nRule: '"+vReturnRule+"'\nLine: '"+pString+"'");
					}
				//------LOOP-Replacement-------
				} else if (pString.charAt(vN-1)=="*") {
					vN--;
					vSearchLength++;
					//alert("docgenerator.js:227 - Loop Replacement found!\n"+ pString.substring(vN,vN+vSearchLength));
					//vReturnRule = this.loop_rule(pGrammarNode);
					vReturnRule = this.loop_replacement_direct(pGrammarNode);
					//alert("docgenerator.js:432 - Loop Replacement found!\n"+vSearch+"='" + vReturnRule+"'");
				//------SELECT-Replacement-------
				} else if (pString.charAt(vN-1)=="?") {
					vN--;
					vSearchLength++;
					//alert("docgenerator.js:437 - Ask for Replacement found!\n"+ pString.substring(vN,vN+vSearchLength));
					vReturnRule = this.select_rule(pGrammarNode);
				};
			} else {
				//alert("docgenerator.js:441 - "+vSearch+" found in beginning of String!\n"+pString);
				vReturnRule = this.determine_rule(pGrammarNode);
			};
			//---Avoid INLINE OVERWRITES need a new line CR in the beginning if vReturnRule starts with ">"
			if (vReturnRule.charAt(0)==">") {
				vReturnRule = "\n"+vReturnRule;
			}
			//---CONCAT BEFORE: vSearch to vReturnString
			//---Concat the String before the SearchString was found to the vReturnString
			vReturnString += pString.substring(0, vN);
			//---CONCAT RULE: vReturnRule to vReturnString
			vReturnString +=  vReturnRule;
			//	alert("docgenerator.js:270\nNONTERM="+vSearch+"\nTERM="+vReturnRule+"\nReturnString="+vReturnString);
			//---SHIFT pString 
			//--- remove the processed part from pString
			if (vN + vSearchLength < pString.length) {
				//---there is still a rest of the string that has to be 
				//---processed if it contains another substring "vSearch"
				pString = pString.substring(vN+vSearchLength, pString.length);
				//alert("'"+pString.charAt(vN+vSearchLength+1)+"' "+vSearch+" "+pString);
			} else {
				// Now we are done with replacement of vSearch in pString
				// because no characters left in pString.
				pString = ''
			};
			//alert("pString="+pString+"\ndocgenerator.js:727");		
			//alert("vReturnString="+vReturnString+"\ndocgenerator.js:728");
			vN = pString.indexOf(vSearch);
			if (this.aCountLoop > this.aLoopMax) {
				vN = -1;
				alert("docgenerator.js:732 - Grammar Applications Terminated after max loops of "+vLoopMax);
			}
		};
	};
	//---- DEBUGGING -----
	//if ((vSearch.indexOf("LOOP_")>=0) && (vReturnString.indexOf("LOOP_")>=0)){
		//alert("docgenerator.js:944\napply_grammarnode("+vSearch+")\n"+vSearch+"='"+vReturnRule+"'\nreturn="+vReturnString + pString);
		//alert("docgenerator.js:945\nNONTERM="+vSearch+"\nTERM="+vReturnRule+"\nReturnString="+vReturnString);
	//}
	return vReturnString + pString;

}
//----End of Method apply_grammarnode Definition

						
//#################################################################
//# Method: determine_rule  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function determine_rule_DocGenerator(pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:determine_rule(pGrammarNode) -Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.determine_rule(pGrammarNode) ;
	//-------------------------------------------------------
	if (pGrammarNode.nonterm.indexOf("COUNT_")==0) {
		//alert("ArticleGenerator.js:366 - m_determine_replacement()"+pGrammarNode.nonterm);
		return pGrammarNode[1][2]+pGrammarNode[1][3]; 
	} else {
		return this.random_rule(pGrammarNode);
	}

}
//----End of Method determine_rule Definition

						
//#################################################################
//# Method: random_rule  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function random_rule_DocGenerator(pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:random_rule(pGrammarNode)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.random_rule(pGrammarNode);
	//-------------------------------------------------------
	var vReturn = "(((ramdom rule undefined!)))";
	if (pGrammarNode) {
		var weightsum = 0;
		for (var j=1; j<=pGrammarNode.length; j++) {
				weightsum += pGrammarNode[j][3];
		};
		var randomnumber=Math.floor(Math.random()*weightsum)+1;
		// where weightsum=11 determines that the random number will yield 0-10. 
		// To increase  the range from 0 to 10, simply change 1 to 11 and add 1. 
		vRandom = 0;
		k = 0;
		// 2,3,5 are e.g. the weights of the Rules attached to the GrammarNode
		// 2,3,5 weightsum 10
		// higher weights increase probability that a rule is selected
		// randomnumber 1,2 / 3,4,5 / 6,7,8,9,10
		// if k is in    1  /    2   /     3
		while (vRandom < randomnumber) {
			k++; //This will be the index
			// add the weights of the GrammarNode rule
			vRandom += pGrammarNode[k][3];
		};
		//alert("random_rule("+pGrammarNode.nonterm+")\npGrammarNode.length="+pGrammarNode.length+"\nSelected k="+k+"\ndocgenerator.js:844");
		//alert("random_rule("+pGrammarNode.nonterm+")\nTerm="+pGrammarNode[k][2]+"\ndocgenerator.js:845");
		if (k>0) {
			vReturn = pGrammarNode[k][2];
		} else {
			vReturn = pGrammarNode[1][2];
		}
	}
	return vReturn

}
//----End of Method random_rule Definition

						
//#################################################################
//# Method: loop_rule  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               5.1.2014             
//# last modifications    5.1.2014             
//#################################################################

function loop_rule_DocGenerator(pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:loop_rule(pGrammarNode) -Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.loop_rule(pGrammarNode) ;
	//-------------------------------------------------------
	var vLoopText = " LOOP_BEGIN ";
	var vLoopItem = " LOOP__ITEM "; ;
	for (var j=1; j<=pGrammarNode.length; j++) {
			if (pGrammarNode.length==2) {
				vLoopItem = " LOOP_AFTER_FIRST ";
			} else if (j==pGrammarNode.length) {
				vLoopItem = " LOOP_BEFORE_LAST ";
			} else {
				vLoopItem = " LOOP__ITEM ";
			};
			vLoopText += vLoopItem + pGrammarNode[j][2]+" ";
	};
	
	return vLoopText + " LOOP_END ";
}
//----End of Method loop_rule Definition

						
						
//#################################################################
//# Method: loop_replacement_direct  
//#    used in Class: DocGenerator
//#                
//# Comment:  DIRECT REPLACEMENT OF LOOP NONTERMS
//#           This function will be called if the NON_TERM Symbol 
//#           in the source text has a leading "*" i.e.
//#           *NON_TERM will create a replacement for 
//#           aLL rules attached to the GrammarNode 
//#           
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function loop_replacement_direct_DocGenerator(pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:loop_replacement_direct(pGrammarNode)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.loop_replacement_direct(pGrammarNode);
	//-------------------------------------------------------
	//if (pSearch == pSearch.toUpperCase()) {
	var lvNONTERM = "";
	//-----LOOP_BEGIN------
	lvNONTERM = "LOOP_BEGIN";
	var vLOOP_BEGIN = lvNONTERM;
	lvFound = this.assGrammar.findNonTerm(lvNONTERM);
	if (lvFound>-1) {
	    vLOOP_BEGIN = this.assGrammar[lvFound][1][2];
	}
	//-----LOOP_AFTER_FIRST------
	lvNONTERM = "LOOP_AFTER_FIRST";
	var vLOOP_AFTER_FIRST = lvNONTERM;
	lvFound = this.assGrammar.findNonTerm(lvNONTERM);
	if (lvFound>-1) {
	    vLOOP_AFTER_FIRST = this.assGrammar[lvFound][1][2];
	}
	//-----LOOP__ITEM------
	lvNONTERM = "LOOP__ITEM";
	var vLOOP__ITEM = lvNONTERM;
	lvFound = this.assGrammar.findNonTerm(lvNONTERM);
	if (lvFound>-1) {
	    vLOOP__ITEM = this.assGrammar[lvFound][1][2];
	}
	//-----LOOP_BEFORE_LAST------
	lvNONTERM = "LOOP_BEFORE_LAST";
	var vLOOP_BEFORE_LAST = lvNONTERM;
	lvFound = this.assGrammar.findNonTerm(lvNONTERM);
	if (lvFound>-1) {
	    vLOOP_BEFORE_LAST = this.assGrammar[lvFound][1][2];
	}
	//-----LOOP_END------
	lvNONTERM = "LOOP_END";
	var vLOOP_END = lvNONTERM;
	lvFound = this.assGrammar.findNonTerm(lvNONTERM);
	if (lvFound>-1) {
	    vLOOP_END = this.assGrammar[lvFound][1][2];
	}
	//-------------------------------
	var vLoopText = " "+vLOOP_BEGIN;	
	var vLoopItem = " "+vLOOP__ITEM;
	for (var j=1; j<=pGrammarNode.length; j++) {
		if (pGrammarNode.length==2) {
			vLoopItem = " "+vLOOP_AFTER_FIRST;
		} else if (j==pGrammarNode.length) {
			vLoopItem = " "+vLOOP_BEFORE_LAST;
		} else {
			vLoopItem = " "+vLOOP__ITEM;
		};
		vLoopText += vLoopItem +" "+ pGrammarNode[j][2];
	};
	
	return vLoopText + " "+vLOOP_END+" ";
}
//----End of Method loop_replacement_direct Definition


						
//#################################################################
//# Method: select_rule  
//#    used in Class: DocGenerator
//#                
//# Comment: This function will be called if the NON_TERM Symbol                    
//#          in the source text has a leading "?" i.e "?NON_TERM"                   
//#          The user must select the replacement for NON_TERM
//#
//# created               18.1.2014             
//# last modifications    18.1.2014             
//#################################################################

function select_rule_DocGenerator(pGrammarNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:select_rule(pGrammarNode)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.select_rule(pGrammarNode);
	//-------------------------------------------------------
	var vMessage = "";
	var vLength = 25;
	vMessage = "Select Replacement for "+ pGrammarNode[1][1]+"\n";
	if (pGrammarNode.length<10) {
		for (var j=1; j<=pGrammarNode.length; j++) {
			vMessage += " ("+j+") " + pGrammarNode[j][2].substr(0,vLength)+"...\n";
		};	
	};
	vMessage +="Enter number of replacement!"; 
	var k = -1;
	var vReturnValue = pGrammarNode[1][2];
	if (pGrammarNode.length > 1) {
		while ((k<=pGrammarNode.length) && (k>0)) {
			k = parseInt(prompt(vMessage));
			//alert("k='"+k+"'");
			if ((k<=pGrammarNode.length) && (k>0)) {
				vReturnValue = pGrammarNode[k][2];
			} else {
				alert("Selected Number="+k+" is out of range 1< Number<"+pGrammarNode.length);
				vReturnValue = "\n ERROR: Selection "+k+" is out of range 1< Number<"+pGrammarNode.length;
			};
		};
	};
	return vReturnValue;
}
//----End of Method select_rule Definition

						
//#################################################################
//# Method: find_citations   
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################


function find_citations_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:830 - find_citations()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.find_citations();
	//-------------------------------------------------------
	this.assCitations.init_replacement();
	for (var i=1; i<=this.rows; i++) {
		if (this[i][1].charAt(0) != ">") {
			for (var j=this.assCitations.rows; j>0; j--) { 
				if (this[i][1].indexOf("[[["+j+"]]]")>=0) {
					this.assCitations[j][5]++;		
				}
			}
		}
	}
	this.aCitations = new Array();
	for (var j=this.assCitations.rows; j>0; j--) { 
		if (this.assCitations[j][5]>0) {
			this.aCitations.push(j);
		}
	}
}
//----End of Method find_citations Definition


						
//#################################################################
//# Method: replace_citations  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function replace_citations_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:845 . replace_citations()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.replace_citations();
	//-------------------------------------------------------
	var vReplace = "";
	var vPreviousPart = "";
	this.aCiteReplacements = 0;
	for (var i=1; i<=this.rows; i++) {
		//--Before and After Overwrite no insert of new line CR 
		if (this[i][1].charAt(0) != ">") {
			//alert("docgenertor.js:854 Textpart["+i+"]\n"+this[i][1]);
			//alert("docgenertor.js:888 - BEFORE this["+i+"][1]=\n"+this[i][1]);
			for (var j=this.assCitations.rows; j>0; j--) { 
				if (this.assCitations[j][2]>0) {
					//alert("docgenertor.js:857 - Replace:[[["+j+"]]]");
					//No blank after "\n" leads to problems with replacement of SYS_DEF_CITATION ";
					//vReplace = this.assCitations[j][1] + "\nSYS_DEF_CITATION ";
					vReplace = "\n" + this.assCitations[j][1] + "\nSYS_DEF_CITATION ";
					vPreviousPart = this[i][1];
					//this[i][1] = this.replace_string(this[i][1],"[[["+j+"]]]",vReplace);
					var vEvalStr ="this[i][1] = this[i][1].replace(/\\\[\\\[\\\["+j+"\\\]\\\]\\\]/g,vReplace)";
					//alert("vEvalStr="+vEvalStr+"\ndocgenerator.js:892");
					eval(vEvalStr);
					if (vPreviousPart != this[i][1]) {
						this.aCiteReplacements++;
					}
				}
			}
			//alert("docgenertor.js:901 - AFTER this["+i+"][1]=\n"+this[i][1]);
		}
	};
	this.expand_overwrite();
}
//----End of Method replace_citations Definition

						
//#################################################################
//# Method: replace_string 
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function replace_string_DocGenerator(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
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
//----End of Method replace_string Definition

						
//#################################################################
//# Method: remove_ignore_space  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function remove_ignore_space_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:remove_ignore_space()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.remove_ignore_space();
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method remove_ignore_space Definition

						
//#################################################################
//# Method: remove_ignore_lines  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function remove_ignore_lines_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:remove_ignore_lines()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.remove_ignore_lines();
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method remove_ignore_lines Definition


						
//#################################################################
//# Method: expand_overwrite  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               12.1.2014             
//# last modifications    12.1.2014             
//#################################################################

function expand_overwrite_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:expand_overwrite()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.expand_overwrite();
	//-------------------------------------------------------
	//for (var i=1; i<=this.rows; i++) {
	//	//--Before and After Overwrite no insert of new line CR 
	//	if (this[i][1].charAt(0) != ">") {
	//		this[i][1] = this.insert_overwrite_return(this[i][1]);
	//	}
	//}
	var vText = this.export_with_overwrite();
	//vText = vText.replace(/^\s+>/g,">");
	//vText = vText.replace(/\n\s+>/g,">");
	this.load_text(vText);
}
//----End of Method expand_overwrite Definition


						
//#################################################################
//# Method: export_with_overwrite  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function export_with_overwrite_DocGenerator(pString,pGrammarNode,pCountMax) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:export_with_overwrite(pString,pGrammarNode,pCountMax)-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.export_with_overwrite(pString,pGrammarNode,pCountMax);
	//-------------------------------------------------------
	var vReturn = "";
	var vCR = "";
	for (var i=1; i<=this.rows; i++) {
		vReturn += vCR + this[i][1];
		vCR = "\n";
	};
	return vReturn;
}
//----End of Method export_with_overwrite Definition

						
//#################################################################
//# Method: export_text  
//#    used in Class: DocGenerator
//#                
//# Comment:                        
//#
//# created               4.1.2014             
//# last modifications    4.1.2014             
//#################################################################

function export_text_DocGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("docgenerator.js:export_text()-Call")
	//----Create Object/Instance of DocGenerator----
	//    var vMyInstance = new DocGenerator();
	//    vMyInstance.export_text();
	//-------------------------------------------------------
	var vReturn = "";
	var vCR = "";
	for (var i=1; i<=this.rows; i++) {
		//--Before and After Overwrite no insert of new line CR 
		if (this[i][1].charAt(0) == ">") {
			vCR = " ";
		} else {
			vReturn += vCR + this[i][1];
			vCR = " \n";
		}
	};
	return  vReturn;
}
//----End of Method export_text Definition

			