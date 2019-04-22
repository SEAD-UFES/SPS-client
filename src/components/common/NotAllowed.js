import React from "react";

export default function NotAllowed() {
  return (
    <div className="NotAllowed">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4">Não Autorizado</h1>
            <p>Você não tem permissão para acessar este elemento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
