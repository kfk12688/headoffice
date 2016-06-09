/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react"
import { Divider, PopupSearchBox, PopupDateBox, SearchBox } from "../../components/index"

const Search: React.StatelessComponent<{}> = (props: {}) => {
  const dividerStyle = {
    bottom  : 0,
    position: "absolute",
    right   : 0,
    top     : 0,
  }

  return (
    <div>
      <div className="ho-search-text-box">
        <SearchBox/>
      </div>
      <Divider fullSpan size={1}/>
      <div>
        <div className="ho-general-filter-header">General Filters</div>
        <div className="ho-general-filter">
          <div className="block">
            <div className="label">Owner</div>
            <PopupSearchBox matchParentWidth/>
          </div>
          <div className="block">
            <div className="label">Created on or after</div>
            <PopupDateBox/>
          </div>
          <div className="block">
            <div className="label">Created on or before</div>
            <PopupDateBox/>
          </div>
        </div>
      </div>
      <Divider vertical style={dividerStyle} size={{h:"auto", w:5}}></Divider>
    </div>
  )
}

export { Search }
