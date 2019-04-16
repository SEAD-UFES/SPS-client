import React, { Component } from "react";
import { Link } from "react-router-dom";

import CallView from "./CallView";
import DrawFilter from "components/profile/DrawFilter";

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
        <li className="nav-item" key="call-add">
          <DrawFilter permission="chamada criar" course_id={this.props.course_id}>
            <Link className="nav-link text-success" to={`/processes/${this.props.process_id}/calls/create`}>
              <i className="fas fa-plus-circle" />
            </Link>
          </DrawFilter>
        </li>
      </ul>
    );

    const tabContents = (
      <div className="tab-content" id="callTabsContent">
        {this.props.calls.map(call => {
          return (
            <div
              key={call.id}
              className={"tab-pane fade " + (activeId === call.id ? "show active" : "")}
              id={`call-${call.id}-content`}
              role="tabpanel"
              aria-labelledby={`call-${call.id}-tab`}
            >
              <CallView
                course_id={this.props.course_id}
                call={call}
                publications={this.props.publications.filter(value => {
                  return value.call_id === call.id;
                })}
              />
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

    return <div>{this.props.calls.length > 0 ? CallTabList : ""}</div>;
  }
}

export default CallTabList;
