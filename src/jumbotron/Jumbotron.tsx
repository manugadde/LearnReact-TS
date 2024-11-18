import React from "react";

interface JumbotronProps {
    title: string;
    description: string;
}

export function Jumbotron(props: JumbotronProps): JSX.Element {

    return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">{props.title}</h1>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
