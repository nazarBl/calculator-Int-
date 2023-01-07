import React from 'react';
import style from './Button.module.scss';
import arrowDelete from '../../assets/arrow_delete.svg';
import multiply from '../../assets/multiply.svg';

const Button = ({
	icon,
	value,
	operation,
	setOperation,
	setFirstOperand,
	setSecondOperand,
	firstOperand,
	secondOperand,
	result,
	setResult,
	inputRef,
}) => {
	const onOperationButtonClick = (value) => {
		switch (value) {
			case 'cleared':
				setFirstOperand('');
				setSecondOperand('');
				setOperation(value);
				break;
			case 'erase':
				console.log(inputRef.current.value);
				break;
			case 'equals':
				switch (operation) {
					case 'plus':
						setResult('');
						setResult(Number(firstOperand) + Number(secondOperand));

						break;
					case 'minus':
						setResult('');
						setResult(Number(firstOperand) - Number(secondOperand));

						break;
					case 'divide':
						setResult('');
						setResult(Number(firstOperand) / Number(secondOperand));

						break;
					case 'multiply':
						setResult('');
						setResult(Number(firstOperand) * Number(secondOperand));
						break;
					
						default:
							console.log('Wrong operation');
							break;
				}
		
			default:
				setOperation(value);
		}
	};

	const onNumButtonClick = (value) => {
		switch (operation) {
			case 'cleared':
				if (!firstOperand && value !== '0' && value !== '00') {
					setFirstOperand(value);
				} else if ((value === '0' || value === '00')&&!firstOperand) {
					setFirstOperand('');
				} else {
					setFirstOperand((prev) => prev + value);
				}
				break;
			default:
				if(secondOperand&&secondOperand!=='0'){
					setSecondOperand(prev=>prev+value);
					
				}else if(value==='0'||value==='00'){
					setSecondOperand('0')
					
				} else {
					setSecondOperand(value);
					
				}
				break;
		}
	};

	switch (icon) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		case '00':
		case ',': {
			return (
				<div className={style.button} onClick={() => onNumButtonClick(value)}>
					{icon}
				</div>
			);
		}
		case 'C':
		case '/':
		case '+':
		case '-':
		case '%':
		
		case '=': {
			return (
				<div
					className={style.orangeButton}
					onClick={() => onOperationButtonClick(value)}
				>
					{icon}
				</div>
			);
		}
		case 'multiply': {
			return (
				<div className={style.orangeButton}>
					<img
						src={multiply}
						alt="mulitply"
						onClick={() => onOperationButtonClick(value)}
					/>
				</div>
			);
		}
		case 'arrowDelete': {
			return (
				<div
					className={style.orangeButton}
					onClick={() => onOperationButtonClick(value)}
				>
					<img src={arrowDelete} alt="arrowDelete" />
				</div>
			);
		}
		default: {
		}
	}
};

export default Button;
