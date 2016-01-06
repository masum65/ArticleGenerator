	    //alert("displayobejct.html Start setting SourceText");
		//document.fInputForm.GenText.value = top.vSourceText;
		//document.write("TEST");
		// document.write(top.vArticleGenerator.rules.edit());
		
		var vParseNode = new top.ParseNode();
		
		function messageDone(pType) {
		    alert("Parsing "+ pType +" done!\n"+
					"(1) Go down on this page and edit Grammar!\n"+
					"(2) Import "+ pType +" into Grammar\n" +
					"(3) Apply Grammar on the Parsed Text above");
		}
		
		function readParsingText() {
			return document.fInputForm.GenText.value;
		}

		function readSectionID() {
			return document.fInputForm.Title.value;
		}
		
		function parseWords() {
			//----------------------------------------------------------
			//alert("Parse Words Functions started!");
			var vString = readParsingText();
			//---------------------------------------------------
			//-----------Split vString into single Words --------
			var vParseArray = vParseNode.split2words(vString);
			//alert("parsing:32 - parseWords()\nLength of parsed Array="+vParseArray.length);
			//---------------------------------------------------
			//--- Generate a Grammar from the vParseArray -------
			var vMinWordLength = document.fInputForm.MinWordLength.value;
			var vMaxWordLength = document.fInputForm.MaxWordLength.value;
			// alert("parsing:33 - parseWords()\nvMinWordLength="+vMinWordLength);
			vParseNode.minwordlength = parseInt(vMinWordLength);
			vParseNode.maxwordlength = parseInt(vMaxWordLength);
			var vGrammarText = vParseNode.wordarray2grammar(vParseArray);
			//alert("parsing:36 - parseWords()\nvGrammarText="+vGrammarText);
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText;
			//----------------------------------------------------------
			//top.main.location.href = "importgrammar.html";
			//----------------------------------------------------------
			messageDone("Words");
		};
		
		function parseUndefinedNonterms() {
			//----------------------------------------------------------
			//alert("Parse Words Functions started!");
			var vString = readParsingText();
			//---------------------------------------------------
			//-----------Split vString into single Words --------
			var vParseArray = vParseNode.split2words(vString);
			//alert("parsing:32 - parseWords()\nLength of parsed Array="+vParseArray.length);
			//---------------------------------------------------
			//--- Generate a Grammar from the vParseArray -------
			var vMinWordLength = document.fInputForm.MinWordLength.value;
			var vMaxWordLength = document.fInputForm.MaxWordLength.value;
			// alert("parsing:33 - parseWords()\nvMinWordLength="+vMinWordLength);
			vParseNode.minwordlength = parseInt(vMinWordLength);
			vParseNode.maxwordlength = parseInt(vMaxWordLength);
			var vGrammarText = vParseNode.wordarray2undef_nonterm(vParseArray,top.vArticleGenerator.rules);
			//alert("parsing:36 - parseWords()\nvGrammarText="+vGrammarText);
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText;
			//----------------------------------------------------------
			//top.main.location.href = "importgrammar.html";
			//----------------------------------------------------------
			messageDone("Undefined Non-Terminal Symbols");
		};
		
		function parseSentences() {
			//----------------------------------------------------------
			//alert("Parse Sentences Functions started!");
			var vString 	= readParsingText();
			var vSectionID  = readSectionID();
			//alert("vSectionID="+vSectionID);
			//----------------------------------------------------------
			var vParseNode = new top.ParseNode();
			//---------------------------------------------------
			document.fInputForm.GenText.value = vParseNode.sentence_corrections(vString);
			//-----------Split vString into single Words --------
			var vParseArray = vParseNode.split2sentence(vString);
			//alert("parsing:32 - parseWords()\nLength of parsed Array="+vParseArray.length);
			//---------------------------------------------------
			//--- Generate a Grammar from the vParseArray -------
			//alert("NONTERMS="+vParseNode.sentence_nonterm(0)+" "+vParseNode.sentence_nonterm(1)+ " "+vParseNode.sentence_nonterm(100))
			var vGrammarText = vParseNode.sentencearray2grammar(vParseArray,vSectionID);
			//alert("parsing:36 - parseSentences()\nvGrammarText="+vGrammarText);
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText; 
			//------Original Text refine--------------------------------
			//document.fInputForm.GenText.value = vParseNode.sentencearray2nonterm(vParseArray,vSectionID);
			//----------------------------------------------------------
			//top.main.location.href = "importgrammar.html";
			//----------------------------------------------------------
			messageDone("Sentences");
		}
		
		function parseSectionHeader() {
			//----------------------------------------------------------
			//alert("Parse Section marked with \\section{Title...}. Parsing started!");
			var vString 	= readParsingText();
			var vSectionID  = readSectionID();
			//alert("vSectionID="+vSectionID);
			//----------------------------------------------------------
			var vParseNode = new top.ParseNode();
			//-----------Split vString into single Words --------
			//alert("parsing.js:99 - parseSections()\nLength of parsed Array="+vParseArray.length);
			//---------------------------------------------------
			var vGrammarText = vParseNode.sectionheader2grammar(vString);
			//----------------------------------------------------------
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText;
			//document.fInputForm.GenText.value = vParseNode.sectionheader2nonterms(vString);
			//----------------------------------------------------------
			messageDone("Section");
		}
		
		function parseSections() {
			//----------------------------------------------------------
			//alert("Parse Section marked with \\section{Title...}. Parsing started!");
			var vString 	= readParsingText();
			var vSectionID  = readSectionID();
			//alert("vSectionID="+vSectionID);
			//----------------------------------------------------------
			var vParseNode = new top.ParseNode();
			//-----------Split vString into single Words --------
			//alert("parsing.js:99 - parseSections()\nLength of parsed Array="+vParseArray.length);
			//---------------------------------------------------
			var vGrammarText = vParseNode.sections2grammar(vString);
			//----------------------------------------------------------
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText;
			document.fInputForm.GenText.value = vParseNode.sections2nonterms(vString);
			//----------------------------------------------------------
			messageDone("Section");
		}
		
		function parseStartNode() {
			//----------------------------------------------------------
			//alert("Parse Section Functions started!");
			var vString 	= readParsingText();
			var vSectionID  = readSectionID();
			//alert("vSectionID="+vSectionID);
			//----------------------------------------------------------
			var vParseNode = new top.ParseNode();
			//---------------------------------------------------
			var vGrammarText = "STARTNODE_"+vSectionID+" {\n ";
			vGrammarText += vString.replace(/\n/g,"\n ")
			vGrammarText += "\n}\n";
			//----------------------------------------------------------
			//---------------------------------------------------
			//---- Save the created Grammar into  top.vArticleGenerator.textGrammar
			top.vArticleGenerator.textGrammar = vGrammarText;
			//---- Save the created Grammar in Textarea for further editing
			document.fInputForm.GrammarText.value = vGrammarText;
			//----------------------------------------------------------
			messageDone("Section");
		}

		function importGrammar()
		{
			var vInput  = document.fInputForm.GrammarText.value;
			var vTitle  = document.fInputForm.Title.value.toUpperCase();
			document.fInputForm.Title.value = vTitle;
			//alert("parsing.js:18 - removeComments()\nvTitle="+vTitle);
			var vOutput = top.vArticleGenerator.import_grammar(vInput,vTitle);
			top.vArticleGenerator.rules.sort_length();
			//----------------------------------------------------------
			alert("Grammar Imported Successfully!\n\nparsing.js:56 - importGrammar()-Call");
		}	
		
		function applyGrammar() {
			//alert("Apply Grammar Functions started!");
			var vString = document.fInputForm.GenText.value;
			//--- Generate a Grammar from the vParseArray -------
			var vMinWordLength = document.fInputForm.MinWordLength.value;
			var vMaxWordLength = document.fInputForm.MaxWordLength.value;
			// alert("parsing:33 - parseWords()\nvMinWordLength="+vMinWordLength);
			var vMin = parseInt(vMinWordLength);
			var vMax = parseInt(vMaxWordLength);
			
			//----------------------------------------------------------
			//---- Replace Text with Non-Term Symbols of Grammar--------
			//alert("parsing:33 - parseWords() BEFORE\n"+vString);
			vString = top.vArticleGenerator.parse(vString,vMin,vMax);
			//----------------------------------------------------------
			//---- Save the parsed Text in Textarea --------------------
			//alert("parsing:35 - parseWords() AFTER\n"+vString);
			document.fInputForm.GenText.value = vString;
			storeParsedText();
			//----------------------------------------------------------
			alert("Grammar Applied Successfully!\n\nparsing.js:209 - applyGrammar()-Call");
		}	
		
		function storeParsedText() {
		     top.vArticleGenerator.textDestination = document.fInputForm.GenText.value;
		}	
		
		function copyGrammar2Clipboard() {
			top.vArticleGenerator.textClipboard = document.fInputForm.GrammarText.value;
			alert("Grammar Copy to Clipboard was successfully!\n\nparsing.js:218 - copyGrammar2Clipboard()")
		}	
		
		function copyClipboard2Parser() {
			document.fInputForm.GenText.value = top.vArticleGenerator.textClipboard;
			alert("Grammar Clipboard Copy to Parser was successfully!\n\nparsing.js:223 - copyClipboard2Parser()")
		}
		
		function copyGrammar2Parser() {
			document.fInputForm.GenText.value = document.fInputForm.GrammarText.value;
			alert("Copy Grammar to Parser was successfully!\n\nparsing.js:228 - copyGrammar2Clipboard()")
		}	

		function copyParser2Grammar() {
			document.fInputForm.GrammarText.value = document.fInputForm.GenText.value;
			alert("Copy Parser to Grammar was successfully!\n\nparsing.js:233 - copyGrammar2Clipboard()")
		}	
          				
	// End Hiding -->
