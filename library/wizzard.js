//#################################################################
//# Javascript Class: Wizzard()
//#       SuperClass: Rules
//#   Class Filename: wizzard.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               12.11.2013             
//# last modifications    12.11.2013             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class Wizzard() 
// Call the constructor for creating an instance of class Wizzard
// by the following command in HTML-file that imports this class
// var vMyInstance = new Wizzard();
//---------------------------------------------------------------------

function Wizzard () {
	//--------------------------------------
	//---Super Class------------------------
	this.SuperClass = Rules;
	this.SuperClass();
	//--------------------------------------
	
	//---Associations-----------------------
	this.assRules 	= null;
	this.assGrammar = null;
	this.assArticleGenerator = null;
	//---Attributes-------------------------
	this.assRules = 0;
	this.active		= 0;
	this.selectRule = 0;
	this.aURLnext = "addrulesplit.html";
	//this.aURLnext = "editselectedgrammar.html";
	this.aNONTERM = "MY_NONTERM";
	this.aNONTERM_Display = 2; // 0=hidden 1=Display 2=Edit
	this.aComment = "My Comment";
	this.aTERM = "My definition of the rule";
	this.isOneliner = -1;
	this.aOperator = "+";
	this.aWeight = "3";
	this.aWeight_Display = 2; // 0=hidden 1=Display 2=Edit
	this.aGrammarID = "WIZZARD";
	this.aGrammarID_Display = 2;  // 0=hidden 1=Display 2=Edit
	//-------------------
	this.parsenode = new ParseNode();
	this.aLineIndex = 0;
	this.aGrammarArray = new Array("#Wizzard-NEXTURL=http://www.uni-landau.de","NT_TEST+3 {","  Definition","}");
	this.aSingleInputNONTERM = "wizzardsingle.html";
	this.aMultiInputNONTERM  = "wizzardmulti.html";
	this.aStopHTML = "empty.html";
	//---Methods----------------------------
	this.init_nonterm	 = init_nonterm_Wizzard;
	this.load			 = load_Wizzard;
	this.set_grammar4wizzard	 = set_grammar4wizzard_Wizzard;
	this.get_status	 = get_status_Wizzard;
	this.next	 = next_Wizzard;
	this.start	 = start_Wizzard;
	this.stop	 = stop_Wizzard;
	this.add_rule = add_rule_Wizzard;
	this.continue_read_comment	 = continue_read_comment_Wizzard;
	this.read_comment_def		 = read_comment_def_Wizzard;
	this.read_nonterm_def		 = read_nonterm_def_Wizzard;
	this.read_term_def			 = read_term_def_Wizzard;
	this.read_block_def			 = read_block_def_Wizzard;
	this.read_onliner_def		 = read_onliner_def_Wizzard;
	this.get_FirstChar			 = get_FirstChar_Wizzard;
	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of Wizzard, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'Wizzard'
// the function name is extended with '_Wizzard'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       Wizzard.my_method()
// The method definitions are as follows
//   function my_method_Wizzard(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "Wizzard()" defined as JS functions 
//---------------------------------------------------------------------

						
//#################################################################
//# Method: init_nonterm  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               19.1.2014             
//# last modifications    19.1.2014             
//#################################################################

function init_nonterm_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:init_nonterm()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.init_nonterm();
	//-------------------------------------------------------
	this.active = 0;
	this.aNONTERM_Display   = 1; // 0=hidden 1=Display 2=Edit
	this.aWeight_Display    = 1; // 0=hidden 1=Display 2=Edit
	this.aGrammarID_Display = 1;  // 0=hidden 1=Display 2=Edit
	this.aNONTERM_Display   = 2; // 0=hidden 1=Display 2=Edit
	this.aWeight_Display    = 2; // 0=hidden 1=Display 2=Edit
	this.aGrammarID_Display = 2;  // 0=hidden 1=Display 2=Edit
	this.aComment = "<b>Thesaurus:</b> <a href='http://thesaurus.com/' target='_blank'>Alternatives Rule Definition </a>"
	this.aNONTERM = "MY_VARIABLE";
	this.aWeight = "1";
	this.aOperator = "";
	this.aGrammarID = "GRAMMARID";
	this.aTERM  = "jaksjdhkajh\n>TEST my definition of rule";	
	this.aTERM  = "my definition of rule";	
}
//----End of Method init_nonterm Definition	
	
//#################################################################
//# Method: load  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function load_Wizzard(pGrammarText,pGrammarID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:load()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.load();
	//-------------------------------------------------------
	this.aGrammarID = pGrammarID;
	this.assRules.remove_grammar(pGrammarID);
	this.set_grammar4wizzard(pGrammarText);
	this.aNONTERM_Display   = 1; // 0=hidden 1=Display 2=Edit
	this.aWeight_Display    = 1; // 0=hidden 1=Display 2=Edit
	this.aGrammarID_Display = 1;  // 0=hidden 1=Display 2=Edit
	this.start();
	//top.main.document.location.href = "frames/addrule.html";
	//alert("load-Wizzard: goto addrule.html\nwizzard.js:120");
	//top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/addrule.html'",100);	
}
						
//#################################################################
//# Method: set_grammar4wizzard  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function set_grammar4wizzard_Wizzard(pGrammarText) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:set_grammar4wizzard(pGrammarText)-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.set_grammar4wizzard(pGrammarText);
	//-------------------------------------------------------
	//alert("wizzard.js:132: \n"+pGrammarText);
	this.aGrammarArray = pGrammarText.split(/[\n]+/);
	this.aLineIndex = 0;
}
//----End of Method set_grammar4wizzard Definition

						
//#################################################################
//# Method: next()  
//#    used in Class: Wizzard
//#                
//# Comment:  next() is performed in addrule.html and addrulesplit.html                      
//#           has to act different if wizzard is active=1 or not active=0
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################
function next_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:164 - next_input()-Call");
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.next_input();
	//-------------------------------------------------------
	//----WIZZARD ACTIVE-----
	if (this.active > 0) {
	    do {
	    	this.selectRule = 0;
			this.read_comment_def();
			//alert("wizzard.js:156 \nComment: "+this.aComment);
			this.read_nonterm_def();
			//alert("wizzard.js:158 \nNONTERM: "+this.aNONTERM);
			//alert("wizzard.js:159 \nWeight: "+this.aWeight);
			//this.read_term_def();
			//alert("Please Enter Definition for '"+this.aNONTERM+"'");
			var vFirstChar = this.get_FirstChar();
	    	this.aNONTERM = this.aNONTERM.replace(/\s/g,"");
			//alert("wizzard.js:168 - Line="+this.aLineIndex+" NONTERM='"+this.aNONTERM+"'");
		} while ((this.aLineIndex < this.aGrammarArray.length) && (this.aNONTERM ==""));
	    if (this.aLineIndex >= this.aGrammarArray.length) {
	    	this.aNONTERM = "";
	    }
	    if (this.aNONTERM != "") {
			//alert("wizzard.js:171 - NONTERM='"+this.aNONTERM+"'");
			if (this.selectRule >0) {
		    	//top.main.document.location.href = "selectrule.html";
		    	//alert("Select a Rule for '"+this.aNONTERM+"' with Selection-Rule='"+this.aTERM+"'\nwizzard.js:190");
		   		top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/selectrule.html'",100);	

			} else {
	    		//top.main.document.location.href = "addrule.html";
	    		top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/addrulesplit.html'",100);	

	    	}
   	 	} else {
			this.aNONTERM_Display   = 2; // 0=hidden 1=Display 2=Edit
			this.aWeight_Display    = 2; // 0=hidden 1=Display 2=Edit
			this.aGrammarID_Display = 2;  // 0=hidden 1=Display 2=Edit
    		alert("Wizzard finished!");
    		//alert("Wizzard finished! Line="+this.aLineIndex+"/"+this.aGrammarArray.length);
    		//top.main.document.location.href = "grammarselect1.html";
    		//top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/grammarselect1.html'",100);
    		this.assArticleGenerator.grammarfiles.preload();
		}
	} else {
	//----WIZZARD NOT ACTIVE-----
		alert("next()-Call if wizzard is not active\nwizzard.js:212");
		this.init_nonterm();
	}
}
//----End of Method next_input Definition

//#################################################################
//# Method: get_status  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               18.11.2013             
//# last modifications    18.11.2013             
//#################################################################

function get_status_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:get_status()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.get_status();
	//-------------------------------------------------------
	var vReturn = "";
	var vComma = "";
	if (this.active>0) {	
		vReturn += vComma+"active";
		vComma = ",";
	};
	if (this.aGrammarArray.length>0) {	
		vReturn += vComma+"loaded";
		vComma = ",";
		if (this.aLineIndex == 0) {	
			vReturn += vComma+"start";
			
		} else if (this.aLineIndex <this.aGrammarArray.length) {	
			vReturn += vComma+"continue";
			vComma = ",";
		}
	}
	return vReturn
}

						
//#################################################################
//# Method: start  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function start_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:start()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.start();
	//-------------------------------------------------------
	this.active = 1;
	this.aLineIndex = 0;
	if (this.aGrammarArray.length>0) {	
		this.aNONTERM_Display   = 1; // 0=hidden 1=Display 2=Edit
		this.aWeight_Display    = 1; // 0=hidden 1=Display 2=Edit
		this.aGrammarID_Display = 1;  // 0=hidden 1=Display 2=Edit
		this.next();
	} else {
		this.stop();
	}
}
//----End of Method start Definition

						
//#################################################################
//# Method: stop  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function stop_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:stop()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.stop();
	//-------------------------------------------------------
	//this.aLineIndex = this.aGrammarArray.length + 1;
	//top.main.document.location.href = "destinationtext.html";
	this.active = 0;
	//top.main.document.location.href = "empty.html";
	top.vArticleGenerator.setTimeout("top.main.document.location.href = 'frames/empty.html'",100);	

}
//----End of Method stop Definition

//#################################################################
//# Method: add_rule  
//#    used in Class: Wizzard
//#                
//# Comment: The attributes have to be updated from addrulesplit                       
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function add_rule_Wizzard () {
	var vNONTERM  = this.aNONTERM;
	var vComment  = this.aComment;
	var vTERM     = this.aTERM;
	var vOperator = this.aOperator;
	var vWeight   = this.aWeight;
	var vGrammarID= this.aGrammarID;
	this.assRules.append_rule_Rules(vNONTERM,vTERM,vOperator,vWeight,vGrammarID,vComment);
}


//#################################################################
//# Method: get_FirstChar  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function get_FirstChar_Wizzard () {
	var vFirstChar = "";
    if (this.aLineIndex < this.aGrammarArray.length) {
    		//---------------------------------------
    		if (this.aGrammarArray[this.aLineIndex].length == 0) {
				this.aGrammarArray[this.aLineIndex] = " ";
				vFirstChar == " ";
			} else {
				vFirstChar = this.aGrammarArray[this.aLineIndex].charAt(0);
			};
	}
	return vFirstChar;
}

//#################################################################
//# Method: continue_read_comment  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function continue_read_comment_Wizzard () {
	var vReturn = false;
	var vLine = this.aGrammarArray[this.aLineIndex];
    if (this.aLineIndex < this.aGrammarArray.length) {
    	//---------------------------------------
		if (this.aGrammarArray[this.aLineIndex].length == 0) {
			alert("Comment Read: Empty Line\nwizzard.js:412");
			this.aComment = "";
			vReturn = true;
		} else if (this.aGrammarArray[this.aLineIndex] == " ") {
			alert("Comment Read: Empty Line\nwizzard.js:434");
			this.aComment = "";
			vReturn = true;
		} else {
			vFirstChar = this.aGrammarArray[this.aLineIndex].charAt(0);
			if (vFirstChar == "#") {
				vReturn = true;
			} else if ((vFirstChar >= "A") && (vFirstChar <= "Z")) {
				//alert("Comment Read: New NONTERM found \n"+vLine+"\nwizzard.js:428"); 
				vReturn = false;
			} else {
				//alert("Comment Read: First Char not #\n"+vLine+"\nwizzard.js:430");
			}
		};
	}
	return vReturn;
}

//#################################################################
//# Method: read_comment_def  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################
function read_comment_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:332 - read_comment_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_comment_def();
	//-------------------------------------------------------
	var vLine = "";
	var vSearch = "";
	var vIndex = -1;
	var vLength = -1;
	var vFirstChar = this.get_FirstChar();
	var vCR = "";
    if (this.aLineIndex < this.aGrammarArray.length) {
		this.aComment = "";
		while( this.continue_read_comment() ) {
			//---------------------------------------
			vFirstChar = this.get_FirstChar();
			//alert("vFirstChar='"+vFirstChar+"'\nwizzard.js:349");
    		if (vFirstChar == "#") {
    		    vLine = this.aGrammarArray[this.aLineIndex];
    		    //alert("CommentLine["+this.aLineIndex+"]="+vLine+"\nwizzard.js:349");
    		    vSearch = "Wizzard-NEXTURL=";
    		    if (vLine.indexOf(vSearch)>0) {
    		        vIndex = vLine.indexOf(vSearch) + vSearch.length;
    		        vLength = vLine.length - vIndex +1;
    		        vURL = vLine.substr(vIndex,vLength);
    		        alert("Goto URL: "+vURL);
    		        //top.main.document.location.href = vURL;
    		    }
    			this.aComment += vCR + vLine.substr(1,vLine.length-1);
    			vCR = "<BR/>\n";
    		//} else if (vFirstChar == " ") {
    		} else {
    			alert("Delete Comment due to empty Line in Definition exterioir\nwizzard.js:361");
    			this.aComment = "";
			}
			//--------------------------------------- 
			this.aLineIndex += 1;
			//vFirstChar = this.get_FirstChar();
			if (this.aGrammarArray[this.aLineIndex]) { alert("Line='"+this.aGrammarArray[this.aLineIndex]+"'\nwizzard.js:486 - read_comment_def()"); }
		} //---END While
	}    	
	//alert("Wizzard Comment: - wizzard.js:373\n"+this.aComment);
}
//----End of Method read_comment_def Definition

function X_read_comment_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	alert("wizzard.js:332 - read_comment_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_comment_def();
	//-------------------------------------------------------
	var vLine = "";
	var vIndex = -1;
	var vLength = -1;
	var vFirstChar = this.get_FirstChar();
	var vCR = "";
    if (this.aLineIndex < this.aGrammarArray.length) {
		this.aComment = "";
		while(  (this.aLineIndex < this.aGrammarArray.length) &&
    	        ((vFirstChar == "#") || (vFirstChar == " "))) {
			//---------------------------------------
			vFirstChar = this.get_FirstChar();
			alert("vFirstChar='"+vFirstChar+"'\nwizzard.js:349");
    		if (vFirstChar == "#") {
    		    vLine = this.aGrammarArray[this.aLineIndex];
    		    //alert("CommentLine["+this.aLineIndex+"]="+vLine+"\nwizzard.js:349");
    		    vSearch = "Wizzard-NEXTURL=";
    		    if (vLine.indexOf(vSearch)>0) {
    		        vIndex = vLine.indexOf(vSearch) + vSearch.length;
    		        vLength = vLine.length - vIndex +1;
    		        vURL = vLine.substr(vIndex,vLength);
    		        alert("Goto URL: "+vURL);
    		        //top.main.document.location.href = vURL;
    		    }
    			this.aComment += vCR + vLine.substr(1,vLine.length-1);
    			vCR = "<BR/>\n";
    		//} else if (vFirstChar == " ") {
    		} else {
    			alert("Delete Comment due to empty Line in Definition exterioir\nwizzard.js:361");
    			this.aComment = "";
			}
			//--------------------------------------- 
			this.aLineIndex += 1;
			//vFirstChar = this.get_FirstChar();
			//if (this.aGrammarArray[this.aLineIndex]) { alert(this.aGrammarArray[this.aLineIndex]); }
		} //---END While
	}    	
	alert("Wizzard Comment: - wizzard.js:373\n"+this.aComment);
}
//----End of Method read_comment_def Definition

						
//#################################################################
//# Method: read_nonterm_def  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function read_nonterm_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:read_nonterm_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_nonterm_def();
	//-------------------------------------------------------
	//if (this.aGrammarArray[this.aLineIndex]) { alert("wizzard.js:335\nLine="+this.aGrammarArray[this.aLineIndex]); }
    if (this.aLineIndex < this.aGrammarArray.length) {
    	//--Error Checker---
    	var vFirstChar = this.get_FirstChar();
    	//if (this.aGrammarArray[this.aLineIndex]) {
    	//alert("wizzard.js.317 \nLine="+this.aGrammarArray[this.aLineIndex]+"\nFirstChar='"+vFirstChar+"'");
    	//}
    	var vLine = this.aGrammarArray[this.aLineIndex];
    	vLine = vLine.replace(/\s/g," ");
    	this.aGrammarArray[this.aLineIndex] = vLine;
    	//alert("wizzard.js.568 read_nonterm_def()\nLine='"+vLine+"'");
		if (vFirstChar=='}') {
			alert("Error in non-terminal definition. "+
				  "Non-Term begins with closing curley bracket '"+vFirstChar+"'.\n"+
				  "wizzard.js:572");
		// } else if (vFirstChar=='{') {
		//	alert("Error in non-terminal definition. "+
		//		  "Non-Term begins with a curley bracket '"+vFirstChar+"'.");
		} else {
			var vNONTERM_Bracket = this.parsenode.parse_nonterm_bracket(vLine);
			//alert("vNONTERM_Bracket='"+vNONTERM_Bracket+"'\nwizzard.js:383");
			this.aTerm_after_Nonterm  = this.parsenode.term_after_nonterm(vLine);
			//alert("this.aTerm_after_Nonterm="+this.aTerm_after_Nonterm+"\nwizzard.js:384");
			this.aOperator  = this.parsenode.parse_operator(vNONTERM_Bracket)+"";
			//alert("this.aOperator='"+this.aOperator+"'\nwizzard.js:385");
			this.aWeight  = this.parsenode.parse_weight(vNONTERM_Bracket);
			//alert("this.aWeight="+this.aWeight+"\nwizzard.js:387");
			this.aNONTERM = this.parsenode.parse_nonterm(vNONTERM_Bracket);
			//alert("this.aNONTERM='"+this.aNONTERM+"'\nwizzard.js:389");
			this.aTERM = this.parsenode.parse_term_part(vNONTERM_Bracket);
			//alert("BEFORE this.aTERM="+this.aTERM+"\nwizzard.js:506");
			this.read_term_def();
			//alert("AFTER this.aTERM="+this.aTERM+"\nwizzard.js:508");
			//alert("A="+"A".charCodeAt(0)+" Z="+"Z".charCodeAt(0)+"\nwizzard.js:508");
			var vCharCode = vFirstChar.charCodeAt(0);
			//this.aLineIndex++;
		};
		//------
	}
}
//----End of Method read_nonterm_def Definition

						
//#################################################################
//# Method: read_term_def  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               12.11.2013             
//# last modifications    12.11.2013             
//#################################################################

function read_term_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:read_term_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_term_def();
	//-------------------------------------------------------
	if (this.aLineIndex < this.aGrammarArray.length) {
		//var vTermpart = this.aTERM.replace(/\s/g,"");
    	//if (this.aGrammarArray[this.aLineIndex].indexOf("{") > 0) {
    	//alert("vTermpart='"+vTermpart+"'\nwizzard.js:418");
    	var vTermpart = this.aTerm_after_Nonterm;
    	var vLine = this.aGrammarArray[this.aLineIndex];
		if (vTermpart == "{") {
			//alert("Read a Block Term Definition\n"+vLine+"\nwizzard.js:419");
			this.aTERM = "";
			this.aLineIndex += 1;
			this.read_block_def();
		} else {
			//alert("Read a Onliner-Term Definition\n"+vLine+"\nwizzard.js:424");
			this.read_onliner_def();
			this.aLineIndex++;
		}
	} else {
		this.stop();
	}
}
//----End of Method read_term_def Definition

							
//#################################################################
//# Method: read_block_def  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               16.11.2013             
//# last modifications    16.11.2013             
//#################################################################

function read_block_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:read_block_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_block_def();
	//-------------------------------------------------------
	var vCR = "";
	var vFirstChar = this.get_FirstChar();
	this.aTERM = "";
	//----Handle the First Non-Term Line ----
    while ((this.aLineIndex < this.aGrammarArray.length) && 
    	   (vFirstChar != "}")) {
    	//--Error Checker---
    	this.aTERM += vCR + this.aGrammarArray[this.aLineIndex];
    	vCR = "\n";
    	this.aLineIndex +=1;
    	vFirstChar = this.get_FirstChar();
    }
    if (vFirstChar == "}") {
    	//alert("wizzard.js:420 - Curley Bracket found - Add 1 to aLineIndex");
    	this.aLineIndex +=1;
    } else {
    	alert("ERROR: Definition of "+this.aNONTERM+" ends without curley bracket in line "+this.aLineIndex);
    }
}
//----End of Method read_block_def Definition

						
//#################################################################
//# Method: read_onliner_def  
//#    used in Class: Wizzard
//#                
//# Comment:                        
//#
//# created               16.11.2013             
//# last modifications    16.11.2013             
//#################################################################

function read_onliner_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:613\nread_oneliner_def()-Call\naTERM="+this.aTERM+"")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_block_def();
	//-------------------------------------------------------
	//alert("wizzard.js:619\nread_oneliner_def()-Call\naTERM="+this.aTERM+"")
	var vLine = this.aGrammarArray[this.aLineIndex];
	//this.aTERM = this.parsenode.parse_term_onliner(vLine);
	var vTextString = this.aTERM.replace(/^\s+/g,"");
	var vFirstChar = "";
	if (vTextString.length > 0) {
		vFirstChar = vTextString.charAt(0);
	};
	$vSelectRule = "";
	if (vFirstChar == "?") {
		var vPair = vTextString.split(/\s+/);
		this.selectRule = 1;
		//$vSelectRule = vPair[0].substr(vPair[0].indexOf("?")+1,vPair[0].length-1);
		//alert("SelectRule=TRUE for "+$vSelectRule+"\nwizzard.js:503");
		//this.aTERM = $vSelectRule;
	}	
	//alert("wizzard.js:450 - read_onliner_def()\naTERM="+this.aTERM);
	//this.aLineIndex +=1;
}

function X_read_onliner_def_Wizzard() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("wizzard.js:read_onliner_def()-Call")
	//----Create Object/Instance of Wizzard----
	//    var vMyInstance = new Wizzard();
	//    vMyInstance.read_onliner_def();
	//-------------------------------------------------------
	var vLine = this.aGrammarArray[this.aLineIndex];
	alert("wizzard.js:614 - read_onliner_def()\nvLine="+vLine);
	this.aTERM = this.parsenode.parse_term_onliner(vLine);
	var vTextString = this.aTERM.replace(/^\s+/g,"");
	var vFirstChar = "";
	if (vTextString.length > 0) {
		vFirstChar = vTextString.charAt(0);
	};
	$vSelectRule = "";
	if (vFirstChar == "?") {
		var vPair = vTextString.split(/\s+/);
		this.selectRule = 1;
		//$vSelectRule = vPair[0].substr(vPair[0].indexOf("?")+1,vPair[0].length-1);
		//alert("SelectRule=TRUE for "+$vSelectRule+"\nwizzard.js:503");
		this.aTERM = $vSelectRule;
	}	
	//alert("wizzard.js:450 - read_onliner_def()\naTERM="+this.aTERM);
	this.aLineIndex +=1;
}
//----End of Method read_onliner_def Definition
		