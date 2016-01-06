//#################################################################
//# Javascript Class: GrammarFiles()
//#       SuperClass: Matrix
//#   Class Filename: grammarfiles.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               4.2.2013             
//# last modifications    4.2.2013             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class GrammarFiles() 
// Call the constructor for creating an instance of class GrammarFiles
// by the following command in HTML-file that imports this class
// var vMyInstance = new GrammarFiles();
//---------------------------------------------------------------------

function GrammarFiles () {
	//--------------------------------------
	//---Super Class------------------------
	this.SuperClass = Matrix;
	this.SuperClass();
	//--------------------------------------
	this.assArticleGenerator = null;
	//---Attributes-------------------------
	this.name = "GrammarFiles";
	this.folder = "grammar/";
	this.preload_index = 0;
	this.fileindex = 0;
	this.nextfile  = "empty.html"; //used for HTML-Load Chain
	this.finalfile = "empty.html"; //used for HTML-Load Chain
	//---Methods----------------------------
	this.init				 = m_init_GrammarFiles;
	this.unloadGrammar		 = m_unloadGrammar_GrammarFiles;
	this.show				 = m_show_GrammarFiles;
	this.split_grammarfiles	 = split_grammarfiles_GrammarFiles;
	this.preload			 = preload_GrammarFiles;
	this.check_preload		 = check_preload_GrammarFiles;
	this.set_loaded			 = set_loaded_GrammarFiles;
	this.set_unloaded		 = set_unloaded_GrammarFiles;

	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of GrammarFiles, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'GrammarFiles'
// the function name is extended with '_GrammarFiles'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       GrammarFiles.my_method()
// The method definitions are as follows
//   function my_method_GrammarFiles(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "GrammarFiles()" defined as JS functions 
//---------------------------------------------------------------------
			
//#################################################################
//# Method: split_grammarfile  
//#    used in Class: GrammarFiles
//#                
//# Comment:                        
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################

function split_grammarfiles_GrammarFiles(pTextAreaString) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("grammarfiles.js:74 - split_grammarfile("+pTextAreaString+")-Call")
	//----Create Object/Instance of GrammarFiles----
	//    var vMyInstance = new GrammarFiles();
	//    vMyInstance.split_grammarfile(pTextAreaString);
	//-------------------------------------------------------
	var vGrammarFileArray = pTextAreaString.split("\n");
	//alert("grammarfiles.js:79 - split_grammarfile() length after split="+vGrammarFileArray.length+"'")
	for (var i=0; i<vGrammarFileArray.length; i++) {
		var vTriple = vGrammarFileArray[i].split("|");
		if (vTriple.length > 1) {
			this.add(vTriple);
		};
	}
	//alert("grammarfiles.js:79 - split_grammarfile() length GrammarFiles='"+this.rows+"'")
}
//----End of Method split_grammarfile Definition

//#################################################################
//# Method: m_show_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: overwrites the show-method of Matrix()                       
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################
			
function m_show_GrammarFiles() {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//---Overwrites Method from "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("grammarfiles.js:136 - m_show_GrammarFile()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	vContentHTML +="<table border=0>";
	vContentHTML +="<tr>";
	//---TABLE ROWS---
	for (var i=1; i<=this.rows; i++) {
		vContentHTML +="<tr>";
		vContentHTML +="<td><nobr>" + this[i][1] + "</nobr></td>";
		vContentHTML +="<td><nobr><a href=\"../" + this.folder + this[i][2] + ".html\">/"+ this.folder +this[i][2]+".html</a></nobr> "+this[i][3]+"</td>";
		vContentHTML +="</tr>";
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("grammarfiles.js:108 - m_show_GrammarFiles() this.rows="+this.rows);
	return vContentHTML; 
}

//#################################################################
//# Method: m_init_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: overwrites the show-method of Matrix()                       
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################
			
function m_init_GrammarFiles() {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
    this.preload_index = 0;
	this.removeall();
	this.rows = 0;
	//this.cols = 0
}


//#################################################################
//# Method: preload_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: increase preload_index and preload a single Grammar File
//#          that has the Preload-Tag "L" set in config.html
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################
			
function preload_GrammarFiles() {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//alert("grammarfiles.js:169 preload_GrammarFiles()\n Name: "+this.name);
	// this.preload_index = 100;
	if (this.preload_index == 0) {
		with (this.assArticleGenerator) {
			//alert("textGrammar="+textGrammar+"\ngrammarfiles.js:169");
			import_grammar(textGrammar,"SYSTEM");
		}
	}
	this.preload_index++;
	while ((this.preload_index <= this.rows) 
		&& (this[this.preload_index][3] != "L")
		&& (this[this.preload_index][3] != "W")
		) {
		this.preload_index++;
	};
	if (this.preload_index > this.rows) {
		var vEval ="top.main.document.location.href = 'frames/postprocessingload.html'";
		top.vArticleGenerator.setTimeout(vEval,100);	
		//top.main.document.location='./frames/empty.html';
		//alert("All grammars defined in config.html were preloaded!\ngrammarfiles.js:149 - preload_Grammarfiles()");
	} else if (this[this.preload_index][3] == "W") {
	 	this.assArticleGenerator.wizzard.active = 1;
		this[this.preload_index][3] = "Wizzard";
		alert("Start Wizzard: "+this[this.preload_index][2] + ".html\ngrammarfiles.js:188 - preload()");
		top.main.document.location = this.folder + this[this.preload_index][2] + ".html";
	} else { 
	    this.assArticleGenerator.wizzard.active = 0;
		this[this.preload_index][3] = "Loaded";
		//alert("preload_GrammarFiles():174 - Load: "+this[this.preload_index][2] + ".html");
		top.main.document.location = this.folder + this[this.preload_index][2] + ".html";
	};
}

//#################################################################
//# Method: set_loaded_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: set grammar file as loaded 
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################

function set_loaded_GrammarFiles(pFilename) {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//alert("grammarfiles.js:169 set_loaded_GrammarFiles()\n Name: "+this.name);
	// this.preload_index = 100;
	for (var i=1; i<=this.rows; i++) {
		if (this[i][2] == pFilename) {
			this[i][3] = "Loaded";
		};
	};
}
//#################################################################
//# Method: set_unloaded_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: set grammar file as loaded 
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################


function set_unloaded_GrammarFiles(pFilename) {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//alert("grammarfiles.js:191 set_unloaded_GrammarFiles()\n Name: "+this.name);
	// this.preload_index = 100;
	for (var i=1; i<=this.rows; i++) {
		if (this[i][2] == pFilename) {
			this[i][3] = "";
		};
	};
}
//#################################################################
//# Method: m_unloadGrammar_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: set grammar file as loaded 
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################


function m_unloadGrammar_GrammarFiles() {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//alert("grammarfiles.js:191 set_unloaded_GrammarFiles()\n Name: "+this.name);
	// this.preload_index = 100;
	this.preload_index = 0;	
	for (var i=1; i<=this.rows; i++) {
		this[i][3] = "";
	};
}


//#################################################################
//# Method: check_preload_GrammarFiles 
//#    used in Class: GrammarFiles
//#                
//# Comment: increase preload_index and preload a single Grammar File
//#          that has the Preload-Tag "L" set in config.html
//#
//# created               4.2.2013             
//# last modifications    4.2.2013             
//#################################################################
			
function check_preload_GrammarFiles() {
	//---Method Class:  "Grammarfiles" defined in grammarfiles.js---
	//alert("grammarfiles.js:169 m_show_grammar_links()\n Name: "+this.name);
	// this.preload_index = 100;
	if (this.preload_index > this.rows) {
		top.main.document.location='./frames/empty.html';
		//alert("All grammars defined in config.html were preloaded!\ngrammarfiles.js:194 - check_preload_GrammarFiles()");
	} else {
		this.preload();
	};
}

