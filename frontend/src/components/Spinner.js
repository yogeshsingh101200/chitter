import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

export default function Spinner() {
    const override = css`
    display: block;
    margin: 1.25rem auto;
    `;

    return (
        <HashLoader
            css={override}
            color={"#375a7f"}
        />
    );
}
