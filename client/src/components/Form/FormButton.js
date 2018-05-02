import React from "react";
import { Button } from "reactstrap";

export const FormButton = props => (
  <div d-none>
    <Button {...props} className="btn btn-success">
      {props.children}
    </Button>
  </div>
);
