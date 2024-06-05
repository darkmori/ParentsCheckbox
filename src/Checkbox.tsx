import React from 'react';
import { ReactComponent as CheckBoxChecked } from './icons/CheckBoxChecked.svg';
import { ReactComponent as CheckBoxUnchecked } from './icons/CheckBoxUnchecked.svg';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, id }) => {
    return (
        <div
            className={`checkbox ${checked ? 'checked' : ''}`}
            onClick={() => onChange(!checked)}
        >
            {checked ? <CheckBoxChecked className="checkbox-icon" /> : <CheckBoxUnchecked className="checkbox-icon" />}
            <label htmlFor={id} onClick={() => onChange(!checked)}>{label}</label>
        </div>
    );
};

export default Checkbox;
