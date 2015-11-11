//#################################################
//# OOA with JavaScript                           #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.1999,             #
//# last modifications    17.03.2010,             #
//# Author:  Engelbert Niehaus                    #
//# pubished GNU Public License                   #
//#################################################

//alert("loading JS-Libary: htmlcollector.js");

//=======================================================================================
//=======================================================================================
//=======================================================================================
function TableFormat() {
	//----Attributes----------------------------------------
	this.HEADER		= '<table border=2>';
	this.RowHEADER	= '<tr>';
	this.HeadHEADER	= '<td bgcolor=#c0c0c0><b>';
	this.HeadTAIL	= '</b></td>';
	this.ColHEADER	= '<td>';
	this.ColTAIL	= '</td>';
	this.RowTAIL	= '</tr>';
	this.TAIL     	= '</table>';
	this.fontAttribs=" size=2 face='Arial,Helvetica' ";
}

function MatrixFormat() {
	//---Super Class------------------------
	this.SuperClass = TableFormat;
	this.SuperClass();
	//----Attributes----------------------------------------
	this.maxRows    = 17;
	this.maxCols    = 17;
	//----Methods-------------------------------------------
	this.insertCellTags	= m_insertCellTags;
	this.numberCell 	= m_numberCell;
	this.headerRows 	= m_headerRows;
	this.headerCols 	= m_headerCols;
	this.fontWrapper 	= m_fontWrapper;
}

function VectorFormat() {
	//---Super Class-------
	this.SuperClass = MatrixFormat;
	this.SuperClass();
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerCols;
	this.headerCols = m_headerIndex;
}

function VectorTransposeFormat() {
	//---Super Class-------
	this.SuperClass = MatrixFormat;
	this.SuperClass();
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerIndex;
}

function HelpFormat() {
	//---Super Class-------
	this.SuperClass = MatrixFormat;
	this.SuperClass();
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerHelpRows;
}

function VectorHelpFormat() {
	//---Super Class-------
	this.SuperClass = HelpFormat;
	this.SuperClass();
	//---Attributes--------
	//---Methods-----------
	this.headerCols = m_headerIndex;
}

function m_fontWrapper(pString) {
	return "<font "+this.fontAttribs+">" +  pString + "</font>";
}

function m_insertCellTags(pBegin,pEnd) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	this.ColHEADER	= this.ColHEADER + pBegin;
	this.ColTAIL	= pEnd + this.ColTAIL;
}

function m_numberCell(pNumber) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	var vReturnValue = "";
	if (pNumber>0) {
		vReturnValue = "<font "+this.fontAttribs+" color=green><b>" +  pNumber + "</b></font>";
	} else if (pNumber<0) {
		vReturnValue = "<font "+this.fontAttribs+" color=red><b>" +  pNumber + "</b></font>";
	} else {
		 vReturnValue = "<font "+this.fontAttribs+" color=blue>" +  pNumber + "</font>";
	};
	return "<nobr>"+ vReturnValue + "</nobr>";
}

function m_headerRows(pRow) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	if (pRow<this.maxRows) {
		this.outputTask.setIndex(pRow);
		return this.fontWrapper("<nobr>"+ this.outputTask.getString() +"</nobr>");
	} else {
		return this.fontWrapper("<nobr>Stop</nobr>");
	};
	//return "<nobr>Row "+pRow+"</nobr>";
}

function m_headerCols(pCol) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	if (pCol<this.maxCols) {
		this.outputTask.setIndex(pCol);
		return this.fontWrapper("<nobr>"+ this.outputTask.getString() +"</nobr>");
	} else {
		return this.fontWrapper("<nobr>Start</nobr>");
	};
	//return "<nobr>Col "+pCol+"</nobr>";
}

function m_headerIndex(pIndex) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	return this.fontWrapper("<nobr>["+pIndex+"]</nobr>");
}

function m_headerHelpRows(pCol) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	return this.fontWrapper("<nobr>Hilfe "+ pCol +"</nobr>");
}


//=======================================================================================
//=======================================================================================
//=======================================================================================

function MatrixHTMLCollector() {
	//----Attributes----------------------------------------
	this.outputString 	= '';
	this.rules       	= null;
	this.fontAttribs=" size=2 face='Arial,Helvetica' ";
	//----Methods-------------------------------------------
	this.clearOutput 	= m_clearOutput;
	this.generateOutput	= m_generateOutput; //call: generateOutput(pMatrixFormat)
	this.fontWrapper 	= m_fontWrapper;
	//------------------------------------------------------
	return this;
};
//--------------------------------------------------------------------------------------
function m_clearOutput() {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	this.outputString = '';
}
//--------------------------------------------------------------------------------------
function m_generateOutput() {
	if (this.rules!=null) {
		//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
		this.outputString += this.rules.format.HEADER;
		//--- Name and first Header Row with name of the matrix --------------------
		this.outputString += this.rules.format.RowHEADER;
		this.outputString += this.rules.format.HeadHEADER + this.fontWrapper(this.rules.name)
						   + this.rules.format.HeadTAIL;
		for (var j=1; j<=(this.rules.cols); j++) {
			this.outputString += this.rules.format.HeadHEADER + this.rules.format.headerCols(j) +
							     this.rules.format.HeadTAIL;
		};
		this.outputString += this.rules.format.RowTAIL;
		//---RowHeader and Cells---------------------
		for (var i=1; i<=this.rules.rows; i++) {
			this.outputString += this.rules.format.RowHEADER;
			//---Head =first Col of the row i----
			this.outputString += this.rules.format.HeadHEADER + this.rules.format.headerRows(i) +
							     this.rules.format.HeadTAIL;
			//---Cells in the row i----
			for (var j=1; j<=this.rules.cols; j++) {
				this.outputString += this.rules.format.ColHEADER
								  +  this.rules.format.numberCell(this.rules[i][j])
								  +  this.rules.format.ColTAIL;
			};
			this.outputString += this.rules.format.RowTAIL;
		};
		this.outputString += this.rules.format.TAIL;
	} else {
		alert('htmlcollector.js:182 - ERROR: MatrixHTMLcollector.rules is not defined!');
	}
}
//--------------------------------------------------------------------------------------