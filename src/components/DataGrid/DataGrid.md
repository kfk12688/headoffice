#DataGrid

##Inputs:
 
The following Datagrid's inputs are,

Props | Type | Description |Req/Optional
----------|--------|---------------|------
style | object | It defines the styles of DataGrid|Optional
className | string | It is used to define styles of the DataGrid |Optional
isLoading | bool | It returns the boolean  |Required
rows | object | which defines the rows | Required
cols | array | It is a required object  which defines the cols |Required
colWidths | object | its a required object that defines the col's width |Required
sortkey | string | It is required |Required
sortAscending | bool | It returns the boolean value|Optional
selectedKeys | array | It defines the row selection |Required

##cols

This input accepts an array of objects. Each object woud define a column in the table. The below table describes how to define this col object

Key | Type | Description | Req/Optional
--------|------|-----------|--------
dataKey | string | Describes the corressponding key name in `data` input. See data Snippet for more details | Required
headerStyle | Object | Accepts a css object for styling the column cell | Optional
name | string | This value will be mapped to corressponding key in `colWidths` input  | Optional
renderType | string (One of defined renderTypes) | Renders the data cell accordingly | Required
sortable | bool | Indicates whether the column is sortable | Optional
text | string | Header Cell text | Required

 ```javascript
var cols = [
 {
  dataKey : "isSelected",
  headerStyle : { borderRight : 0 },
  name : "checkbox-col",
  renderType : "checkbox",
  sortable : false,
  text : "",
},
{
  dataKey : "templateName",
  name : "name-col",
  renderType : "buttonLink",
  text : "Name",
},
{}
];

var data = [
 {
  isSelected : false,
  templateName : "Register 01",
},
 {
  isSelected : false,
  templateName : "Register 02",
},
 {
  isSelected : true,
  templateName : "Register 03",
},
{}
];
```

![](https://github.com/Sharavanth/headoffice/blob/data-grid-docu/src/components/DataGrid/datagrid.PNG)

##rows
it is one of the input of datagrid component

keys | Type | Description | Req/Optional
--------|------|-----------|--------
rows | string | this defines the row objects | Required

```javascript
var rows = {
  CreatedAT : "2016-10-2711:59",
  CreatedBy : { id : null,
                name : "Jasmine.G",
                username : "jasmine",
               },
   id : "5811ec0dh2lo2318",
   isFavorite : false,
   isSelected : false,
   modifiedAt : "2016-10-2811:59",
   templateName : "temp",
}
````


##colWidths
it gets the object as input

keys | Type | Description |Req/Optional
---------|---------|---------|-------
colWidths | object | column width is given to the partcular column object|Required

```javascript
 var colWidths = {
 checkbox-col : 38
 Created-at-col : 120
 favorite-col : 38
 name-col : 250
 updated-at-col : 150
 workbook-col :170
 }
```

##sortkey
it takes string type as input

keys | Type | Description |Req/Optional
---------|---------|---------|-------
sortkeys | string | it sorts the headercolumns's data key|Required


##sortAscending

keys |Type | Description | Req/Optional
-------|------|---------|--------
 sortAscending | bool |it displays either asec or desc values on datakeys|Required

```javascript
sortAscending : false
```
##selectedKeys

keys |Type | Description | Req/Optional
-------|------|---------|--------
 selectedKeys | array | it defines the row isSelected or not | Required
 
 if the row is selected means,
 
 ```javascript
 selectedKeys : array[1]
  id: "5811ec0dh2lo2318"
 ````
![](https://github.com/Sharavanth/headoffice/blob/data-grid-docu/src/components/DataGrid/datagrid2.PNG)
##onclick

It is a type of function..onclick on the datakeys it turns to asec or desc

##onDrag

It is a type of function..this function is used to drag the screen till the Nth column key
