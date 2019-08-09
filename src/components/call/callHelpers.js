import React from "react";
import moment from "moment";

export function getCallStatus(call) {
  let statusMessage = "";

  if (moment(call.endingDate, "YYYY-MM-DDTHH:mm:ss.ssssZ") > moment()) {
    statusMessage = <span className="text-success">Chamada em andamento</span>;
  } else {
    statusMessage = <span className="text-secondary">Chamada encerrada</span>;
  }

  return statusMessage;
}
