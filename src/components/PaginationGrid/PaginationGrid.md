#PaginationGrid
The page to display is selected by he user using the pagination panel that appears at the top right corner of the page. If the grid knows how many pages in total at the start, the total page will appear in the pagination panel, and the user will be restricted to this range. The number of rows and columns depends upon the user inputs. i.e, based on adding Fields and definitions.

![](https://github.com/Sharavanth/headoffice/blob/pagination-grid-docu/src/components/PaginationGrid/Review.png)

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
className | string | This is a **required** object that defines the style or design of the paginationGrid
style | object | This is a **required** object that defines the color and other styles of the paginationGrid

The rest are optional

#spec
The **spec** input is an Array of Objects and must be defined like below


Keys | Description | Requred/Optional
------------ | -------------|-------------
displayText | Describes the header column name in the rendered table | Yes


```javascript
var spec = [
  {
    displayText : "XYZ",
  },
  ...
]
```

##data
The **data** input is also an Array of Objects and must be defined like below


Keys | Description | Requred/Optional
------------ | -------------|-------------
displayText | Describes the row name onto which column to be mapped in the rendered table | Yes


```javascript
var data = [
  {
    displayText : "abc",
    id : "",
  },
  ...
]
```
Id is created by default.

**scrollLeft** : When there are N number of columns then scroll left must be defined in-order to view the contents present on the right of the PGBody. This is defined by default.

