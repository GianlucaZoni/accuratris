//import {useState} from 'react';
import './Cell.css';

export function Cell({className, cellValue, onCellClick}: {className: string, cellValue: string, onCellClick: () => void}) {

    /* const [cellValue, setCellValue] = useState(null);

    function handleClick() {
        //setCellValue(cellValue === 'X' ? 'O' : 'X');
        setCellValue('X');
    } */

    return  <div className={`cell ${className}`} onClick={onCellClick}> {cellValue} </div>
}