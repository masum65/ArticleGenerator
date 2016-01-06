//#################################################################
//# Javascript Class: Citations()
//#       SuperClass: Matrix
//#   Class Filename: citations.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               21.11.2013             
//# last modifications    21.11.2013             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class Citations() 
// Call the constructor for creating an instance of class Citations
// by the following command in HTML-file that imports this class
// var vMyInstance = new Citations();
//---------------------------------------------------------------------

function Citations () {
	//--------------------------------------
	//---Super Class------------------------
	this.SuperClass = Matrix;
	this.SuperClass();
	//--------------------------------------
	
	//---Attributes-------------------------
	this.parsenode       = new ParseNode();
	this.aKeywords  	 = "";
	this.aKeywordArray   = new Array();
	this.aCiteArray		 = new Array();
	this.aBibliography	 = new Array();
	this.assRules		 = null;
	this.aTolerance 	 = 0;
	this.aCiteNT = "CITE_KEYWORDS";
	this.aReferencesTAG = "___references___";

	//---Methods----------------------------
	this.init					 = init_Citations;
	this.init_generation		 = init_generation_Citations;
	this.init_search			 = init_search_Citations;
	this.init_replacement		 = init_replacement_Citations;
	this.load_bibtex			 = load_bibtex_Citations;
	this.save_bibtex			 = save_bibtex_Citations;
	this.export_bibtex			 = export_bibtex_Citations;
	this.search			 		 = search_Citations;
	this.sort			 		 = sort_Citations;
	this.calc_tolerance			 = calc_tolerance_Citations;
	this.create_bibtex_grammar	 = create_bibtex_grammar_Citations;
	this.get_sort_ID		 	 = get_sort_ID_Citations;
	this.create_cite			 = create_cite_Citations;
	this.create_citeID			 = create_citeID_Citations;
	this.select_cite			 = select_cite_Citations;
	this.random_index			 = random_index_Citations;
	this.update_references		 = update_references_Citations;

	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of Citations, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'Citations'
// the function name is extended with '_Citations'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       Citations.my_method()
// The method definitions are as follows
//   function my_method_Citations(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "Citations()" defined as JS functions 
//---------------------------------------------------------------------
						
//#################################################################
//# Method: init  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function init_Citations (pFormPath,pObjectPath) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:init()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.init();
	//-------------------------------------------------------	
	this.aBibliography  = null; //will be an Array of Bibtex Records by split("@")
	//this.assRules 	= pAssRules;
	this.formPath       = pFormPath;
	this.objectPath     = pObjectPath;
	//this.create(0,4);
}
//----End of Method init Definition

						
//#################################################################
//# Method: init_generation  
//#    used in Class: Citations
//#                
//# Comment: Call this method before generation of a text
//#          because 
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function init_generation_Citations() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:init_Generation()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.init_generation();
	//-------------------------------------------------------
	
	for (var i=1; i<this.aBibliography.length; i++) {
		// start i=1 because a Matrix has Index from 1 to aBibliography.length
		// and generate by split(/@/) that creates a bibtex comment as first split element
		this[i][2] = 0; 	// Total Count Citation
	}
	this.init_search();
}
//----End of Method init_Generation Definition

//#################################################################
//# Method: init_search 
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function init_search_Citations() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:init_search_Generation()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.init_search();
	//-------------------------------------------------------
	this.aCiteArray = new Array();
	for (var i=1; i<this.aBibliography.length; i++) {
		// start i=1 because a Matrix has Index from 1 to aBibliography.length
		// and generate by split(/@/) that creates a bibtex comment as first split element
		//this[i][1] => the grammar definition of the citations
		//this[i][2] => total count of used citations
		this[i][3] = 0;	// Search Keyword Match Count per Citation 								
		this[i][4] = "";	// Matched Keywords for Search						
	}    
	this.init_replacement();
}
//----End of Method init_search Definition

//#################################################################
//# Method: init_replacement 
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function init_replacement_Citations() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:init_Generation()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.init_replacement();
	//-------------------------------------------------------
	for (var i=1; i<this.aBibliography.length; i++) {
		// start i=1 because a Matrix has Index from 1 to aBibliography.length
		// and generate by split(/@/) that creates a bibtex comment as first split element
		//this[i][1] => the grammar definition of the citations
		//this[i][2] => total count of used citations
		//this[i][3] = 0;	// Search Keyword Match Count per Citation 								
		//this[i][4] = "";	// Matched Keywords for Search
		this[i][5] = 0;	// Replacement Count per Citation 								
		this[i][6] = 0  // Enumeration Number of Referenes is 7 e.g. for [7] if cited
		
	}    	
}
//----End of Method init_replacement Definition
						
//#################################################################
//# Method: load_bibtex  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function load_bibtex_Citations(pBibtexDB) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:load_bibtex(pBibtexDB)-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.load_bibtex(pBibtexDB);
	//-------------------------------------------------------
	var vBibtexDB = pBibtexDB.substr(0,pBibtexDB.lastIndexOf("}")+1);
	this.aBibliography = vBibtexDB.split('@');
	for (var i=1; i<this.aBibliography.length; i++) {
		this.append_row();
		var vRows = this.rows;
		this[vRows][0] = this.get_sort_ID(this.aBibliography[i]);
		this[vRows][1] = this.create_bibtex_grammar(this.aBibliography[i],"(No Keywords)",0);
		this[vRows][2] = 0; 	// Total Count Citation
		this[vRows][3] = 0;		// Search Keyword Match Count per Citation 						
		this[vRows][4] = "";	// Matched Keywords for Search						
	}
	var vCol = 0;
	//alert("1) this[1][0]="+this[1][0]+"\ncitation.js:196");
	//alert("1) this.aBibliography[1]="+this.aBibliography[1]+"\ncitation.js:197");
	this.sort(vCol);
	//alert("2) this[1][0]="+this[1][0]+"\ncitation.js:199");
	//alert("2) this.aBibliography[1]="+this.aBibliography[1]+"\ncitation.js:200");
	
	//alert("citations.rows="+this.rows+"\ncitations.js:108 - load_bibtex(pBibtexDB)-Call")
}
//----End of Method load_bibtex Definition

						
//#################################################################
//# Method: save_bibtex  
//#    used in Class: Citations
//#                
//# Comment: save Bibtex records that match Keywords
//#          perform this.search(pKeywords,pTolerance) before save
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function save_bibtex_Citations(pBibtexDB) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:save_bibtex(pBibtexDB)-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.save_bibtex(pBibtexDB);
	//-------------------------------------------------------
	var vReturn = this.aBibliography[0];
	for (var i=1; i<=this.rows; i++) {
		if (this[i][2] > 0) {
			// Search Keyword Match Count per Citation 			
			vReturn += "@"+this.aBibliography[i];
		}
	}; 
	return vReturn;
}
//----End of Method save_bibtex Definition

						
//#################################################################
//# Method: export_bibtex  
//#    used in Class: Citations
//#                
//# Comment: save Bibtex records that match Keywords
//#          perform this.search(pKeywords,pTolerance) before save
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function export_bibtex_Citations(pBibtexDB) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:export_bibtex(pBibtexDB)-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.export_bibtex(pBibtexDB);
	//-------------------------------------------------------
	var vReturn = this.aBibliography[0];
	for (var i=1; i<=this.rows; i++) {
		vReturn += "@"+this.aBibliography[i];
	}; 
	return vReturn + "\n% End of Bibtex File";
}
//----End of Method export_bibtex Definition

						
//#################################################################
//# Method: sort  
//#    used in Class: Citations
//#                
//# Comment: save Bibtex records that match Keywords
//#          perform this.search(pKeywords,pTolerance) before save
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function sort_Citations(pCol) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:sort(pCol)-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.sort(pBibtexDB);
	//-------------------------------------------------------
	//alert("pRows="+pRows+", pCols"+pCols)
	//Bubblesort for rows
	var vHelp = "";
	this.row_compare = m_row_citation_compare;
	for (var i=1; i<this.rows; i++) {
		for (var j=i+1; j<=this.rows; j++) {
			if (this.row_compare(i,j,pCol)) {
				//alert("("+this.row_compare(i,j,pCol)+") Swap "+i+" and "+j);
				this.swap(i,j);
				vHelp = this.aBibliography[i];
				this.aBibliography[i] = this.aBibliography[j];
				this.aBibliography[j] = vHelp;
			} else {
				//alert("("+this.row_compare(i,j,pCol)+") No Swap "+i+" and "+j+"\n"+this[i][pCol]+"\n>\n"+this[j][pCol]);
			}
		}
	};
	//alert("matrix.js:73 - m_append_col() this.cols="+this.cols);
}
//----End of Method sort Definition

//#################################################################
//# Method: citation_compare 
//#    used in Class: Citations
//#                
//# Comment: Compare and Swap Function for sort
//#          perform this.search(pKeywords,pTolerance) before save
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################
function m_row_citation_compare(pi1,pi2,pCol) {
	//alert("pi1="+pi1+"("+this[pi1][pCol]+")\n pi2="+pi2+"("+this[pi2][pCol]+")");
	var vReturnValue = 0;
	if (pi1>this.rows) {
		alert("Index Error: pi1="+pi1+">this.rows="+this.rows)
	} else if (this[pi1][pCol] > this[pi2][pCol]) {
		//alert("citations.js:317 - Compare\n"+ this[pi1][pCol] +"\n  >\n"+ this[pi2][pCol]);
		vReturnValue = 1;
	};
	//alert(this[pi1][pCol] +"\n compare >\n"+ this[pi2][pCol]+"\n="+vReturnValue);
	return vReturnValue;
	// return (this[pi1][pCol] < this[pi2][pCol]);
}


//#################################################################
//# Method: search 
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function search_Citations(pKeywords,pTolerance) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:search()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.search(pKeywords,pTolerance);
	//-------------------------------------------------------
	this.aKeywords = pKeywords;
	var Keyword_Array = pKeywords.split(",");
	//alert("citations.js:217 - search() - pKeywords="+pKeywords);
	//alert("Keyword_Array.length="+Keyword_Array.length);
    
	this.init_search();
	this.aKeywordArray = pKeywords.split(",");
	if (pTolerance) {
		this.calc_tolerance(pTolerance);
	} else {
		this.calc_tolerance(0);
	}
	var lvFoundKeywords  = 0;
	var vComma = "";
	var vFound_Keywords = "";
	var vBibtexRecord = "";
	var vKeyword = "";
	for (var j=0; j<Keyword_Array.length; j++) {
		vKeyword = Keyword_Array[j].toUpperCase();
		Keyword_Array[j] = vKeyword.replace(/[ \t]/g,"");
		//alert("Keyword_Array[j]="+Keyword_Array[j]); 
	};
	
	// BibTex_Array starts with index 0 this.aBibliography[0] is comment before the first record
	for (var i=1; i<this.aBibliography.length; i++) {
		// i+1 because a Matrix has Index from 1 to aBibliography.length
		var vFound_Keywords_Array = new Array();
		lvFoundKeywords = 0;
		vFound_Keywords = "";
		vComma = "";
		//alert("BibTex("+i+") \n"+this.aBibliography[i]);
		vBibtexRecord = this.aBibliography[i].toUpperCase();
		//alert("vBibtexRecord="+vBibtexRecord+"\ncitations.js:280 - search()");
		vBibtexRecord = vBibtexRecord.replace(/[ \t{}]/g,"");
		vBibtexRecord = vBibtexRecord.replace(/[{}]/g," ");
		//alert("vBibtexRecord="+vBibtexRecord+"\ncitations.js:282 - search()");
		for (var j=0; j<Keyword_Array.length; j++) {
			//if (i<6) {alert("citations.js:245 - search()\nIndex Of "+Keyword_Array[j]+"="+vBibtexRecord.indexOf(Keyword_Array[j])+" in \n"+vBibtexRecord)}
			if (vBibtexRecord.indexOf(Keyword_Array[j])>=0) {
				lvFoundKeywords++;
				vFound_Keywords += vComma + this.aKeywordArray[j];
				//--- Original_Keyword_Array = ("Segmentation","Network",...)
				//------------ Keyword_Array = ("SEGMENTATION","NETWORK",...)
				vFound_Keywords_Array.push(Keyword_Array[j]);
				vComma = ",";
				//alert(Keyword_Array[j]+" found in record \n"+ this.aBibliography[i]);
			} else {
				//alert("");
			};
		};
		var vRELCITE_RECORD = this.create_bibtex_grammar(this.aBibliography[i],vFound_Keywords,i);
		//if (lvFoundKeywords>0)
		//	alert(i+") lvFoundKeywords="+lvFoundKeywords+"\nvFound_Keywords="+vFound_Keywords+"\ncitations.js:299 - search()");
		if (lvFoundKeywords >= (this.aKeywordArray.length - this.aTolerance)) {
			this[i][1] = vRELCITE_RECORD;
			//this[i][2]++;      //increase only if cited as number of total Use of Bibitem
			this[i][3] = lvFoundKeywords; // e.g. Counter=3 means 3 Keywords found
			this[i][4] = vFound_Keywords; // "Simulation,Neural Networks"
			this.aCiteArray.push(i);
		};
	}    	
}
//----End of Method search Definition
						
//#################################################################
//# Method: calc_tolerance  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function calc_tolerance_Citations(pTolerance) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:calc_tolerance()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.calc_tolerance();
	//-------------------------------------------------------
	if (this.aKeywordArray.length == 0) {
		alert("ERROR: this.aKeywordArray contains no keywords for citation!\n - citations.js:189 - calc_tolerance()-Call");
	};
	if (pTolerance) {
		this.aTolerance = pTolerance;
		if (this.aTolerance >= this.aKeywordArray.length) {
			this.aTolerance = this.aKeywordArray.length - 1;
		}
	} else {
		alert("ERROR: pTolerance is not defined!\n set this.aTolerance=0\n - citations.js:194 - calc_tolerance()-Call");
	 	this.aTolerance = 0
	}
}
//----End of Method calc_tolerance Definition

//#################################################################
//# Method: create_cite
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function create_cite_Citations(pCitationCount) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:create_cite()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.create_cite(pKeywords,pTolerance);
	//-------------------------------------------------------
	var vSelectArray = this.select_cite(pCitationCount);
	var vFound_Keywords = "";
	var vALPH_ENUM = "";
	var vNONTERM_CITATION = "";
	var vTerm = "";
	var vComment = "";
	var vReturn = "";
	var vRuleFound = -1;
	for (var i=1; i<vSelectArray.length; i++) {
		var vFound_Keywords = this[vSelectArray[i]][4]; // found keywords in Record
		var vRELCITE_RECORD = this.createBibtexGrammar(this.aBibliography[vSelectArray[i]],vFound_Keywords);
		//--------- vALPH_ENUM = "___A" vALPH_ENUM = "___B" -------------
		vALPH_ENUM = this.parsenode.nonterm_enumerator(vSelectArray[i]);
		vNONTERM_CITATION = "CITATION_"+vALPH_ENUM;
		vRuleFound = this.assRules.findNonTerm(vNONTERM_CITATION);
		if (vRuleFound > 0) {
			//----CITATION___A {.... --------------------------------------
			//----CITATION___B {.... --------------------------------------
			vTerm  = "";
			//vTerm  = "___ignore_lines___";
			//vTerm  = "___ignore_spaces___";
			vTerm += " RELCITE_CLEAR_OVERWRITE";
			vTerm += vRELCITE_RECORD;
			vTerm += "\n>RELCITE_KEYWORDS "+vFound_Keywords ;
			vTerm += "\n RELCITE_OVERWRITE_DEFINITION";
			append_rule_Rules(vNONTERM_CITATION,vTerm,"+",1,"REFERENCES",vComment);
		}
		vReturn += " "+vNONTERM_CITATION;
		//vOutput += "@" +this.aBibliography[i] + "\n";		
	}
	return vReturn;
}
//----End of Method  create_cite Definition
//#################################################################
//# Method: create_citeID
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function create_citeID_Citations(pCitationCount) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:create_cite()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.create_cite(pKeywords,pTolerance);
	//-------------------------------------------------------
	var vSelectArray = this.select_cite(pCitationCount);
	var vReturn = "";
	for (var i=0; i<vSelectArray.length; i++) {
		this[vSelectArray[i]][2]++; //Used Citation Counter 
		vReturn +=" [[["+vSelectArray[i]+"]]]"; 
	};
	this.update_references();
	return vReturn;
}
//----End of Method  create_citeID Definition

//#################################################################
//# Method: select_cite
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function select_cite_Citations(pCitationCount) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:select_cite()-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.select_cite(pKeywords,pTolerance);
	//-------------------------------------------------------
	// this.aCiteArray contains all citation indices that exceed the Keyword Match Count 
	// with defined tolerance
	// aCiteArray = (3,34,56,70,97,123,150);
	var vSelectedArray = new Array();
	if (pCitationCount > this.aCiteArray.length) {
		alert("CITATION WARNING: You wanted to cite with the following keywords:\n  "+this.aKeywords+
			  "\nBibTeX-Database countains "+this.aCiteArray.length+" records that match the keywords"+
			  "with Tolerance="+this.aTolerance+". So "+pCitationCount+" citation are not possible. "+
			  "Algorithm will create "+this.aCiteArray.length+" citations!");
		pCitationCount = this.aCiteArray.length;
	}
	var vMax = this.aCiteArray.length; 
	var vDebugStr = "vSelectedArray = (";
	for (var j=0; j<pCitationCount; j++) {
		vSelectedArray.push(this.random_index(vMax - j));
		vDebugStr +=" "+vSelectedArray[j];
		for (var k=0; k<j; k++) {
			if (vSelectedArray[k]<=vSelectedArray[j]) {
				vSelectedArray[j] += 1;
			}
		}
		vDebugStr +="-"+vSelectedArray[j];
		//alert("vSelectedArray[j]="+vSelectedArray[j]+"\ncitations.js:391 - select_cite()-Call"); 
	};
	vDebugStr +=" )";
	//alert(vDebugStr+"\ncitations.js:391 - select_cite()-Call"); 
		
	// aCiteArray = (7,34,56,70,97,123,150);
	// vSelectedArray = (0,5,2) with pCitationCount = 3
	// vSelectedArray contains indices of this.aCitexArray
	// Selected is [[[7]]] [[[123]]] [[[56]]]
	// Replace now the Index of this.aCitexArray by the real index in this.aBibliography
	var si = 0;
	for (var i=0; i<pCitationCount; i++) {
		si = vSelectedArray[i];
		vSelectedArray[i] = this.aCiteArray[si];
		//alert("BibTex("+i+") \n"+this.aBibliography[i]);
	}
	return vSelectedArray;
}
//----End of Method  select_cite Definition

						
//#################################################################
//# Method: random_index  
//#    used in Class: Citations
//#                
//# Comment: creates a random Index i with 0<= i < pMax                       
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function random_index_Citations(pMax) {
	// creates a random index "vReturnValue" with 0 <= vReturnValue < pMax 	
	var vReturnValue = Math.round(Math.random()*pMax-0.5);
	if (vReturnValue<0) {
		vReturnValue = 0;
	} else if (vReturnValue>=pMax) {
		vReturnValue = pMax-1;
	};

	return vReturnValue;
};




						
//#################################################################
//# Method: update_references  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function update_references_Citations() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("citations.js:update_references()		-Call")
	//----Create Object/Instance of Citations----
	//    var vMyInstance = new Citations();
	//    vMyInstance.update_references()		;
	//-------------------------------------------------------
	//var vTerm = "SYS_TITLE_REFERENCES\n";
	var vTerm = "\n";
	var vNR = 0;
	for (var i=1; i<=this.rows; i++) {
		if (this[i][2] > 0) {
		    vNR++;
		    var vRELCITE_RECORD = this.create_bibtex_grammar(this.aBibliography[i],this[i][4],vNR);
		    this[i][1] = vRELCITE_RECORD;
		    this[i][6] = vNR;
			// Search Keyword Match Count per Citation 			
			vTerm += "[[["+i+"]]]\n";
		}
	}; 
	this.assRules.update_rule("SYS_REFERENCES",vTerm,"","1","SYSTEM");
}
//----End of Method update_references Definition

//#################################################################
//# Method: create_bibtex_grammar  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function create_bibtex_grammar_Citations(pBibTex_Record,pKeywords,pNR) {

	var vReturnString = "";
	//--- Determine Citation Type and Label of Bibtex record---------
	var vFoundBegin = pBibTex_Record.indexOf("{"); 
	var vFoundEnd   = pBibTex_Record.indexOf(",");
	var vType  = pBibTex_Record.substring(0,vFoundBegin);
	var vLabel = pBibTex_Record.substring(vFoundBegin+1,vFoundEnd);
	vReturnString += "\n>RELCITE_LABEL "+vLabel;
	vReturnString += "\n>RELCITE_NR "+pNR;
	vReturnString += "\n>RELCITE_TYPE WRD_"+vType;
	//--- Copy the rest without Label and Type to vRest and process record----
	var vRest = pBibTex_Record.substring(vFoundEnd+1,pBibTex_Record.lastIndexOf("}"));
	//alert("pBibtex_Record.length="+pBibTex_Record.length+"\n"+pBibTex_Record);
	//alert("vRest.length="+vRest.length+"\nvRest="+vRest);
	//-----------------------------------------------------------------
	//-----Split at Variables -> Regular Expression for Variables------
	var vRegEx = /[A-Za-z]+\s*=\s*\{/;
	var vBibtex_Array = vRest.split(vRegEx);
	//alert("vBibtex_Array.length="+vBibtex_Array.length+"\n"+pBibTex_Record);
	//-----------------------------------------------------------------
	//-----Split at Content -> Regular Expression for Variables -------
	vRegEx = /=\s*\{.+?\}\s*,[\s\n]*/;
	var vBibtex_Variables = vRest.split(vRegEx);
	// match = vRest.match( vRegEx );
	var vMaxLength = vBibtex_Variables.length;
	if (vBibtex_Variables.length > vBibtex_Array.length) {
		vMaxLength = vBibtex_Array.length;
	}
	if (vBibtex_Variables.length !=vBibtex_Array.length  ) {
		//alert("Length Different! Variables"+vBibtex_Variables.length +"!= Content"+ vBibtex_Array.length+"\nArticleGenerator.js:619 - m_create_bibtex_grammar()\n"+pBibTex_Record);
	} else {
		//alert("Bibtex.length="+vBibtex_Variables.length);
	};
 	//var vBibtex_Array = vRest.split("= {");
	var vCR = "";
	vCR = "\n";
	var vVariable = "";
	var vContent = "";
	var vContentProcessed = "";
	var vJournal = "";
	var vVolume   = "";
	var vPages   = "";
	var vComma = "";
	for (var j=1; j< vMaxLength; j++) {
		vVariable = vBibtex_Variables[j-1].toUpperCase();
		//vVariable = vVariable.replace(/\W/g,"");
		vVariable = this.parsenode.convert2nonterm(vVariable);
		vContent  = vBibtex_Array[j].substring(0,vBibtex_Array[j].lastIndexOf("}"));
		if (vVariable=="TYPE") {
			vContent = "WRD_" + vContent;
		};
		if (vVariable=="AUTHOR") {
			vContentProcessed = this.parsenode.and2etal(vContent," and ");	
			vReturnString += vCR + ">RELCITE_"+ vVariable + "S " + vContentProcessed;
			vContentProcessed = this.parsenode.and2commalist(vContent," and ");	
			if (this.parsenode.plural_checker(vContent," and ")) {
				vReturnString += vCR + ">RELCITE_HAVE WRD_HAVE";
			} else {
				vReturnString += vCR + ">RELCITE_HAVE WRD_HAS";
			};
			vContent = this.parsenode.and2commalist(vContent," and ");	
		} else if (vVariable=="TITLE") {
			vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
		} else if (vVariable=="YEAR") {
			vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
		} else if (vVariable=="JOURNAL") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vJournal += vContent;
			vComma = ", ";
		} else if (vVariable=="EDITOR") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vContentProcessed = this.parsenode.and2commalist(vContent," and ");	
			vJournal = ", WRD_EDS: " + vContentProcessed;
			vComma = ", ";
		} else if (vVariable=="VOLUME") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vVolume = ", WRD_VOL " + vContent + vVolume;
			vComma = ", ";
		} else if (vVariable=="NUMBER") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vVolume += "-" + vContent ;
			vComma = ", ";
		} else if (vVariable=="PAGES") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vPages += vComma +"WRD_PP " + vContent ;
			vComma = ", ";
		} else if (vVariable=="PUBLISHER") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vJournal += vComma + vContent ;
			vComma = ", ";
		} else if (vVariable=="SERIE") {
			//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
			vVolume += vComma + vContent ;
			vComma = ", ";
		};
		
		// PUBLISHER, SCHOOL, VOLUME, PAGES, SERIE
		//vReturnString += vCR + ">RELCITE_"+ vVariable + " " + vContent;
		vCR = "\n";
	}
	//vReturnString += vCR + ">RELCITE_JOURNAL " + vJournal + vVolume;
	// match = html.match( startTag );	
// 	if ( match ) {
// 		html = html.substring( match[0].length );
// 		match[0].replace( startTag, parseStartTag );
// 	}
//	for (var j=0; j<Keyword_Array.length; j++) {
//		//vReturnString += vCR + "CITE__KEYWORDS CITE_"+Keyword_Array[j];
//		vCR = "\n";
//	}
	vReturnString += vCR + ">RELCITE_JOURNAL " + vJournal + vVolume + vPages;
			
	return vReturnString;
}


//#################################################################
//# Method: get_sort_ID  
//#    used in Class: Citations
//#                
//# Comment:                        
//#
//# created               21.11.2013             
//# last modifications    21.11.2013             
//#################################################################

function get_sort_ID_Citations(pBibTex_Record) {
	//alert("citations.js:596 - get_sort_ID()-Call with\npBibTex_Record="+pBibTex_Record);
	var vReturnString = "";
	//--- Determine Citation Type and Label of Bibtex record---------
	var vFoundBegin   = pBibTex_Record.indexOf(",");
	//--- Copy the rest without Label and Type to vRest and process record----
	var vRest = pBibTex_Record.substring(vFoundBegin+1,pBibTex_Record.lastIndexOf("}"));
	//alert("pBibtex_Record.length="+pBibTex_Record.length+"\n"+pBibTex_Record);
	//alert("vRest.length="+vRest.length+"\nvRest="+vRest);
	//-----------------------------------------------------------------
	//-----Split at Variables -> Regular Expression for Variables------
	var vRegEx = /[A-Za-z]+\s*=\s*\{/;
	var vBibtex_Array = vRest.split(vRegEx);
	//alert("vBibtex_Array.length="+vBibtex_Array.length+"\n"+pBibTex_Record);
	//-----------------------------------------------------------------
	//-----Split at Content -> Regular Expression for Variables -------
	vRegEx = /=\s*\{.+?\}\s*,[\s\n]*/;
	var vBibtex_Variables = vRest.split(vRegEx);
	// match = vRest.match( vRegEx );
	var vMaxLength = vBibtex_Variables.length;
	if (vBibtex_Variables.length > vBibtex_Array.length) {
		vMaxLength = vBibtex_Array.length;
	}
	if (vBibtex_Variables.length !=vBibtex_Array.length  ) {
		//alert("Length Different! Variables"+vBibtex_Variables.length +"!= Content"+ vBibtex_Array.length+"\nArticleGenerator.js:619 - m_get_sort_ID()\n"+pBibTex_Record);
	} else {
		//alert("Bibtex.length="+vBibtex_Variables.length);
	};
 	//var vBibtex_Array = vRest.split("= {");
	var vCR = "";
	vCR = "\n";
	var vVariable = "";
	var vContent = "";
	var vContentAuthor = "ZZ";
	var vContentEditor = "ZZ";
	var vContentTitle  = "";
	var vContentYear   = "2014";
	var vContentProcessed = "";
	for (var j=1; j< vMaxLength; j++) {
		vVariable = vBibtex_Variables[j-1].toUpperCase();
		//vVariable = vVariable.replace(/\W/g,"");
		vVariable = this.parsenode.convert2nonterm(vVariable);
		vContent  = vBibtex_Array[j].substring(0,vBibtex_Array[j].lastIndexOf("}"));
		//if ((vVariable=="AUTHOR") || (vVariable=="EDITOR")) {
		if (vVariable=="AUTHOR") {
			vContent = vContent.toUpperCase();	
			vContentAuthor = this.parsenode.and2commalist(vContent," and ");	
		};
		if (vVariable=="YEAR") {
			//vContent = vContent.toUpperCase();	
			vContentYear = vContent.replace(/[^\d]g/,"");	
		};
		if (vVariable=="EDITOR") {
			vContent = vContent.toUpperCase();	
			vContentEditor = this.parsenode.and2commalist(vContent," and ");	
		};
	}
	vReturnString = vContentAuthor + " " + vContentYear + " "+ vContentEditor;
	//alert("citations.js:653 - get_sort_ID()-Call with\nvReturnString="+vReturnString);
	return vReturnString;
}