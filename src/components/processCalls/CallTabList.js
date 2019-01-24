import React, { Component } from "react";

class CallTabList extends Component {
  activeCallId(calls) {
    if (calls.length > 0) {
      const reducer = (preVal, elem, index, array) => {
        if (elem.endingDate > preVal.endingDate) {
          preVal = elem;
        }
        return preVal;
      };
      const activeCall = calls.reduce(reducer, calls[0]);
      return activeCall.id;
    } else {
      console.log("arrayVazio");
    }
  }

  render() {
    const activeId = this.activeCallId(this.props.calls);

    const tabTitles = (
      <ul className="nav nav-tabs" id="callTabs" role="tablist">
        {this.props.calls.map(call => {
          return (
            <li className="nav-item" key={call.id}>
              <a
                className={"nav-link " + (activeId === call.id ? "active" : "")}
                id={`call-${call.id}-tab`}
                data-toggle="tab"
                href={`#call-${call.id}-content`}
                role="tab"
                aria-controls={`call-${call.id}-content`}
                aria-selected="true"
              >
                Chamada {call.number}
              </a>
            </li>
          );
        })}
      </ul>
    );

    const tabContents = (
      <div className="tab-content" id="callTabsContent">
        {this.props.calls.map(call => {
          return (
            <div
              key={call.id}
              className={
                "tab-pane fade " + (activeId === call.id ? "show active" : "")
              }
              id={`call-${call.id}-content`}
              role="tabpanel"
              aria-labelledby={`call-${call.id}-tab`}
            >
              <p>{call.id}</p>
            </div>
          );
        })}
      </div>
    );

    const CallTabList = (
      <div>
        {tabTitles}
        {tabContents}
      </div>
    );

    return <div>{this.props.calls.length > 0 ? CallTabList : "no calls"}</div>;
  }
}

export default CallTabList;
