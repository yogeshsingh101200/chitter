import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

export default function Spinner() {
    const override = css`
    display: block;
    margin: 1.25rem auto;
    `;

    return (
        <BounceLoader
            css={override}
            color={"#375a7f"}
        />
    );
}
