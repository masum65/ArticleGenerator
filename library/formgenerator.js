//#################################################################
//# Javascript Class: FormGenerator()
//#       SuperClass: 
//#   Class Filename: formgenerator.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               22.2.2013             
//# last modifications    22.2.2013             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="formgenerator.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class FormGenerator() 
// Call the constructor for creating an instance of class FormGenerator
// by the following command in HTML-file that imports this class
// var vMyInstance = new FormGenerator();
//---------------------------------------------------------------------

function FormGenerator () {
	// no superclass defined

	//---Attributes-------------------------
	this.name = "FormName";
	this.url = "http://link.com";
	this.action="get";
	this.elements_of_form = new Array();;

	//---Methods----------------------------
	this.get_HTML	 = get_HTML_FormGenerator;
	this.get_all_elements	 = get_all_elements_FormGenerator;
	this.get_element	 = get_element_FormGenerator;
	this.create_select	 = create_select_FormGenerator;
	this.create_radio	 = create_radio_FormGenerator;
	this.create_checkbox	 = create_checkbox_FormGenerator;
	this.create_button	 = create_button_FormGenerator;
	this.create_textarea	 = create_textarea_FormGenerator;
	this.create_text	 = create_text_FormGenerator;

	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of FormGenerator, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'FormGenerator'
// the function name is extended with '_FormGenerator'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       FormGenerator.my_method()
// The method definitions are as follows
//   function my_method_FormGenerator(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "FormGenerator()" defined as JS functions 
//---------------------------------------------------------------------
			
//#################################################################
//# Method: get_HTML  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function get_HTML_FormGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:get_HTML()()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.get_HTML();
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method get_HTML Definition

			
//#################################################################
//# Method: get_all_elements  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function get_all_elements_FormGenerator() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:get_all_elements()()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.get_all_elements();
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method get_all_elements Definition

			
//#################################################################
//# Method: get_element  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function get_element_FormGenerator(pIndex) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:get_element(pIndex)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.get_element(pIndex);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method get_element Definition

			
//#################################################################
//# Method: create_select  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_select_FormGenerator(pSelectArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_select(pSelectArray)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_select(pSelectArray);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_select Definition

			
//#################################################################
//# Method: create_radio  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_radio_FormGenerator(pSelectArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_radio(pSelectArray)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_radio(pSelectArray);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_radio Definition

			
//#################################################################
//# Method: create_checkbox  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_checkbox_FormGenerator(pSelectArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_checkbox(pSelectArray)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_checkbox(pSelectArray);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_checkbox Definition

			
//#################################################################
//# Method: create_button  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_button_FormGenerator(pName,pTitle,pOnClickFunction) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_button(pName,pTitle,pOnClickFunction)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_button(pName,pTitle,pOnClickFunction);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_button Definition

			
//#################################################################
//# Method: create_textarea  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_textarea_FormGenerator(pName,pWidth,pHeight,pValue) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_textarea(pName,pWidth,pHeight,pValue)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_textarea(pName,pWidth,pHeight,pValue);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_textarea Definition

			
//#################################################################
//# Method: create_text  
//#    used in Class: FormGenerator
//#                
//# Comment:                        
//#
//# created               22.2.2013             
//# last modifications    22.2.2013             
//#################################################################

function create_text_FormGenerator(pName,pSize,pValue) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("formgenerator.js:create_text(pName,pSize,pValue)()-Call")
	//----Create Object/Instance of FormGenerator----
	//    var vMyInstance = new FormGenerator();
	//    vMyInstance.create_text(pName,pSize,pValue);
	//-------------------------------------------------------
	
	//>>>> INSERT YOUR CODE HERE <<<<<

    	

}
//----End of Method create_text Definition

			