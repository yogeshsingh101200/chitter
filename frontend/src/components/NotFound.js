import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function NotFound() {
    return (
        <Card className="mx-auto mt-5 p-3 text-center shadow-lg not-found">
            <h1 className="display-1">404</h1>
            <h4 className="p-2">Not Found!</h4>
            <Button className="mt-2 mx-auto" as={Link} to="/" style={{ width: "max-content" }}>
                Home
            </Button>
        </Card>
    );
};
