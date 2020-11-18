import React from "react";
import "../NotFound.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <div className="container-fluid">
                <div className="col-md-6 offset-md-3 text-center mt-2 pt-5">
                    <div className="card cd-shadow text-center">
                        <h1 className="display-1 custom-font align-items-center">404</h1>
                        <div className="container">
                            <h3 className="md-0">Not Found!</h3>
                            <Button className="mb-2" as={Link} to="/">
                                Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
