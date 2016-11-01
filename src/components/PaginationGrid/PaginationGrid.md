#PaginationGrid
The page to display is selected by he user using the pagination panel.

![](https://github.com/Sharavanth/headoffice/blob/pagination-grid-docu/src/components/PaginationGrid/Review.png)

**scrolling** : This is defined by default.

#Usage

The inputs to the PaginationGrid given by the user must be "spec", "data" and 
"isLoading". By default "className" property can by given to any React 
component since it defines the design of the page.
      
The following inputs are required
      
Props | Type | Description
------------ |------------ | -------------
spec |array| This is a **required** object that defines the columns. The detailed Spec Object is given below
data |object| Plain JS Object containing with keys that must be defined in the spec `dataKey` to show
isLoading | bool | This is a **required** object that defines whether the data is present or not
className | string | This is an **optional** object that defines the style or design of the paginationGrid
style | object | This is an **optional** object that defines the color and other styles of the paginationGrid

The rest are optional

#spec
The **spec** input is an Array of Objects and must be defined like below


Keys | Type | Description | Requred/Optional
------------ | -------------|------------- | -------------
displayText | string | Describes the header column name in the rendered table | Yes
fieldName | string | Describes the key for column name | Yes
fieldType | string | Describes the type of column name | Yes


```javascript
var spec = [
  {
    displayText : "XYZ",
    fieldName : "displayText",
    fieldType: "Text",
  },
  ...
]
```

##data

```javascript
var data = {
  {
    0:{displayText : "abc",
    id : "",}
  },
  ...
}
```
Id is created by default.
