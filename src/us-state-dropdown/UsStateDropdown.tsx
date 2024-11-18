import React, { useEffect, useState } from "react";


export interface UsState {
    name: string;
    abbreviation: string;
}

export interface UsStateDropdownProps {
    value : string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function UsStateDropdown(props: UsStateDropdownProps): JSX.Element {

    const [usStates, setUsStates] = useState<UsState[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/states')
            .then(response => response.json())
            .then(data => {
                setUsStates(data);
            });
    }, []);



    return (
        <select className="form-control" placeholder="State" name = "state"
        value={props.value} onChange={props.onChange}>    
        {usStates.map(state => <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>)}
        </select>
    );
}