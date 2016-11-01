
#PaginationGrid
      The page to display is selected by he user using the pagination panel that 
      appears at the top right corner of the page. If the grid knows how many pages
      in total at the start, the total page will appear in the pagination panel,
      and the user will be restricted to this range. The number of rows and columns 
      depends upon the user inputs. i.e, based on adding Fields and definitions.

#Input

      The inputs to the PaginationGrid given by the user must be "spec", "data" and 
      "isLoading". By default "className" property can by given to any React 
      component since it defines the design of the page.

##spec

      Spec is given as input to the PGBody and PGHeader which defines the columns.
      The column width is calculated using the inputs data and spec. i.e, It has a 
      function calcColsWidths. So by passing the inputs data and spec the width can
      be calculated and also the data goes to the appropriate column value which is 
      defined by the keys.

##data

      The data is another input given to the PaginationGrid. This input is given to
      PGBody React component's property rows. Using the key values the data is set 
      to respected column values. Suppose if the data is too big the width of the
      column goes on increasing and it is also controlled by the colsWidth function.

##scrollLeft
      
      When there are N number of columns then scroll left must be defined in-order
      to view the contents present on the right of the PGBody. This is defined by
      default.

##isLoading

      This input must be defined by the user. Suppose if there is no data present 
      or it takes time for loading the data,the page must display some output until
      that time. So if it takes time to load the data from the server then Spinner
      value is set or No Data Present is displayed.
      
#Output

![output](PaginationGrid/Review.png)

