//#################################################
//# Matrix Library			                      #
//# University of Koblenz-Landau                  #
//# GNU Public Licence                            #
//# email: niehaus@uni-landau.de	              #
//# created               02.06.1999,             #
//# last modifications    17.02.2012,             #
//# Author:  Engelbert Niehaus                    #
//#################################################

//alert("loading JS-Libary: matrix.js");

// ##########################################################################################
// Class: Matrix
// ====== is a Matrix of objects, which can store different type of objects.
//        a dynamic storage structure similar to an Array.
//  creation:  				vVariable = new Matrix();
//  access to a element:	vVariable[5][2] = 'Text';
//  						row=5 col=2
//  add an element:			vVariable.add('new Text');
//  length of storing structure:vVariable.length;
// ##########################################################################################

// ##########################################################################################
//---- Constructor Matrix() - OBJECT -

function Matrix() {
	//---Attributes-------------------------
	this.name   = 'Matrix';
	this.rows   = 0;
	this.cols   = 0;
	this.formPath 	= "";
	this.objectPath = "";
	this.Call_onchange_update = "onchange_update";
	//---Methods---------
	this.init_form		 = init_form_Matrix; //objectPath formPath
    this.init			 = init_Matrix; //init matrix with Values e.g. 0.0
    this.create		 	 = create_Matrix;
	this.append_row		 = append_row_Matrix;
	this.append_col		 = append_col_Matrix;
    this.html_matrix	 = html_Matrix;
    this.show			 = show_Matrix;
    this.show_row		 = show_row_Matrix;
    this.edit			 = edit_Matrix;
    this.edit_row		 = edit_row_Matrix;
    this.edit_row_size	 = edit_row_size_Matrix;
    this.quick_sort		 = quick_sort_Matrix;
    this.qsort			 = qsort_Matrix;
    this.qs_partition	 = qs_partition_Matrix;
    this.qs_value		 = qs_value_col_Matrix;
    this.qs_order		 = qs_order_default_Matrix;
    this.sort			 = sort_Matrix;
    //this.sort			 = optisort_Matrix;
    this.bubblesort		 = bubblesort_Matrix;
    this.optisort		 = optisort_Matrix;
    this.sort_length	 = sort_length_Matrix;
    this.sort_row		 = bubblesort_row_Matrix;
    this.optisort_row	 = optisort_row_Matrix;
    this.row_compare	 = row_compare_smaller_Matrix;
    //this.row_compare	 = row_length_compare_Matrix;
    this.onchange_update = onchange_update_Matrix;
    this.set_formvalue	 = set_formvalue_Matrix;
    this.get_formvalue	 = get_formvalue_Matrix;
    this.update_formvalue = update_formvalue_Matrix;
    this.create_textarea = create_textarea_Matrix;
    this.create_inputtext= create_inputtext_Matrix;
    this.add			 = row_add_Matrix;
    this.swap			 = row_swap_Matrix;
    this.insert			 = row_insert_Matrix;
    this.remove			 = row_remove_Matrix;
    this.removeall		 = row_removeall_Matrix;
    this.scale			 = scale_Matrix;
	//return this
}
//alert("Matrix"+Matrix);
// ##########################################################################################
// ##########################################################################################
// # MATRIX COLUMNS
// ##########################################################################################
// ##########################################################################################


function MatrixColumn() {
	//---Attributes-----------------------
        this.length = 0;
        this.Call_onchange_update = "onchange_update";
		this.formPath 	= "";
		this.objectPath = "";
	//---Methods--------------------------
		this.init_form = init_form_Matrix; 
        this.add       = col_add_Matrix;
        this.insert    = col_insert_Matrix;
        this.remove    = col_remove_Matrix;
        this.removeall = col_removeall_Matrix;
        this.swap	   = col_swap_Matrix;
	//-------------------------------------
}

//-----MATRIX-----------
//#################################################################
//# Method: init_form  
//#    used in Class: Matrix
//#                
//# Comment:                        
//#
//# created               28.8.2014             
//# last modifications    28.8.2014             
//#################################################################

function init_form_Matrix (pFormPath,pObjectPath) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("matrix.js:116 - init_form("+pFormPath+","+pObjectPath+")-Call")
	//----Create Object/Instance of QNode----
	//    var vMyInstance = new Matrix();
	//    vMyInstance.init_form(pFormPath,pObjectPath);
	//-------------------------------------------------------
	this.formPath       = pFormPath;
	this.objectPath     = pObjectPath;
	//for (var i=1; i<=pRows; i++) {
	//   this[i].init_form(this.formPath,this.objectPath);
	//}	
}

//#################################################################
//# Method: init_form  
//#    used in Class: MatrixColumn
//#                
//# Comment: Have a separte Method - Reuse reset formPath objectPath                       
//#
//# created               28.8.2014             
//# last modifications    28.8.2014             
//#################################################################

function init_form_MatrixColumn (pFormPath,pObjectPath) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("matrix.js:129 - MatrixColumn.init_form("+pFormPath+","+pObjectPath+")-Call")
	//----Create Object/Instance of QNode----
	//    var vMyInstance = new Matrix();
	//    vMyInstance.init_form(pFormPath,pObjectPath);
	//-------------------------------------------------------
	this.formPath       = pFormPath;
	this.objectPath     = pObjectPath;
}

//#################################################################
//# Method: create  
//#    used in Class: Matrix
//#                
//# Comment: creates a Matrix with rows and columns                       
//#
//# created               28.8.2014             
//# last modifications    28.8.2014             
//#################################################################
function create_Matrix(pRows,pCols) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("matrix.js:52 create_Matrix()\npRows="+pRows+"  pCols="+pCols);
	this.rows = pRows;
	this.cols = pCols;
	//alert("pRows="+pRows+", pCols"+pCols)
	for (var i=1; i<=pRows; i++) {
		this[i] = new MatrixColumn();
		for (var j=1; j<=pCols; j++) {
			this[i].add("row"+i+"col"+j);
			//this[i].add("");
		};
	};
	//alert("matrix.js:73 - create_Matrix() this.rows="+this.rows);
}

//-----MATRIX-----------
function html_Matrix(pFunction) {
	//---Method Class:  "Matrix" defined in matrix.js---
	this.show_row = pFunction;
	var vContentHTML = "";
	//alert("matrix.js:92 show_grammar_Matrix()\n Name: "+this.name);
	vContentHTML +="<table border=2>";
	//---TABLE ROWS---
	for (var i=1; i<=this.length; i++) {
		vContentHTML += this.show_row(i)
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("matrix.js:92 show_grammar_Matrix()\n Name: "+this.name);
	return vContentHTML; 
}


//-----MATRIX-----------
function append_row_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	this.rows++;
	//alert("pRows="+pRows+", pCols"+pCols)
	this[this.rows] = new MatrixColumn();
	this[this.rows].init_form(this.formPath,this.objectPath);
	for (var j=1; j<=this.cols; j++) {
			this[this.rows].add("row"+this.rows+"col"+j);
			//this[this.rows].add("");
	};
	//alert("matrix.js:73 - append_row_Matrix() this.rows="+this.rows);
}

//-----MATRIX-----------
function append_col_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	this.cols++;
	//alert("pRows="+pRows+", pCols"+pCols)
	for (var i=1; i<=this.rows; i++) {
			this[i].add("row"+i+"col"+this.cols);
			//this[i].add("");
	};
	//alert("matrix.js:73 - append_col_Matrix() this.cols="+this.cols);
}


//------SORT MATRIX--------------------------
function sort_length_Matrix() {
	//alert("matrix.js:127 - sort_matrix()");
	//this.sort_row(this.row_compare,1);
	this.sort_row(row_length_compare_Matrix,1);
}

//#################################################################
//# Method: sort  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function sort_Matrix()
{
	this.quick_sort(qs_order_default_Matrix,qs_value_col_Matrix,1);
}


//------QUICK SORT MATRIX--------------------------
//#################################################################
//# Method: quick_sort  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################

function quick_sort_recursive_Matrix(pOrderFunction,pValueFunction,pCol)
{
	this.qs_order = pOrderFunction;
	this.qs_value = pValueFunction;
	//this.qsort(1, this.rows+1,pCol);
	var vRows = this.rows; // because quick_sort was implemented for Array
	//vPivot = 55; if (vPivot >this.rows) vPivot = 1;
	var vMax =100;
	if (vRows>vMax) vRows = vMax;
	this.qsort(1, vMax,pCol);
	//this.qs_partition(1, vRows,vPivot, pCol);
}
//----End of Method quick_sort Definition

//function sort(a) {
function quick_sort_Matrix(pOrderFunction,pValueFunction,pCol)
{
 //alert("matrix.js:220 - quick_sort_Matrix");
  //var stack = [[0, a.length]];
  var stack = [[1, this.rows+1]];
  while (1) {
    var stackLength = stack.length;
    if (! stackLength) {
      break;
    }
    var l = stack[stackLength - 1][0], 
        r = stack[stackLength - 1][1];
    if (l >= r - 1) {
      stack.pop();
      continue;
    }
    var p = r - 1;
    var y = l;
    //var tmp;
    for (var i = l; i < r - 1; i++) {
    	//if (a[i] < a[p]) {
      	if (this[i][pCol] < this[p][pCol]) {
      		//tmp = a[i];
      		//a[i] = a[y];
      		//a[y] = tmp;
      		this.swap(i,y);
      		y++;
    	}
    }
    //tmp = a[y];
    //a[y] = a[r - 1];
    //a[r - 1] = tmp;
    this.swap(r-1,y);
    stack.pop();
    stack.push([y + 1, r]);
    stack.push([l, y]);
  }
  //return a;
}

//#################################################################
//# Method: qsort  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qsort_Matrix(pBegin, pEnd,pCol)
{
	//alert("qsort_Matrix("+pBegin+","+ pEnd+","+pCol+")\nmatrix.js:269");
	if(pEnd-1>pBegin) {
		var pivot=pBegin+Math.floor(Math.random()*(pEnd-pBegin));

		pivot=this.qs_partition(pBegin, pEnd, pivot,pCol);

		this.qsort(pBegin, pivot,pCol);
		this.qsort(pivot+1, pEnd,pCol);
	}
}
//----End of Method qsort Definition

//#################################################################
//# Method: qs_partition  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qs_partition_Matrix(pBegin, pEnd, pPivot,pCol)
{
	var piv=this.qs_value(pPivot,pCol);
	this.swap(pPivot, pEnd);
	var store=pBegin;
	var ix;
	var vix;
	//for(ix=pBegin; ix<pEnd-1; ++ix) {
	for(ix=pBegin; ix<pEnd-1; ix++) {
		//if(array[ix]<=piv) {
		//	array.swap(store, ix);
		//	++store;
		//}
		vix = this.qs_value(ix,pCol);
		//alert("CHECK(ix="+ix+",store="+store+") vix="+vix+" <= piv="+piv+"\nmatrix.js:260 - qs_partition()-Call");
		if (this.qs_order(vix,piv)) {
		//if (vix > piv) {
			//alert("SWAP(ix="+ix+",store="+store+") vix="+vix+" <= piv="+piv+"\nmatrix.js:262 - qs_partition()-Call");
			this.swap(store,ix);
			++store;
		} 
	}
	//alert("PIVOT(ix="+ix+") vix="+vix+"\nqs_partition("+pBegin+","+pEnd+",pPivot,pCol)\nmatrix.js:262 - qs_partition()-Call");			
	if (store < pEnd) {
		this.swap(pEnd, store);
	};
	return store;
}
//----End of Method qs_partition Definition

//#################################################################
//# Method: qs_order_default  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qs_order_default_Matrix (pi1,pi2) {
	return (pi1 <= pi2)
}
//----End of Method qs_order_default Definition

//#################################################################
//# Method: qs_order_reverse  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qs_order_reverse_Matrix (pi1,pi2) {
	return (pi1 > pi2)
}
//----End of Method qs_order_reverse Definition

//#################################################################
//# Method: qs_value_col  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qs_value_col_Matrix (pi,pCol) {
	return this[pi][pCol];
}
//----End of Method qs_value_col Definition
//#################################################################
//# Method: qs_value_length  
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function qs_value_length_Matrix (pi,pCol) {
	return this[pi][pCol].length;
}
//----End of Method qs_value_col Definition


//#################################################################
//# Method: bubblesort  
//#    used in Class: Matrix
//#                
//# Comment:                
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function bubblesort_Matrix() {
	//alert("matrix.js:341 - bubblesort_Matrix()");
	this.sort_row(this.row_compare,1);
	//this.sort_row(row_length_compare_Matrix,1);
}
//----End of Method bubblesort Definition

//#################################################################
//# Method: bubblesort_row  
//#    used in Class: Matrix
//#                
//# Comment:                
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function bubblesort_row_Matrix(pFunction,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pRows="+pRows+", pCols"+pCols)
	//Bubblesort for rows
	this.row_compare = pFunction;
	var vSortNodeMax = this[1];
	for (var i=1; i<this.rows; i++) {
		for (var j=i+1; j<=this.rows; j++) {
			if (this.row_compare(i,j,pCol)) {
				//alert("("+this.row_compare(i,j,pCol)+") Swap "+i+" and "+j);
				this.swap(i,j)
			} else {
				//alert("("+this.row_compare(i,j,pCol)+") No Swap "+i+" and "+j+"\n"+this[i][pCol]+"\n>\n"+this[j][pCol]);
			}
		}
	};
}
//----End of Method bubblesort_row Definition

//#################################################################
//# Method: optisort  
//#    used in Class: Matrix
//#                
//# Comment:               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function optisort_Matrix() {
	//alert("matrix.js:341 - bubblesort_Matrix()");
	this.optisort_row(1);
}
//----End of Method optisort Definition

//#################################################################
//# Method: optisort_row  
//#    used in Class: Matrix
//#                
//# Comment:               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
//function optisort_row_Matrix(pFunction,pCol) {
function optisort_row_Matrix(pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pRows="+pRows+", pCols"+pCols)
	//optisort for rows
	//this.row_compare = pFunction;
	var vSortNodeMax = this[1];
	var vLeft = 1;
	var vRight = 1;
	for (var i=2; i<this.rows; i++) {
		vLeft=1;	
		vRight=i;	
		while (vLeft < vRight) {
			//vCount++;
			//alert("Left("+vLeft+")="+this[i][pCol]+"\nRight("+vRight+")="+this[vRight][pCol] +"\nrules.js:395");
			pivot = Math.floor((vLeft+vRight)/2);
			if (this[pivot][pCol] > this[i][pCol]) {
				vRight = pivot-1;
			} else if (this[pivot][pCol] < this[i][pCol]) {
				vLeft = pivot+1;
			//} else if (this[pivot][pCol] == this[i][pCol]) {
			} else  {
				vLeft = pivot;
				vLeft=vRight;
			}
		}
		//A1,A2,A3,A4,A5,A6,A7,A8,A4 >> i=9 vLeft=4
		for (var j=i; j>vLeft; j--) {
			this.swap(j-1,j);
		}
	};
}
//----End of Method optisort_row Definition

//------COMPARE MATRIX--------------------------
//#################################################################
//# Method: row_length_compare 
//#    used in Class: Matrix
//#                
//# Comment: This method is part of the Quick Sort Implementation               
//#           
//# created               18.12.2013             
//# last modifications    28.12.2013             
//#################################################################
function row_length_compare_Matrix(pi1,pi2,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("row_length_compare_Matrix():154\npi1="+pi1+", pi2="+pi2+", pCol="+pCol);
	var vReturnValue = 0;
	//if (this[pi1][pCol].length > this[pi2][pCol].length) {
	if (this.value_compare(pi1,pCol) < this.value_compare(pi2,pCol)) {
		vReturnValue = 1;
	};
	//alert("row_length_compare_Matrix():154\n"+this[pi1][pCol]+" "+this[pi1][pCol].length+" > "+this[pi2][pCol].length+" "+this[pi2][pCol]);
	return vReturnValue;
}


function row_length_compare_Matrix(pi1,pi2,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("row_length_compare_Matrix():154\npi1="+pi1+", pi2="+pi2+", pCol="+pCol);
	var vReturnValue = 0;
	//if (this[pi1][pCol].length > this[pi2][pCol].length) {
	if (this[pi1][pCol].length < this[pi2][pCol].length) {
		vReturnValue = 1;
	};
	//alert("row_length_compare_Matrix():154\n"+this[pi1][pCol]+" "+this[pi1][pCol].length+" > "+this[pi2][pCol].length+" "+this[pi2][pCol]);
	return vReturnValue;
}

//------COMPARE MATRIX--------------------------
function row_compare_smaller_Matrix(pi1,pi2,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pi1="+pi1+"("+this[pi1][pCol]+")\n pi2="+pi2+"("+this[pi2][pCol]+")");
	var vReturnValue = 0;
	if (pi1>this.rows) {
		alert("Index Error: pi1="+pi1+">this.rows="+this.rows)
	} else if (this[pi1][pCol] > this[pi2][pCol]) {
		vReturnValue = 1;
	};
	//alert(this[pi1][pCol] +"\n compare >\n"+ this[pi2][pCol]+"\n="+vReturnValue);
	return vReturnValue;
	// return (this[pi1][pCol] < this[pi2][pCol]);
}

//------COMPARE MATRIX--------------------------
function row_compare_greater_Matrix(pi1,pi2,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("pi1="+pi1+", pi2"+pi2);
	return (this[pi1][pCol] > this[pi2][pCol]);
}


//------SHOW MATRIX--------------------------
function show_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("matrix.js:92 show_Matrix()\n Name: "+this.name);
	vContentHTML +="<table border=2>";
	//---TABLE ROWS---
	for (var i=1; i<=this.rows; i++) {
		vContentHTML += this.show_row(i)
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("matrix.js:62 - create_Matrix() this.rows="+this.rows);
	return vContentHTML; 
}

//------SHOW MATRIX--------------------------
function show_row_Matrix(pRow) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	//---TABLE ROW---
	vContentHTML +="<tr>";
	for (var j=1; j<=this.cols; j++) {
		//vContentHTML +="<td><nobr>" + this[pRow][j] + "</nobr></td>";
		vContentHTML +="<td>" + this[pRow][j] + "</td>";
	};
	vContentHTML +="</tr>";
	//alert("matrix.js:126 show_row_Matrix()\n Name: "+this.name);
	return vContentHTML; 
}


//------SHOW MATRIX--------------------------
function show_header_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vContentHTML = "";
	//alert("matrix.js:206 show_header_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	vContentHTML +="<table border=2>";
	vContentHTML +="<tr>";
	vContentHTML +="<th>" + this.name + "</th>";
	for (var j=1; j<=this.cols; j++) {
		vContentHTML +="<th>C" + j + "</th>";
	};
	vContentHTML +="</tr>";
	//---TABLE ROWS---
	for (var i=1; i<=this.rows; i++) {
		vContentHTML +="<tr>";
		vContentHTML +="<th>R" + i + "</th>";
		for (var j=1; j<=this.cols; j++) {
			vContentHTML +="<td><nobr>" + this[i][j] + "</nobr></td>";
		};
		vContentHTML +="</tr>";
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//alert("matrix.js:62 - create_Matrix() this.rows="+this.rows);
	return vContentHTML; 
}

//------EDIT MATRIX--------------------------
function edit_row_Matrix (i) {
	return this.edit_row_size(i,"3","50");
}

//------EDIT MATRIX--------------------------
function edit_row_size_Matrix (i,pRowSize,pColSize) {
	var vContentHTML = "";
	for (var j=1; j<=this.cols; j++) {
		vContentHTML +="<td><nobr>" + 
			"<textarea name=\"R"+i+"C"+j +"\" rows=\""+pRowSize+"\" cols=\""+pColSize+"\" onchange=\""+this.objectPath+"."+this.Call_onchange_update+"("+i+","+j+")\">"
         		+ this[i][j] +
         	"</textarea>"
        + 	"</nobr></td>";
	};
	
	return vContentHTML;
}

//------EDIT MATRIX--------------------------
function edit_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	// pMatrixObjectString = "top.vArticleGenerator.rules"
	//alert("matrix.js:201 - edit_Matrix()\nCalled");
	var vContentHTML = "";
	//alert("matrix.js:122 edit_Matrix()\n Name: "+this.name);
	//---TABLE HEADER---
	// vContentHTML += B_FONT_ARIAL + "<b>" + this.name + "</b>" + B_FONT_ARIAL;
	vContentHTML +="<table border=2>";
	vContentHTML +="<tr>";
	//---TABLE ROWS---
	for (var i=1; i<=this.rows; i++) {
		vContentHTML +="<tr>";
		// vContentHTML +="<th>R" + i + "</th>";
		vContentHTML += this.edit_row(i);
		vContentHTML +="</tr>";
	};
	//---TABLE TAIL---
	vContentHTML +="</table>";
	//'alert("matrix.js:62 - create_Matrix() this.rows="+this.rows);
	return vContentHTML; 
}

//------EDIT MATRIX--------------------------
function create_textarea_Matrix(i,j,pValue,pTagInsert) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// pMatrixObjectString = "top.vArticleGenerator.rules"
	var vContentHTML = "";
	vContentHTML += "<textarea name=\"R"+i+"C"+j +"\" "+pTagInsert+" onchange=\""+this.objectPath+"."+this.Call_onchange_update+"('"+i+"','"+j+"')\">"
         		+ pValue +
         		"</textarea>"
  	//alert("matrix.js -- create_textarea_Matrix():311/n"+vContentHTML);
  	return vContentHTML
}

//------EDIT MATRIX--------------------------
function create_inputtext_Matrix(i,j,pValueText,pTagInsert) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// pMatrixObjectString = "top.vArticleGenerator.rules"
	//alert("matrix.js:352 - create_inputtext_Matrix() - i="+i+" j="+j+" Value="+pValueText);
	var vContentHTML = "";
	vContentHTML += "<input type=\"text\" name=\"R"+i+"C"+j +"\" value=\"";
	vContentHTML += pValueText;
	vContentHTML += "\" " +
  				"onchange=\""+this.objectPath+"."+this.Call_onchange_update+"('"+i+"','"+j+"')\" "+pTagInsert+">";
  	//alert("matrix.js -- create_inputtext_Matrix():242\n"+vContentHTML);
  	return vContentHTML
}

//------FORMVALUE MATRIX--------------------------
function set_formvalue_Matrix(pRow,pCol,pValue) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	var vValue = pValue.replace(/\n/g, '\\n');
	vEvalStr = this.formPath+".R"+pRow+"C"+pCol+".value='"+vValue+"';";
	//alert("articlegenerator.js:366 - set_formvalue_Matrix()\npRow="+pRow+" pCol="+pCol+"pValue="+vValue+"\n"+vEvalStr);
	eval(vEvalStr);
}


//------FORMVALUE MATRIX--------------------------
function get_formvalue_Matrix(pRow,pCol) {
	//---Method Class:  "ArticleGenerator" defined in ArticleGenerator.js---
	var vReturn    = "";
	var vEvalStr = "";
	vEvalStr = "vReturn="+this.formPath+".R"+pRow+"C"+pCol+".value";
	eval(vEvalStr);
	//alert("ArticleGenerator.js:156 - get_formvalue_Matrix()\npRow="+pRow+" pCol="+pCol+" vReturn="+vReturn+"\n"+vEvalStr);
	return vReturn;
}


//------FORMVALUE MATRIX--------------------------
function onchange_update_Matrix(pRow,pCol) {
	//---Method Class:  "Matrix" defined in matrix.js---
	this[pRow][pCol] = this.get_formvalue(parseInt(pRow),parseInt(pCol));
	
};

//------FORMVALUE MATRIX--------------------------
function update_formvalue_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		for (var j=1; j<=this.cols; j++) {
			this[i][j] = this.get_formvalue(i,j);
		};
	};
};

function init_Matrix(pInitValue) {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		for (var j=1; j<=this.cols; j++) {
			this[i][j] = pInitValue;
		};
	};
};


function scale_Matrix(pFactor) {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		for (var j=1; j<=this.cols; j++) {
			this[i][j] *= pFactor;
		};
	};
};


function transpose_Matrix(pMatrix) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix + this
	if (this.rows != pMatrix.cols) {
		alert("WARNING: Multiplication Row mismatch of transposed Matrix !");
	} else if (this.cols != pMatrix.rows) {
		alert("WARNING: Multiplication Column mismatch of transposed Matrix !");
	} else {
		for (var i=1; i<=this.rows; i++) {
			for (var j=1; j<=this.cols; j++) {
				this[i][j] += pMatrix[j][i];
			};
		};
	};
}

function addition_Matrix(pMatrix) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix + this
	if (this.rows != pMatrix.rows) {
		alert("WARNING: Row mismatch of added Matrix !");
	} else if (this.cols != pMatrix.cols) {
		alert("WARNING: Column mismatch of added Matrix !");
	} else {
		for (var i=1; i<=this.rows; i++) {
			for (var j=1; j<=this.cols; j++) {
				this[i][j] += pMatrix[i][j];
			};
		};
	};
}

function multiplication_Matrix(pMatrix1,pMatrix2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix1 x pMatrix2
	if (pMatrix1.cols != pMatrix2.rows) {
		alert("WARNING: Multiplication Row-Column mismatch of Matrix1 and Matrix2 !\n"+
				"pMatrix1.cols="+pMatrix1.cols+" pMatrix2.rows="+pMatrix2.rows);
	} else {
		if ((this.rows != pMatrix1.rows) || (this.cols != pMatrix2.cols)) {
			alert("WARNING: wrong dimension of result matrix\n"+
			      "ROWS="+this.rows+" pMatrix1.rows="+pMatrix1.rows+"\n"+
			      "COLS="+this.cols+" pMatrix2.cols="+pMatrix2.cols+"\n");
		} else {
			//alert('Start Multiplicaton');
			var multSum = 0;
			for (var i=1; i<=this.rows; i++) {
				for (var j=1; j<=this.cols; j++) {
					multSum = 0;
					for (var k=1; k<=pMatrix1.cols; k++) {
						//if (pMatrix1[i][k]*pMatrix2[k][j]>0) {
						if (pMatrix2[k][j]>0) {
							//alert("pMatrix1[i"+i+"][k"+k+"]*pMatrix2[k"+k+"][j"+j+"]="+pMatrix1[i][k]*pMatrix2[k][j]+" pMatrix2[k][j]="+pMatrix2[k][j]);
						};
						multSum += pMatrix1[i][k]*pMatrix2[k][j];
					};
					this[i][j] += multSum;
				};
			};
		};
	};
	//alert("ResultMatrix[2][3]="+this[2][3]);
}


// ##########################################################################################
// insert() - METHOD of Matrix - inserts an object at index pi to a MatrixArray.

function X_m_row_insert(object,pi) {
	//---Method Class:  "Matrix" defined in matrix.js---
        this.add(object);
        this.swap(pi,this.rows)
}

function row_insert_Matrix(object,pi) {
	//---Method Class:  "Matrix" defined in matrix.js---
        this.rows++;
		if (pi > this.rows) {pi=this.rows};
        for (i=this.rows;i>pi;i--)
        {
                this[i]=this[i-1];
        };
        this[pi] = object;
}

// ##########################################################################################
// swap() - METHOD of Matrix - swaps two objects at index pi1 and p12 MatrixArray.

function row_swap_Matrix(pi1,pi2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var evalString = "";
	var lvValue = 0;
	if (pi1!=pi2) {
		for (i=0;i<=this.cols;i++) {
			evalString += "lvValue             = this["+pi1+"]["+i+"];\n";
			evalString += "this["+pi1+"]["+i+"] = this["+pi2+"]["+i+"];\n";
			evalString += "this["+pi2+"]["+i+"] = lvValue;";
		};
		//alert(evalString);
		eval(evalString);
	}
}

function X_m_row_swap(pi1,pi2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var vValue = 0;
	if (pi1!=pi2) {
		vValue = this[pi1];
		this[pi1] = this[pi2];
		this[pi2] = vValue;
	}
}

// ##########################################################################################
// remove() - METHOD of Matrix - deletes an object at index pi in a MatrixArray.

function row_remove_Matrix(pi) {
	//---Method Class:  "Matrix" defined in matrix.js---
    if ((pi<=this.rows) && (pi>0)) {
        for (i=pi; i<this.rows; i++)
        {
                this[i]=this[i+1];
        };
        this.rows--;
    }
}

function row_removeall_Matrix() {
	//---Method Class:  "Matrix" defined in matrix.js---
	//for (var i=1; i<=this.rows; i++) {
	//	if (this[i]) {
	//	   this[i].remove(i);
	//	}
	//};
	this.rows = 0;
}

// ##########################################################################################
function row_add_Matrix(object) {
	//---Method Class:  "Matrix" defined in matrix.js---
        this.rows++;
        this[this.rows] = object
}

// ##########################################################################################
// insert() - METHOD of MatrixColumn - inserts an object at index pi to a MatrixArray.

function col_insert_Matrix(object,pi) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
        this.length++;
		if (pi > this.length) {pi=this.length};
        for (i=this.length;i>pi;i--)
        {
                this[i]=this[i-1];
        };
        this[pi] = object;
}

// ##########################################################################################
// remove() - METHOD of MatrixArray - deletes an object at index pi in a MatrixArray.

function col_remove_Matrix(pi) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
    if ((pi<=this.length) && (pi>0)) {
        for (i=pi; i<this.length; i++)
        {
                this[i]=this[i+1];
        };
        this.length--;
    }
}

function col_removeall_Matrix() {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
	this.length = 0;
}

// ##########################################################################################
function col_add_Matrix(object) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
        this.length++;
        this[this.length] = object
}

function col_swap_Matrix(pi1,pi2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	if (pi1!=pi2) {
		this[this.length+1] = this[pi1];
		this[pi1] = this[pi2];
		this[pi2] = this[this.length+1];
	}
}
