#DataGrid

##Inputs:
 
The following Datagrid's inputs are,

Props | Type | Description 
----------|--------|---------------
style | object | It is an optional and it defines the styles of DataGrid
className | string | It is an optional one and used to define styles of the DataGrid 
isLoading | bool | It is a required object and it returns the boolean  
rows | object | It is a required object which defines the rows  
cols | array | It is a required object  which defines the cols 
colWidths | object | its a required object that defines the col's width 
sortkey | string | It is required 
sortAscending | bool | It is an optional and it returns the boolean value
selectedKeys | array | It is required 

##cols

This input has an array of objects.

keys | Type | Description | Req/Optional
--------|------|-----------|--------
cols | string | Describes the header column in the rendered table | Required

##sortkey
it takes string type as input

keys | Type | Description |Req/Optional
---------|---------|---------|-------
sortkeys | string | it sorts the headercolumns's data key|Required

##sortAscending

Type | Description | Req/Optional
------|---------|--------
bool |it displays either asec or desc values on datakeys|Required

##onclick

It is a type of function..onclick on the datakeys it turns to asec or desc

##onDrag

It is a type of function..this function is used to drag the screen till the Nth column key
